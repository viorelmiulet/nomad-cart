import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  created_at: string;
}

export const CustomEmailSender = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('id, customer_name, customer_email, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Remove duplicates based on email
      const uniqueOrders = data.reduce((acc: Order[], order) => {
        if (!acc.some(o => o.customer_email === order.customer_email)) {
          acc.push(order);
        }
        return acc;
      }, []);

      setOrders(uniqueOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca clienții.",
        variant: "destructive",
      });
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmails(new Set(filteredOrders.map(o => o.customer_email)));
    } else {
      setSelectedEmails(new Set());
    }
  };

  const handleSelectEmail = (email: string, checked: boolean) => {
    const newSelected = new Set(selectedEmails);
    if (checked) {
      newSelected.add(email);
    } else {
      newSelected.delete(email);
    }
    setSelectedEmails(newSelected);
  };

  const handleSendEmails = async () => {
    if (selectedEmails.size === 0) {
      toast({
        title: "Eroare",
        description: "Selectează cel puțin un destinatar.",
        variant: "destructive",
      });
      return;
    }

    if (!subject.trim() || !content.trim()) {
      toast({
        title: "Eroare",
        description: "Completează subiectul și conținutul mesajului.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);

    try {
      const { error } = await supabase.functions.invoke('send-custom-email', {
        body: {
          recipients: Array.from(selectedEmails),
          subject: subject,
          htmlContent: content
        }
      });

      if (error) throw error;

      toast({
        title: "Succes",
        description: `Email trimis către ${selectedEmails.size} destinatar(i).`,
      });

      // Clear form
      setSelectedEmails(new Set());
      setSubject("");
      setContent("");
    } catch (error) {
      console.error('Error sending emails:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut trimite email-urile.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const filteredOrders = orders.filter(order =>
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recipients Selection */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Destinatari
          </CardTitle>
          <CardDescription>
            {selectedEmails.size} {selectedEmails.size === 1 ? 'destinatar selectat' : 'destinatari selectați'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="search">Caută clienți</Label>
            <Input
              id="search"
              placeholder="Nume sau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all"
              checked={selectedEmails.size === filteredOrders.length && filteredOrders.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <Label htmlFor="select-all" className="cursor-pointer font-medium">
              Selectează toți ({filteredOrders.length})
            </Label>
          </div>

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-2">
              {filteredOrders.map((order) => (
                <div key={order.id} className="flex items-start space-x-2 p-2 rounded-lg hover:bg-muted">
                  <Checkbox
                    id={order.customer_email}
                    checked={selectedEmails.has(order.customer_email)}
                    onCheckedChange={(checked) => handleSelectEmail(order.customer_email, checked as boolean)}
                  />
                  <Label
                    htmlFor={order.customer_email}
                    className="cursor-pointer flex-1 text-sm"
                  >
                    <div className="font-medium">{order.customer_name}</div>
                    <div className="text-muted-foreground text-xs">{order.customer_email}</div>
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Email Composer */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Compune Email</CardTitle>
          <CardDescription>
            Scrie un email personalizat pentru clienții selectați
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subject">Subiect *</Label>
            <Input
              id="subject"
              placeholder="ex: Ofertă specială pentru tine!"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="content">Conținut *</Label>
            <div className="mt-2 border rounded-lg">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                placeholder="Scrie mesajul aici..."
                style={{ minHeight: '300px' }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Email-ul va include automat header-ul Mobila Nomad și semnătura echipei.
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSendEmails}
              disabled={sending || selectedEmails.size === 0 || !subject.trim() || !content.trim()}
              size="lg"
            >
              <Send className="h-4 w-4 mr-2" />
              {sending ? "Se trimite..." : `Trimite către ${selectedEmails.size} destinatar(i)`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
