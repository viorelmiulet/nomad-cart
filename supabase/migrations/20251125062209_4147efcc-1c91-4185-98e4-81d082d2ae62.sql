-- Create email_templates table
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_type TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  variables JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active email templates"
ON public.email_templates
FOR SELECT
USING (is_active = true);

CREATE POLICY "Authenticated users can manage email templates"
ON public.email_templates
FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Create trigger for updated_at
CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default templates
INSERT INTO public.email_templates (template_type, subject, html_content, variables) VALUES
('order_status', 'Actualizare comandă {{orderNumber}}', 
'<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">{{statusTitle}}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333333;">Bună {{customerName}},</p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333333;">{{statusMessage}}</p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="margin: 0 0 15px; font-size: 18px; color: #333333;">Detalii comandă</h2>
                <p style="margin: 5px 0; font-size: 14px; color: #666666;"><strong>Număr comandă:</strong> {{orderNumber}}</p>
                <p style="margin: 5px 0; font-size: 14px; color: #666666;"><strong>Status:</strong> {{newStatus}}</p>
                <p style="margin: 5px 0; font-size: 14px; color: #666666;"><strong>Total:</strong> {{orderTotal}} RON</p>
              </div>

              {{#if products}}
              <h3 style="margin: 20px 0 10px; font-size: 16px; color: #333333;">Produse comandate:</h3>
              {{#each products}}
              <div style="display: flex; margin-bottom: 15px; padding: 10px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <img src="{{this.image_url}}" alt="{{this.name}}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; margin-right: 15px;">
                <div>
                  <p style="margin: 0 0 5px; font-weight: bold; color: #333333;">{{this.name}}</p>
                  <p style="margin: 0; font-size: 14px; color: #666666;">Cantitate: {{this.quantity}}</p>
                  <p style="margin: 0; font-size: 14px; color: #666666;">Preț: {{this.price}} RON</p>
                </div>
              </div>
              {{/each}}
              {{/if}}
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 30px; background-color: #f8f9fa; text-align: center;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #666666;"><strong>{{companyName}}</strong></p>
              {{#if companyPhone}}<p style="margin: 0; font-size: 14px; color: #666666;">Tel: {{companyPhone}}</p>{{/if}}
              {{#if companyEmail}}<p style="margin: 0; font-size: 14px; color: #666666;">Email: {{companyEmail}}</p>{{/if}}
              {{#if companyAddress}}<p style="margin: 0; font-size: 14px; color: #666666;">{{companyAddress}}, {{companyCity}}</p>{{/if}}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <img src="{{trackingPixelUrl}}" alt="" width="1" height="1" style="display:none;">
</body>
</html>', 
'["customerName", "orderNumber", "statusTitle", "statusMessage", "newStatus", "orderTotal", "products", "companyName", "companyPhone", "companyEmail", "companyAddress", "companyCity", "trackingPixelUrl"]'::jsonb),

('custom_email', 'Email personalizat', 
'<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 40px 30px;">
              {{content}}
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 30px; background-color: #f8f9fa; text-align: center;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #666666;"><strong>{{companyName}}</strong></p>
              {{#if companyPhone}}<p style="margin: 0; font-size: 14px; color: #666666;">Tel: {{companyPhone}}</p>{{/if}}
              {{#if companyEmail}}<p style="margin: 0; font-size: 14px; color: #666666;">Email: {{companyEmail}}</p>{{/if}}
              {{#if companyAddress}}<p style="margin: 0; font-size: 14px; color: #666666;">{{companyAddress}}, {{companyCity}}</p>{{/if}}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <img src="{{trackingPixelUrl}}" alt="" width="1" height="1" style="display:none;">
</body>
</html>', 
'["content", "companyName", "companyPhone", "companyEmail", "companyAddress", "companyCity", "trackingPixelUrl"]'::jsonb);