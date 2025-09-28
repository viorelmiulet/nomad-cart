import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, Send, X, User, Headphones, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SupportMessage {
  id: string;
  user_name: string;
  user_email: string;
  message: string;
  response?: string;
  status: 'pending' | 'responded' | 'closed';
  created_at: string;
  updated_at: string;
}

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
    if (!userName.trim() || !userEmail.trim() || !newMessage.trim()) {
      toast({
        title: "Completează toate câmpurile",
        description: "Te rog să completezi numele, email-ul și mesajul.",
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
          message: newMessage.trim()
        });

      if (error) throw error;

      setNewMessage('');
      toast({
        title: "Mesaj trimis!",
        description: "Administrații vor răspunde în curând."
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
            <MessageCircle className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
          )}
          {!isOpen && <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>}
        </div>
      </Button>

      {/* Chat Bubble */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 z-40 shadow-2xl bg-gradient-to-br from-background via-background/95 to-muted/30 backdrop-blur-xl border-2 border-primary/20 animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 backdrop-blur-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Headphones className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Suport Client
                </h3>
                <p className="text-xs text-muted-foreground">Suntem aici să te ajutăm</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col flex-1 p-4 space-y-3 overflow-hidden h-full">
            {/* User Info Form */}
            {!userEmail && (
              <div className="space-y-3">
                <div className="text-center">
                  <div className="inline-flex p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-2">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">Să facem cunoștință!</h4>
                  <p className="text-xs text-muted-foreground">Completează datele tale</p>
                </div>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="user-name" className="text-xs font-medium text-foreground">Numele tău</Label>
                    <Input
                      id="user-name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Numele tău"
                      className="h-8 text-sm border-border/60 focus:border-primary/60 focus:ring-primary/20"
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
                      className="h-8 text-sm border-border/60 focus:border-primary/60 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Messages Area */}
            {userEmail && (
              <div className="flex-1 overflow-y-auto space-y-3 min-h-0 pr-2">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-6">
                    <div className="inline-flex p-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full mb-2">
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

            {/* Message Input */}
            <div className="border-t border-border/40 pt-3 space-y-2">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Scrie mesajul..."
                    className="min-h-[50px] resize-none text-xs border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all duration-200 bg-background/50"
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
                  disabled={isLoading || !userName.trim() || !userEmail.trim() || !newMessage.trim()}
                  size="icon"
                  className="self-end h-[50px] w-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}