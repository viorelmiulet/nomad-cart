import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, Eye } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EmailTemplate {
  id: string;
  template_type: string;
  subject: string;
  html_content: string;
  variables: any;
  is_active: boolean;
}

export const EmailTemplateEditor = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [isSaving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from("email_templates")
      .select("*")
      .order("template_type");

    if (error) {
      toast.error("Eroare la încărcarea template-urilor");
      return;
    }

    const templatesData = (data || []).map(t => ({
      ...t,
      variables: Array.isArray(t.variables) ? t.variables : []
    }));

    setTemplates(templatesData);
    if (templatesData.length > 0 && !selectedTemplate) {
      setSelectedTemplate(templatesData[0]);
      setSubject(templatesData[0].subject);
      setHtmlContent(templatesData[0].html_content);
    }
  };

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setSubject(template.subject);
    setHtmlContent(template.html_content);
    setShowPreview(false);
  };

  const handleSave = async () => {
    if (!selectedTemplate) return;

    setSaving(true);
    const { error } = await supabase
      .from("email_templates")
      .update({
        subject,
        html_content: htmlContent,
        updated_at: new Date().toISOString(),
      })
      .eq("id", selectedTemplate.id);

    if (error) {
      toast.error("Eroare la salvarea template-ului");
    } else {
      toast.success("Template salvat cu succes!");
      fetchTemplates();
    }
    setSaving(false);
  };

  const getTemplateTypeName = (type: string) => {
    const names: Record<string, string> = {
      order_status: "Email Status Comandă",
      custom_email: "Email Personalizat",
    };
    return names[type] || type;
  };

  const renderPreview = () => {
    // Replace some common variables with sample data for preview
    let previewHtml = htmlContent
      .replace(/\{\{customerName\}\}/g, "Ion Popescu")
      .replace(/\{\{orderNumber\}\}/g, "CMD-12345")
      .replace(/\{\{statusTitle\}\}/g, "Comanda confirmată!")
      .replace(/\{\{statusMessage\}\}/g, "Comanda ta a fost confirmată și este în curs de procesare.")
      .replace(/\{\{newStatus\}\}/g, "Confirmată")
      .replace(/\{\{orderTotal\}\}/g, "1,250")
      .replace(/\{\{companyName\}\}/g, "Mobila Nomad")
      .replace(/\{\{companyPhone\}\}/g, "0740 123 456")
      .replace(/\{\{companyEmail\}\}/g, "contact@mobilanomad.ro")
      .replace(/\{\{companyAddress\}\}/g, "Str. Exemplu nr. 1")
      .replace(/\{\{companyCity\}\}/g, "București")
      .replace(/\{\{trackingPixelUrl\}\}/g, "");

    return previewHtml;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Editor Template-uri Email</CardTitle>
          <CardDescription>
            Personalizează template-urile de email trimise automat clienților
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Template List */}
            <div className="space-y-2">
              <Label>Selectează Template</Label>
              <div className="space-y-2">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate?.id === template.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    {getTemplateTypeName(template.template_type)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Editor */}
            <div className="md:col-span-2 space-y-4">
              {selectedTemplate && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subiect Email</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Subiectul emailului..."
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="html-content">Conținut HTML</Label>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowPreview(!showPreview)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {showPreview ? "Editor" : "Preview"}
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSave}
                          disabled={isSaving}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Salvează
                        </Button>
                      </div>
                    </div>

                    {!showPreview ? (
                      <Textarea
                        id="html-content"
                        value={htmlContent}
                        onChange={(e) => setHtmlContent(e.target.value)}
                        className="font-mono text-sm min-h-[500px]"
                        placeholder="Conținutul HTML al emailului..."
                      />
                    ) : (
                      <ScrollArea className="h-[500px] w-full border rounded-md p-4 bg-muted">
                        <div dangerouslySetInnerHTML={{ __html: renderPreview() }} />
                      </ScrollArea>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Variabile disponibile</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.variables.map((variable) => (
                        <Badge key={variable} variant="secondary">
                          {`{{${variable}}}`}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Folosește aceste variabile în template folosind sintaxa {`{{variabila}}`}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instrucțiuni</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Sintaxă Template-uri:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>
                <code className="bg-muted px-1 py-0.5 rounded">{`{{variabila}}`}</code> - Afișează o variabilă
              </li>
              <li>
                <code className="bg-muted px-1 py-0.5 rounded">{`{{#if variabila}}...{{/if}}`}</code> - Condiție
              </li>
              <li>
                <code className="bg-muted px-1 py-0.5 rounded">{`{{#each array}}...{{/each}}`}</code> - Iterare prin array
              </li>
              <li>
                <code className="bg-muted px-1 py-0.5 rounded">{`{{this.proprietate}}`}</code> - Acces la proprietate în loop
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Exemple:</h4>
            <div className="space-y-2 text-sm">
              <code className="block bg-muted p-2 rounded">{`<p>Bună {{customerName}},</p>`}</code>
              <code className="block bg-muted p-2 rounded">{`{{#if companyPhone}}<p>Tel: {{companyPhone}}</p>{{/if}}`}</code>
              <code className="block bg-muted p-2 rounded">{`{{#each products}}<div>{{this.name}}</div>{{/each}}`}</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
