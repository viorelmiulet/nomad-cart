import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Mail, Eye } from "lucide-react";
import { toast } from "sonner";

interface EmailHistoryItem {
  id: string;
  created_at: string;
  recipients: string[];
  subject: string;
  content: string;
  email_type: string;
  order_id: string | null;
  status: string;
}

export const EmailHistory = () => {
  const [emails, setEmails] = useState<EmailHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<EmailHistoryItem | null>(null);

  useEffect(() => {
    fetchEmailHistory();
  }, []);

  const fetchEmailHistory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("email_history")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      setEmails(data || []);
    } catch (error: any) {
      console.error("Error fetching email history:", error);
      toast.error("Eroare la încărcarea istoricului email-urilor");
    } finally {
      setLoading(false);
    }
  };

  const getEmailTypeBadge = (type: string) => {
    return type === "custom" ? (
      <Badge variant="secondary">Personalizat</Badge>
    ) : (
      <Badge variant="outline">Status Comandă</Badge>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Istoric Email-uri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Se încarcă...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Istoric Email-uri ({emails.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Destinatari</TableHead>
                <TableHead>Subiect</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Nu există email-uri trimise încă
                  </TableCell>
                </TableRow>
              ) : (
                emails.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell className="text-sm">
                      {format(new Date(email.created_at), "dd.MM.yyyy HH:mm")}
                    </TableCell>
                    <TableCell>{getEmailTypeBadge(email.email_type)}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {email.recipients.join(", ")}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{email.subject}</TableCell>
                    <TableCell>
                      <Badge variant={email.status === "sent" ? "default" : "destructive"}>
                        {email.status === "sent" ? "Trimis" : "Eroare"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedEmail(email)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Detalii Email</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-1">Data trimiterii:</h4>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(email.created_at), "dd.MM.yyyy HH:mm:ss")}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Tip:</h4>
                              {getEmailTypeBadge(email.email_type)}
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Destinatari:</h4>
                              <p className="text-sm text-muted-foreground">
                                {email.recipients.join(", ")}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Subiect:</h4>
                              <p className="text-sm text-muted-foreground">{email.subject}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Conținut:</h4>
                              <div
                                className="text-sm text-muted-foreground border rounded p-4 bg-muted/30"
                                dangerouslySetInnerHTML={{ __html: email.content }}
                              />
                            </div>
                            {email.order_id && (
                              <div>
                                <h4 className="font-semibold mb-1">ID Comandă:</h4>
                                <p className="text-sm text-muted-foreground font-mono">
                                  {email.order_id}
                                </p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
