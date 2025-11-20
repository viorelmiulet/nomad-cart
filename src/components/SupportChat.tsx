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

  // Load existing messages for the current session
  useEffect(() => {
    if (isOpen) {
      const sessionEmail = userEmail || getSessionEmail();
      setUserEmail(sessionEmail);
      loadMessages();
      subscribeToMessages();
    }
  }, [isOpen]);

  const getSessionEmail = () => {
    let sessionEmail = localStorage.getItem('anonymous_session_email');
    if (!sessionEmail) {
      sessionEmail = `anonim_${Date.now()}@temp.com`;
      localStorage.setItem('anonymous_session_email', sessionEmail);
    }
    return sessionEmail;
  };

  const loadMessages = async () => {
    const sessionEmail = userEmail || getSessionEmail();
    if (!sessionEmail) return;

    try {
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .eq('user_email', sessionEmail)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []) as SupportMessage[]);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const subscribeToMessages = () => {
    const sessionEmail = userEmail || getSessionEmail();
    const channel = supabase
      .channel('support-messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'support_messages',
          filter: `user_email=eq.${sessionEmail}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages(prev => [...prev, payload.new as SupportMessage]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedMessage = payload.new as SupportMessage;
            const oldMessage = payload.old as SupportMessage;
            
            // Play notification sound when admin responds (response field is added)
            if (updatedMessage.response && !oldMessage.response) {
              playNotificationSound();
            }
            
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

  const playNotificationSound = () => {
    // Create a simple notification beep
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      toast({
        title: "Mesaj gol",
        description: "Te rog să scrii un mesaj.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const messageData = {
        user_name: userName.trim() || 'Anonim',
        user_email: userEmail.trim() || getSessionEmail(),
        user_phone: userPhone.trim() || '',
        message: newMessage.trim()
      };

      const { error } = await supabase
        .from('support_messages')
        .insert(messageData);

      if (error) throw error;

      // Update profile if user is authenticated and phone is missing
      if (user && userProfile && !userProfile.phone) {
        await supabase
          .from('profiles')
          .update({ phone: userPhone.trim() })
          .eq('user_id', user.id);
      }

      // Send email notification to admin
      try {
        await supabase.functions.invoke('send-support-notification', {
          body: messageData
        });
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Don't show error to user, just log it
      }

      setNewMessage('');
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

  const isDataComplete = true; // Always show chat interface

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
        <Card className="fixed bottom-24 right-6 w-80 h-[500px] z-40 shadow-2xl bg-slate-900 border border-slate-700 animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700 p-3 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-full shadow-lg">
                <Headphones className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  Suport Mobila Nomad
                </h3>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded-full shadow-sm">
                    Online
                  </span>
                  <span className="text-xs text-slate-300">
                    Răspundem rapid
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-red-500/20 transition-all duration-200 rounded-full border border-slate-600 hover:border-red-400"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex flex-col flex-1 p-0 overflow-hidden h-full bg-slate-900">
            {!isDataComplete ? (
              /* User Info Form - show only when data is not complete */
              <div className="flex flex-col h-full">
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="space-y-4 w-full max-w-sm">
                    <div className="text-center">
                      <div className="inline-flex p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-3 shadow-lg">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Să facem cunoștință!
                      </h4>
                      <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                        Pentru a putea utiliza chatul de suport, te rog să completezi datele tale
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="user-name" className="text-sm font-medium text-white flex items-center gap-1">
                          Numele tău <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          id="user-name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Introduceți numele"
                          className="h-10 text-sm border-slate-600 bg-slate-800 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                          disabled={user && !!userProfile?.display_name}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-email" className="text-sm font-medium text-white flex items-center gap-1">
                          Adresa de email <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          id="user-email"
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="h-10 text-sm border-slate-600 bg-slate-800 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                          disabled={!!user}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-phone" className="text-sm font-medium text-white flex items-center gap-1">
                          Numărul de telefon <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="user-phone"
                            type="tel"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            placeholder="0721234567"
                            className="h-10 pl-10 text-sm border-slate-600 bg-slate-800 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div className="pt-3">
                        <div className="text-xs text-slate-400 text-center mb-3 bg-slate-800/50 p-2 rounded-lg border border-slate-700">
                          <span className="text-red-400">*</span> Toate câmpurile sunt obligatorii
                        </div>
                        {isDataComplete && (
                          <div className="text-center">
                            <div className="inline-flex items-center gap-2 text-green-400 text-sm bg-green-500/10 p-2 rounded-lg border border-green-500/20">
                              <Sparkles className="h-4 w-4" />
                              Gata! Acum poți începe conversația
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Chat Area - show only when all data is complete */
              <div className="flex-1 flex flex-col min-h-0 p-4 bg-slate-900">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {messages.length === 0 ? (
                    <div className="space-y-3">
                      {/* Welcome message from Mobila Nomad */}
                      <div className="flex justify-start items-start gap-2 animate-fade-in">
                        <div className="p-1 bg-slate-700 rounded-full flex-shrink-0 mt-1">
                          <Headphones className="h-3 w-3 text-slate-300" />
                        </div>
                        <div className="bg-slate-700 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[75%] shadow-md">
                          <p className="text-sm leading-relaxed text-white">Buna ziua! Cu ce va putem ajuta?</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className="space-y-2 animate-fade-in">
                        {/* User message */}
                        <div className="flex justify-end">
                          <div className="bg-blue-500 text-white rounded-2xl rounded-br-sm px-3 py-2 max-w-[75%] shadow-md">
                            <p className="text-sm leading-relaxed">{msg.message}</p>
                            <p className="text-xs opacity-80 mt-1">
                              {new Date(msg.created_at).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        
                        {/* Admin response */}
                        {msg.response && (
                          <div className="flex justify-start items-start gap-2">
                            <div className="p-1 bg-slate-700 rounded-full flex-shrink-0 mt-1">
                              <Headphones className="h-3 w-3 text-slate-300" />
                            </div>
                            <div className="bg-slate-700 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[75%] shadow-md">
                              <p className="text-sm leading-relaxed text-white">{msg.response}</p>
                              <p className="text-xs text-slate-400 mt-1">
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

                {/* Message Input */}
                <div className="flex items-end space-x-2 mt-3 pt-3 border-t border-slate-700">
                  <div className="flex-1 relative">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Scrie mesajul tău..."
                      className="min-h-[40px] max-h-[100px] resize-none text-sm border-slate-600 bg-slate-800 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
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
                    disabled={isLoading || !newMessage.trim()}
                    size="icon"
                    className="h-10 w-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    <Send className="h-4 w-4" />
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