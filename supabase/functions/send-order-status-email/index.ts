import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resendFrom = Deno.env.get("RESEND_FROM") || "Mobila Nomad <onboarding@resend.dev>";
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderStatusEmailRequest {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  status: string;
  newStatus: string;
}

const getStatusDisplayName = (status: string): string => {
  switch (status) {
    case 'pending': return 'În așteptare';
    case 'processing': return 'În procesare';
    case 'completed': return 'Finalizată';
    case 'preluata': return 'Preluată';
    case 'cancelled': return 'Anulată';
    default: return status;
  }
};

const normalizeFrom = (input: string): string | null => {
  const s = (input || '').trim();
  if (!s) return null;
  const emailRegex = /^[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+$/;
  const nameEmailRegex = /^[^<>@]+<\s*[^<>@\s]+@[^<>@\s]+\.[^<>@\s]+\s*>$/;
  if (emailRegex.test(s)) return s;
  if (nameEmailRegex.test(s)) return s.replace(/\s+/g, ' ').replace(/\s*>/, '>');
  return null;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerEmail, orderNumber, newStatus }: OrderStatusEmailRequest = await req.json();

    console.log(`Sending order status email to: ${customerEmail} for order: ${orderNumber} with status: ${newStatus}`);

    const statusDisplay = getStatusDisplayName(newStatus);
    
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch company info
    const { data: companyInfo } = await supabase
      .from('company_info')
      .select('*')
      .single();

    // Fetch order details with items and products
    const { data: orderData } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (
            id,
            name,
            image_url,
            description
          )
        )
      `)
      .eq('id', orderNumber)
      .single();

    // Build products HTML with images
    let productsHtml = '';
    if (orderData?.order_items && orderData.order_items.length > 0) {
      productsHtml = `
        <h3 style="color: #333; margin: 30px 0 15px 0; font-size: 20px;">Produse comandate:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 12px; text-align: left; border: 1px solid #e0e0e0; font-weight: 600; color: #333;">Produs</th>
              <th style="padding: 12px; text-align: center; border: 1px solid #e0e0e0; font-weight: 600; color: #333;">Cantitate</th>
              <th style="padding: 12px; text-align: right; border: 1px solid #e0e0e0; font-weight: 600; color: #333;">Preț</th>
            </tr>
          </thead>
          <tbody>
            ${orderData.order_items.map((item: any) => `
              <tr>
                <td style="padding: 15px; border: 1px solid #e0e0e0;">
                  <table style="width: 100%; border: none;">
                    <tr>
                      ${item.products?.image_url ? `
                        <td style="width: 100px; padding-right: 15px; border: none;">
                          <img src="${item.products.image_url}" 
                               alt="${item.products.name}" 
                               style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; display: block;" />
                        </td>
                      ` : ''}
                      <td style="border: none;">
                        <strong style="color: #333; font-size: 16px; display: block; margin-bottom: 5px;">${item.products?.name || 'Produs'}</strong>
                        ${item.products?.description ? `
                          <span style="color: #666; font-size: 14px; line-height: 1.4;">${item.products.description.substring(0, 120)}${item.products.description.length > 120 ? '...' : ''}</span>
                        ` : ''}
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="padding: 15px; text-align: center; border: 1px solid #e0e0e0; font-size: 16px; color: #333;">${item.quantity}</td>
                <td style="padding: 15px; text-align: right; border: 1px solid #e0e0e0; white-space: nowrap; font-size: 16px; font-weight: 600; color: #667eea;">${Number(item.price).toFixed(2)} RON</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    // Build company contact HTML
    let contactHtml = '';
    if (companyInfo) {
      contactHtml = `
        <div style="margin-top: 40px; padding: 25px; background: #f8f9fa; border-radius: 8px;">
          <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">${companyInfo.company_name}</h3>
          ${companyInfo.description ? `<p style="color: #666; margin: 0 0 15px 0; line-height: 1.5; font-size: 14px;">${companyInfo.description}</p>` : ''}
          <div style="color: #666; font-size: 14px; line-height: 1.8;">
            ${companyInfo.email ? `<div style="margin: 5px 0;">📧 <a href="mailto:${companyInfo.email}" style="color: #667eea; text-decoration: none;">${companyInfo.email}</a></div>` : ''}
            ${companyInfo.phone ? `<div style="margin: 5px 0;">📞 <a href="tel:${companyInfo.phone}" style="color: #667eea; text-decoration: none;">${companyInfo.phone}</a></div>` : ''}
            ${companyInfo.address ? `<div style="margin: 5px 0;">📍 ${companyInfo.address}${companyInfo.city ? `, ${companyInfo.city}` : ''}</div>` : ''}
            ${companyInfo.website ? `<div style="margin: 5px 0;">🌐 <a href="${companyInfo.website}" style="color: #667eea; text-decoration: none;">${companyInfo.website}</a></div>` : ''}
          </div>
        </div>
      `;
    }

    const fromHeader = normalizeFrom(resendFrom);
    if (!fromHeader) {
      console.error('Invalid RESEND_FROM format. Expected "Name <email@domain>" or "email@domain". Received:', resendFrom);
      return new Response(JSON.stringify({ error: 'Invalid RESEND_FROM format. Use "Name <email@domain>" or "email@domain".' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    console.log('Using RESEND_FROM:', fromHeader);
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromHeader,
        to: [customerEmail],
        subject: `Actualizare comandă #${orderNumber.slice(0, 8)}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">${companyInfo?.company_name || 'Mobila Nomad'}</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Actualizare comandă</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin: 0 0 20px 0;">Salut ${customerName}!</h2>
            
            <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
              Comanda ta a fost actualizată cu un nou status.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <div style="margin-bottom: 12px;">
                <span style="color: #666; font-size: 14px;">Numărul comenzii:</span><br>
                <strong style="color: #333; font-size: 18px;">#${orderNumber.slice(0, 8)}</strong>
              </div>
              <div style="margin-bottom: 12px;">
                <span style="color: #666; font-size: 14px;">Status nou:</span><br>
                <strong style="color: #667eea; font-size: 20px;">${statusDisplay}</strong>
              </div>
              ${orderData ? `
                <div style="margin-bottom: 12px;">
                  <span style="color: #666; font-size: 14px;">Total comandă:</span><br>
                  <strong style="color: #333; font-size: 22px;">${Number(orderData.total).toFixed(2)} RON</strong>
                </div>
                ${orderData.customer_phone ? `
                  <div style="margin-bottom: 12px;">
                    <span style="color: #666; font-size: 14px;">Telefon:</span><br>
                    <span style="color: #333; font-size: 16px;">${orderData.customer_phone}</span>
                  </div>
                ` : ''}
                ${orderData.customer_address ? `
                  <div>
                    <span style="color: #666; font-size: 14px;">Adresă livrare:</span><br>
                    <span style="color: #333; font-size: 16px;">${orderData.customer_address}</span>
                  </div>
                ` : ''}
              ` : ''}
            </div>
            
            ${newStatus === 'completed' ? `
              <div style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <strong>🎉 Comanda ta a fost finalizată!</strong><br>
                Mulțumim pentru încrederea acordată!
              </div>
            ` : ''}
            
            ${newStatus === 'preluata' ? `
              <div style="background: #cce5ff; border: 1px solid #99ccff; color: #004085; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <strong>📦 Comanda ta a fost preluată!</strong><br>
                Sperăm că ești mulțumit de produsele noastre!
              </div>
            ` : ''}
            
            ${productsHtml}
            
            <p style="color: #666; line-height: 1.6; margin: 30px 0 0 0; font-size: 16px;">
              Dacă ai întrebări despre comanda ta, nu ezita să ne contactezi.
            </p>
            
            ${contactHtml}
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #999; font-size: 14px; margin: 0; text-align: center;">
              Cu drag,<br>
              <strong>Echipa ${companyInfo?.company_name || 'Mobila Nomad'}</strong>
            </p>
          </div>
        </div>
        `
      })
    });

    const emailData = await emailResponse.json().catch(() => ({}));

    if (!emailResponse.ok || (emailData && (emailData.statusCode || emailData.error))) {
      console.error('Resend API error:', emailData);
      return new Response(JSON.stringify({ success: false, error: emailData }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log('Email sent successfully:', emailData);

    // Save to email history
    const emailContent = `Comanda #${orderNumber} - Status: ${statusDisplay}`;
    const { error: historyError } = await supabase
      .from('email_history')
      .insert({
        recipients: [customerEmail],
        subject: `Actualizare comandă #${orderNumber}`,
        content: emailContent,
        email_type: 'order_status',
        order_id: orderNumber,
        status: 'sent'
      });

    if (historyError) {
      console.error('Failed to save email history:', historyError);
    }

    return new Response(JSON.stringify({ success: true, emailData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-order-status-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);