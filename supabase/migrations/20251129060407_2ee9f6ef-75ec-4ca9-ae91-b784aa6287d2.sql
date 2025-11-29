-- Insert tracking email template if it doesn't exist
INSERT INTO email_templates (template_type, subject, html_content, variables, is_active)
SELECT 
  'tracking_update',
  '📦 Tracking Update - Comanda #{{orderNumber}}',
  '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tracking Update</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                {{statusEmoji}} {{status}}
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Bună <strong>{{customerName}}</strong>,
              </p>
              
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                {{statusMessage}}
              </p>
              
              <!-- Tracking Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <h2 style="color: #667eea; margin: 0 0 20px; font-size: 20px;">📦 Informații Tracking</h2>
                    
                    <table width="100%" cellpadding="8" cellspacing="0" border="0" style="font-size: 14px;">
                      <tr>
                        <td style="color: #666666; width: 40%;">Număr tracking:</td>
                        <td style="color: #333333; font-weight: bold; font-family: monospace;">{{trackingNumber}}</td>
                      </tr>
                      <tr>
                        <td style="color: #666666;">Curier:</td>
                        <td style="color: #333333; font-weight: bold;">{{carrier}}</td>
                      </tr>
                      <tr>
                        <td style="color: #666666;">Status:</td>
                        <td style="color: #667eea; font-weight: bold;">{{status}}</td>
                      </tr>
                      <tr>
                        <td style="color: #666666;">Livrare estimată:</td>
                        <td style="color: #333333; font-weight: bold;">{{estimatedDelivery}}</td>
                      </tr>
                      {{#if notes}}
                      <tr>
                        <td style="color: #666666; vertical-align: top;">Notă:</td>
                        <td style="color: #333333;">{{notes}}</td>
                      </tr>
                      {{/if}}
                    </table>
                    
                    {{#if carrierTrackingUrl}}
                    <div style="margin-top: 20px;">
                      <a href="{{carrierTrackingUrl}}" style="display: inline-block; background-color: #667eea; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; font-size: 14px;">
                        Urmărește Coletul
                      </a>
                    </div>
                    {{/if}}
                  </td>
                </tr>
              </table>
              
              <!-- Order Summary -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top: 2px solid #e9ecef; padding-top: 25px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <h3 style="color: #333333; margin: 0 0 15px; font-size: 18px;">Detalii Comandă</h3>
                    <table width="100%" cellpadding="5" cellspacing="0" border="0" style="font-size: 14px;">
                      <tr>
                        <td style="color: #666666;">Număr comandă:</td>
                        <td style="color: #333333; font-weight: bold; text-align: right;">#{{orderNumber}}</td>
                      </tr>
                      <tr>
                        <td style="color: #666666;">Data comenzii:</td>
                        <td style="color: #333333; text-align: right;">{{orderDate}}</td>
                      </tr>
                      <tr>
                        <td style="color: #666666;">Total:</td>
                        <td style="color: #667eea; font-weight: bold; text-align: right; font-size: 16px;">{{orderTotal}} RON</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Products -->
              {{#if products}}
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                <tr>
                  <td>
                    <h3 style="color: #333333; margin: 0 0 15px; font-size: 18px;">Produse</h3>
                    {{#each products}}
                    <div style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                      <p style="margin: 0; color: #333333; font-size: 14px;">
                        <strong>{{name}}</strong> x{{quantity}} - {{price}} RON
                      </p>
                    </div>
                    {{/each}}
                  </td>
                </tr>
              </table>
              {{/if}}
              
              <!-- Contact CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; text-align: center;">
                <tr>
                  <td>
                    <p style="color: #666666; font-size: 14px; margin: 0 0 15px;">Ai întrebări despre comanda ta?</p>
                    <a href="{{whatsappLink}}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: bold; font-size: 14px;">
                      💬 Contactează-ne pe WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #666666; font-size: 14px; margin: 0 0 10px;">
                <strong>{{companyName}}</strong>
              </p>
              {{#if companyPhone}}
              <p style="color: #666666; font-size: 13px; margin: 0 0 5px;">
                📞 {{companyPhone}}
              </p>
              {{/if}}
              {{#if companyEmail}}
              <p style="color: #666666; font-size: 13px; margin: 0 0 5px;">
                ✉️ {{companyEmail}}
              </p>
              {{/if}}
              {{#if companyAddress}}
              <p style="color: #666666; font-size: 13px; margin: 0;">
                📍 {{companyAddress}}, {{companyCity}}
              </p>
              {{/if}}
            </td>
          </tr>
        </table>
        
        <!-- Tracking Pixel -->
        <img src="{{trackingPixelUrl}}" width="1" height="1" alt="" style="display: block;" />
      </td>
    </tr>
  </table>
</body>
</html>',
  '["customerName", "orderNumber", "trackingNumber", "carrier", "status", "statusEmoji", "statusMessage", "estimatedDelivery", "notes", "carrierTrackingUrl", "orderTotal", "orderDate", "products", "companyName", "companyPhone", "companyEmail", "companyAddress", "companyCity", "whatsappLink", "trackingPixelUrl"]'::jsonb,
  true
WHERE NOT EXISTS (
  SELECT 1 FROM email_templates WHERE template_type = 'tracking_update'
);