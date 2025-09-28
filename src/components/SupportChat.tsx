import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, Send, X } from 'lucide-react';
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
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="max-h-[80vh] flex flex-col">
        <DrawerHeader className="flex flex-row items-center justify-between border-b">
          <DrawerTitle>Suport Client</DrawerTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DrawerHeader>

        <div className="flex flex-col flex-1 p-4 space-y-4 overflow-hidden">
          {/* User Info Form */}
          {!userEmail && (
            <div className="space-y-3 border-b pb-4">
              <div>
                <Label htmlFor="user-name">Numele tău</Label>
                <Input
                  id="user-name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Introdu numele tău"
                />
              </div>
              <div>
                <Label htmlFor="user-email">Email</Label>
                <Input
                  id="user-email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
            </div>
          )}

          {/* Messages Area */}
          {userEmail && (
            <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Trimite-ne primul tău mesaj!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="space-y-2">
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 max-w-[80%]">
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.created_at).toLocaleString('ro-RO')}
                        </p>
                      </div>
                    </div>
                    
                    {/* Admin response */}
                    {msg.response && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg px-3 py-2 max-w-[80%]">
                          <p className="text-sm font-medium text-primary mb-1">Admin</p>
                          <p className="text-sm">{msg.response}</p>
                          <p className="text-xs text-muted-foreground mt-1">
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
          <div className="border-t pt-4 space-y-3">
            <div className="flex space-x-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Scrie mesajul tău aici..."
                className="flex-1 min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !userName.trim() || !userEmail.trim() || !newMessage.trim()}
                size="icon"
                className="self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}