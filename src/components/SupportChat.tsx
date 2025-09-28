import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, Send, X, User, Headphones, Sparkles, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface SupportMessage {
  id: string;
  user_name: string;
  user_email: string;
  user_phone?: string;
  message: string;
  response?: string;
  status: 'pending' | 'responded' | 'closed';
  created_at: string;
  updated_at: string;
}

interface UserProfile {
  display_name?: string;
  phone?: string;
}

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load user profile if authenticated
  useEffect(() => {
    if (user) {
      loadUserProfile();
      setUserEmail(user.email || '');
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, phone')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error loading profile:', error);
        return;
      }

      if (data) {
        setUserProfile(data);
        setUserName(data.display_name || user.user_metadata?.display_name || '');
        setUserPhone(data.phone || '');
      } else {
        // No profile found, use metadata
        setUserName(user.user_metadata?.display_name || '');
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  // Load existing messages for the user email
  useEffect(() => {
    if (userEmail && isOpen) {
      loadMessages();
      subscribeToMessages();
    }
  }, [userEmail, isOpen]);

  const loadMessages = async () => {
    if (!userEmail) return;

    try {
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .eq('user_email', userEmail)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []) as SupportMessage[]);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('support-messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'support_messages',
          filter: `user_email=eq.${userEmail}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages(prev => [...prev, payload.new as SupportMessage]);
          } else if (payload.eventType === 'UPDATE') {
            setMessages(prev => 
              prev.map(msg => 
                msg.id === payload.new.id ? payload.new as SupportMessage : msg
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!userName.trim() || !userEmail.trim() || !userPhone.trim() || !newMessage.trim()) {
      toast({
        title: "Completează toate câmpurile",
        description: "Te rog să completezi numele, email-ul, telefonul și mesajul.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      toast({
        title: "Email invalid",
        description: "Te rog să introduci o adresă de email validă.",
        variant: "destructive"
      });
      return;
    }

    // Phone validation (Romanian format)
    const phoneRegex = /^(\+40|0040|0)[0-9]{9}$/;
    if (!phoneRegex.test(userPhone.replace(/\s/g, ''))) {
      toast({
        title: "Telefon invalid",
        description: "Te rog să introduci un număr de telefon valid (ex: 0721234567).",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('support_messages')
        .insert({
          user_name: userName.trim(),
          user_email: userEmail.trim(),
          user_phone: userPhone.trim(),
          message: newMessage.trim()
        });

      if (error) throw error;

      // Update profile if user is authenticated and phone is missing
      if (user && userProfile && !userProfile.phone) {
        await supabase
          .from('profiles')
          .update({ phone: userPhone.trim() })
          .eq('user_id', user.id);
      }

      setNewMessage('');
      toast({
        title: "Mesaj trimis!",
        description: "Echipa de suport va răspunde în curând."
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut trimite mesajul. Încearcă din nou.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isDataComplete = user ? (userName && userEmail && userPhone) : true;

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-50 bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 transition-all duration-300 hover:scale-110 group border-2 border-white/20 backdrop-blur-sm"
      >
        <div className="relative">
          {isOpen ? (
            <X className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <>
              <MessageCircle className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
            </>
          )}
        </div>
      </Button>

      {/* Chat Bubble */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 z-40 shadow-2xl bg-gradient-to-br from-background/95 via-background/90 to-muted/60 backdrop-blur-xl border-2 border-primary/30 animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/80 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 backdrop-blur-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Headphones className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Suport Client
                </h3>
                <p className="text-xs text-muted-foreground">
                  {user ? `Conectat ca ${user.email}` : 'Suntem aici să te ajutăm'}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col flex-1 p-4 space-y-3 overflow-hidden h-full">
            {/* User Info Form - show only if data is not complete */}
            {!isDataComplete && (
              <div className="space-y-3">
                <div className="text-center">
                  <div className="inline-flex p-2 bg-gradient-to-br from-primary/30 to-primary/20 rounded-full mb-2">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {user ? 'Completează datele' : 'Să facem cunoștință!'}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {user ? 'Avem nevoie de câteva detalii' : 'Completează datele tale'}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="user-name" className="text-xs font-medium text-foreground">Numele tău</Label>
                    <Input
                      id="user-name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Numele tău"
                      className="h-8 text-sm border-border/80 focus:border-primary/80 focus:ring-primary/30 bg-background/80 backdrop-blur-sm"
                      disabled={user && !!userProfile?.display_name}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="user-email" className="text-xs font-medium text-foreground">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="h-8 text-sm border-border/80 focus:border-primary/80 focus:ring-primary/30 bg-background/80 backdrop-blur-sm"
                      disabled={!!user}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="user-phone" className="text-xs font-medium text-foreground">Telefon</Label>
                    <div className="relative">
                      <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                      <Input
                        id="user-phone"
                        type="tel"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="0721234567"
                        className="h-8 pl-8 text-sm border-border/80 focus:border-primary/80 focus:ring-primary/30 bg-background/80 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Area - show only when data is complete */}
            {isDataComplete && (
              <div className="flex-1 overflow-y-auto space-y-3 min-h-0 pr-2">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-6">
                    <div className="inline-flex p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-2">
                      <MessageCircle className="h-5 w-5 opacity-60" />
                    </div>
                    <h4 className="text-sm font-medium mb-1">Începe conversația</h4>
                    <p className="text-xs">Trimite primul mesaj!</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className="space-y-2 animate-fade-in">
                      {/* User message */}
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl rounded-br-md px-3 py-2 max-w-[90%] shadow-md">
                          <p className="text-xs leading-relaxed">{msg.message}</p>
                          <p className="text-xs opacity-80 mt-1 flex items-center gap-1">
                            <User className="h-2 w-2" />
                            {new Date(msg.created_at).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      
                      {/* Admin response */}
                      {msg.response && (
                        <div className="flex justify-start">
                          <div className="bg-gradient-to-r from-muted to-muted/80 rounded-xl rounded-bl-md px-3 py-2 max-w-[90%] shadow-md border border-border/50">
                            <div className="flex items-center gap-1 mb-1">
                              <Sparkles className="h-2 w-2 text-primary" />
                              <span className="text-xs font-medium text-primary">Suport</span>
                            </div>
                            <p className="text-xs leading-relaxed text-foreground">{msg.response}</p>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Headphones className="h-2 w-2" />
                              {new Date(msg.updated_at).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Message Input - show only when data is complete */}
            {isDataComplete && (
              <div className="border-t border-border/60 pt-3 space-y-2">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Scrie mesajul..."
                      className="min-h-[50px] resize-none text-xs border-border/80 focus:border-primary/80 focus:ring-primary/30 transition-all duration-200 bg-background/80 backdrop-blur-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                  </div>
                  <Button
                    onClick={sendMessage}
                    disabled={isLoading || !userName.trim() || !userEmail.trim() || !userPhone.trim() || !newMessage.trim()}
                    size="icon"
                    className="self-end h-[50px] w-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}