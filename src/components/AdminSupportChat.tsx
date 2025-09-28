import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, Clock, CheckCircle, Send, Trash2 } from 'lucide-react';
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

export function AdminSupportChat() {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<SupportMessage | null>(null);
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadMessages();
    subscribeToMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages((data || []) as SupportMessage[]);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut încărca mesajele.",
        variant: "destructive"
      });
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('admin-support-messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'support_messages'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages(prev => [payload.new as SupportMessage, ...prev]);
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

  const sendResponse = async () => {
    if (!selectedMessage || !responseText.trim()) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('support_messages')
        .update({
          response: responseText.trim(),
          status: 'responded'
        })
        .eq('id', selectedMessage.id);

      if (error) throw error;

      setResponseText('');
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error sending response:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut trimite răspunsul.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAsClosed = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('support_messages')
        .update({ status: 'closed' })
        .eq('id', messageId);

      if (error) throw error;

      toast({
        title: "Mesaj închis",
        description: "Mesajul a fost marcat ca rezolvat."
      });
    } catch (error) {
      console.error('Error closing message:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut închide mesajul.",
        variant: "destructive"
      });
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm("Ești sigur că vrei să ștergi această conversație? Această acțiune nu poate fi anulată.")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('support_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;

      // Remove from local state
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      
      // Clear selected message if it was deleted
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
        setResponseText('');
      }

      toast({
        title: "Conversație ștearsă",
        description: "Conversația a fost ștearsă cu succes."
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut șterge conversația.",
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'responded':
        return <MessageCircle className="h-4 w-4" />;
      case 'closed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'responded':
        return 'bg-blue-500';
      case 'closed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const pendingCount = messages.filter(msg => msg.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Suport Client</h2>
        <Badge variant="secondary" className="text-sm">
          {pendingCount} mesaje în așteptare
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Mesaje Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Nu există mesaje de support.</p>
              </div>
            ) : (
              messages.map((message) => (
                <Card
                  key={message.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedMessage?.id === message.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{message.user_name}</p>
                        <p className="text-sm text-muted-foreground">{message.user_email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(message.id);
                          }}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Badge 
                          variant="secondary" 
                          className={`${getStatusColor(message.status)} text-white`}
                        >
                          {getStatusIcon(message.status)}
                          <span className="ml-1 capitalize">{message.status}</span>
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm line-clamp-2 mb-2">{message.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(message.created_at).toLocaleString('ro-RO')}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

        {/* Message Details & Response */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedMessage ? 'Răspunde la mesaj' : 'Selectează un mesaj'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedMessage ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">De la: {selectedMessage.user_name}</Label>
                    <Badge 
                      variant="secondary" 
                      className={`${getStatusColor(selectedMessage.status)} text-white`}
                    >
                      {getStatusIcon(selectedMessage.status)}
                      <span className="ml-1 capitalize">{selectedMessage.status}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedMessage.user_email}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(selectedMessage.created_at).toLocaleString('ro-RO')}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Mesajul clientului:</Label>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm">{selectedMessage.message}</p>
                  </div>
                </div>

                {selectedMessage.response && (
                  <div className="space-y-2">
                    <Label>Răspunsul tău:</Label>
                    <div className="bg-primary/10 p-3 rounded-md border-l-4 border-primary">
                      <p className="text-sm">{selectedMessage.response}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Trimis: {new Date(selectedMessage.updated_at).toLocaleString('ro-RO')}
                      </p>
                    </div>
                  </div>
                )}

                {selectedMessage.status !== 'closed' && (
                  <div className="space-y-3">
                    <Label htmlFor="response">
                      {selectedMessage.response ? 'Actualizează răspunsul:' : 'Răspunsul tău:'}
                    </Label>
                    <Textarea
                      id="response"
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Scrie răspunsul pentru client..."
                      className="min-h-[120px]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          if (responseText.trim() && !isLoading) {
                            sendResponse();
                          }
                        }
                      }}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={sendResponse}
                        disabled={isLoading || !responseText.trim()}
                        className="flex-1"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {selectedMessage.response ? 'Actualizează răspunsul' : 'Trimite răspunsul'}
                      </Button>
                      <Button
                        onClick={() => markAsClosed(selectedMessage.id)}
                        variant="outline"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Închide
                      </Button>
                      <Button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {selectedMessage.status === 'closed' && (
                  <div className="text-center py-4">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                    <p className="text-muted-foreground">Acest mesaj a fost închis.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Selectează un mesaj din lista din stânga pentru a răspunde.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}