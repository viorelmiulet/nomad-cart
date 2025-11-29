-- Update order_status email template to include WhatsApp button
UPDATE email_templates
SET html_content = '<!DOCTYPE html>
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
                <p style="margin: 5px 0; font-size: 14px; color: #666666;"><strong>Data:</strong> {{orderDate}}</p>
                <p style="margin: 5px 0; font-size: 14px; color: #666666;"><strong>Status:</strong> {{newStatus}}</p>
                <p style="margin: 5px 0; font-size: 14px; color: #666666;"><strong>Adresă livrare:</strong> {{orderAddress}}</p>
              </div>

              {{#if products}}
              <h3 style="margin: 20px 0 10px; font-size: 16px; color: #333333;">Produse comandate:</h3>
              {{#each products}}
              <div style="margin-bottom: 15px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="100" style="vertical-align: top;">
                      {{#if this.image_url}}
                      <a href="{{this.productLink}}" style="display: block;">
                        <img src="{{this.image_url}}" alt="{{this.name}}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 4px;">
                      </a>
                      {{/if}}
                    </td>
                    <td style="padding-left: 15px; vertical-align: top;">
                      <h4 style="margin: 0 0 8px; font-size: 16px;">
                        <a href="{{this.productLink}}" style="color: #333333; text-decoration: none; font-weight: bold;">{{this.name}}</a>
                      </h4>
                      {{#if this.description}}
                      <p style="margin: 0 0 8px; font-size: 13px; color: #666666;">{{this.description}}</p>
                      {{/if}}
                      <p style="margin: 0; font-size: 14px; color: #666666;">
                        <strong>Cantitate:</strong> {{this.quantity}} × {{this.price}} RON
                      </p>
                      <p style="margin: 5px 0 0; font-size: 15px; color: #667eea; font-weight: bold;">
                        Subtotal: {{this.subtotal}} RON
                      </p>
                      <p style="margin: 10px 0 0;">
                        <a href="{{this.productLink}}" style="display: inline-block; padding: 8px 16px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 14px;">Vezi produsul</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
              {{/each}}
              {{/if}}

              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
                <p style="color: white; font-size: 14px; margin: 0 0 5px;">Total Comandă</p>
                <p style="color: white; font-size: 32px; font-weight: bold; margin: 0;">{{orderTotal}} RON</p>
              </div>

              <div style="margin: 30px 0; padding: 20px; background: #f0f4ff; border-radius: 8px; text-align: center;">
                <p style="color: #333; margin: 0 0 15px; font-size: 14px;">Cum a fost experiența ta cu această comandă?</p>
                <div style="font-size: 32px; letter-spacing: 10px;">
                  <a href="{{feedbackUrl5}}" style="text-decoration: none; color: #fbbf24; transition: transform 0.2s;">⭐</a>
                  <a href="{{feedbackUrl5}}" style="text-decoration: none; color: #fbbf24; transition: transform 0.2s;">⭐</a>
                  <a href="{{feedbackUrl5}}" style="text-decoration: none; color: #fbbf24; transition: transform 0.2s;">⭐</a>
                  <a href="{{feedbackUrl5}}" style="text-decoration: none; color: #fbbf24; transition: transform 0.2s;">⭐</a>
                  <a href="{{feedbackUrl5}}" style="text-decoration: none; color: #fbbf24; transition: transform 0.2s;">⭐</a>
                </div>
                <p style="color: #666; margin: 10px 0 0; font-size: 12px;">Apasă pe stele pentru a evalua</p>
              </div>

              <div style="margin: 30px 0; padding: 25px; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); border-radius: 8px; text-align: center;">
                <p style="color: white; margin: 0 0 15px; font-size: 16px; font-weight: bold;">Ai întrebări despre comandă?</p>
                <p style="color: white; margin: 0 0 20px; font-size: 14px;">Contactează-ne direct pe WhatsApp pentru răspuns rapid!</p>
                <a href="{{whatsappLink}}" style="display: inline-block; padding: 14px 32px; background-color: white; color: #25D366; text-decoration: none; border-radius: 25px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                  📱 Trimite mesaj pe WhatsApp
                </a>
              </div>

              <p style="margin: 25px 0 10px; font-size: 14px; line-height: 1.5; color: #333333;">Mulțumim că ai ales {{companyName}}!</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #666666;">Pentru orice întrebare, nu ezita să ne contactezi.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; background-color: #f8f9fa; text-align: center;">
              <p style="margin: 0 0 10px; font-size: 16px; font-weight: bold; color: #333333;">{{companyName}}</p>
              {{#if companyPhone}}
              <p style="margin: 5px 0; font-size: 14px; color: #666666;">
                📞 <a href="tel:{{companyPhone}}" style="color: #667eea; text-decoration: none;">{{companyPhone}}</a>
              </p>
              {{/if}}
              {{#if companyEmail}}
              <p style="margin: 5px 0; font-size: 14px; color: #666666;">
                📧 <a href="mailto:{{companyEmail}}" style="color: #667eea; text-decoration: none;">{{companyEmail}}</a>
              </p>
              {{/if}}
              {{#if companyAddress}}
              <p style="margin: 5px 0; font-size: 14px; color: #666666;">
                📍 {{companyAddress}}{{#if companyCity}}, {{companyCity}}{{/if}}
              </p>
              {{/if}}
              {{#if companyWebsite}}
              <p style="margin: 15px 0 0; font-size: 14px;">
                <a href="{{companyWebsite}}" style="color: #667eea; text-decoration: none; font-weight: bold;">Vizitează site-ul nostru</a>
              </p>
              {{/if}}
              <p style="margin: 20px 0 0; font-size: 12px; color: #999999;">
                © {{companyName}} - Toate drepturile rezervate
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <img src="{{trackingPixelUrl}}" width="1" height="1" style="display:none;" alt="">
</body>
</html>',
updated_at = now()
WHERE template_type = 'order_status';