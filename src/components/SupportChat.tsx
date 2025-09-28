import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
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
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-50 bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 transition-all duration-300 hover:scale-110 group border-2 border-white/20 backdrop-blur-sm"
        >
          <div className="relative">
            <MessageCircle className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="max-h-[85vh] flex flex-col bg-gradient-to-br from-background via-background/95 to-muted/30 backdrop-blur-xl border-t-2 border-primary/20">
        <DrawerHeader className="flex flex-row items-center justify-between border-b border-border/60 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Headphones className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DrawerTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Suport Client
              </DrawerTitle>
              <p className="text-sm text-muted-foreground">Suntem aici să te ajutăm</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-destructive/10 hover:text-destructive transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </DrawerHeader>

        <div className="flex flex-col flex-1 p-6 space-y-6 overflow-hidden">
          {/* User Info Form */}
          {!userEmail && (
            <div className="space-y-4 border-b border-border/40 pb-6">
              <div className="text-center mb-4">
                <div className="inline-flex p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-3">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Să facem cunoștință!</h3>
                <p className="text-sm text-muted-foreground">Completează datele pentru a începe conversația</p>
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="user-name" className="text-sm font-medium text-foreground">Numele tău</Label>
                  <Input
                    id="user-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Introdu numele tău"
                    className="border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email" className="text-sm font-medium text-foreground">Email</Label>
                  <Input
                    id="user-email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Messages Area */}
          {userEmail && (
            <div className="flex-1 overflow-y-auto space-y-4 min-h-0 px-1">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  <div className="inline-flex p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full mb-4">
                    <MessageCircle className="h-8 w-8 opacity-60" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Începe conversația</h3>
                  <p className="text-sm">Trimite-ne primul tău mesaj și îți vom răspunde rapid!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="space-y-3 animate-fade-in">
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 max-w-[85%] shadow-lg">
                        <p className="text-sm leading-relaxed">{msg.message}</p>
                        <p className="text-xs opacity-80 mt-2 flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {new Date(msg.created_at).toLocaleString('ro-RO')}
                        </p>
                      </div>
                    </div>
                    
                    {/* Admin response */}
                    {msg.response && (
                      <div className="flex justify-start">
                        <div className="bg-gradient-to-r from-muted to-muted/80 rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%] shadow-lg border border-border/50">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1 text-primary text-xs font-medium">
                              <Sparkles className="h-3 w-3" />
                              <span>Echipa Suport</span>
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed text-foreground">{msg.response}</p>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <Headphones className="h-3 w-3" />
                            {new Date(msg.updated_at).toLocaleString('ro-RO')}
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
          <div className="border-t border-border/40 pt-6 space-y-4 bg-gradient-to-r from-background via-background/80 to-background backdrop-blur-sm">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Scrie mesajul tău aici..."
                  className="min-h-[80px] resize-none pr-12 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all duration-200 bg-background/50 backdrop-blur-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                  Enter pentru trimitere
                </div>
              </div>
              <Button
                onClick={sendMessage}
                disabled={isLoading || !userName.trim() || !userEmail.trim() || !newMessage.trim()}
                size="icon"
                className="self-end h-[80px] w-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}