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

const statusConfig: Record<string, { emoji: string; title: string; message: string }> = {
  pending: {
    emoji: '⏳',
    title: 'Comandă În Așteptare',
    message: 'Comanda ta a fost primită și este în curs de procesare. Te vom anunța când va fi preluată!'
  },
  processing: {
    emoji: '⚙️',
    title: 'Comandă În Procesare',
    message: 'Comanda ta este în procesare. Pregătim produsele pentru livrare!'
  },
  preluata: {
    emoji: '📦',
    title: 'Comandă Preluată',
    message: 'Comanda ta a fost preluată și va fi livrată în curând!'
  },
  completed: {
    emoji: '✅',
    title: 'Comandă Finalizată',
    message: 'Comanda ta a fost finalizată cu succes! Mulțumim pentru încredere!'
  },
  cancelled: {
    emoji: '❌',
    title: 'Comandă Anulată',
    message: 'Comanda ta a fost anulată. Dacă ai întrebări, te rugăm să ne contactezi.'
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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerEmail, orderNumber, newStatus }: OrderStatusEmailRequest = await req.json();

    console.log(`Sending order status email to: ${customerEmail} for order: ${orderNumber} with status: ${newStatus}`);

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch company info
    const { data: companyInfo } = await supabase
      .from('company_info')
      .select('*')
      .single();

    // Fetch order details with items and products
    const { data: order } = await supabase
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

    if (!order) {
      throw new Error('Order not found');
    }

    const orderItems = order.order_items || [];

    // Create email history record first to get tracking ID
    const emailContent = `Comanda #${orderNumber} - Status: ${statusConfig[newStatus]?.title || newStatus}`;
    const { data: historyData, error: historyError } = await supabase
      .from('email_history')
      .insert({
        recipients: [customerEmail],
        subject: `Actualizare comandă #${orderNumber.slice(0, 8)}`,
        content: emailContent,
        email_type: 'order_status',
        order_id: orderNumber,
        status: 'sending'
      })
      .select()
      .single();

    if (historyError || !historyData) {
      console.error('Failed to create email history:', historyError);
      throw new Error('Failed to create email history');
    }

    const emailHistoryId = historyData.id;

    // Generate tracking URLs
    const trackingPixelUrl = `${supabaseUrl}/functions/v1/track-email-open?id=${emailHistoryId}&email=${encodeURIComponent(customerEmail)}`;
    
    const makeTrackableLink = (url: string) => {
      return `${supabaseUrl}/functions/v1/track-email-click?id=${emailHistoryId}&email=${encodeURIComponent(customerEmail)}&url=${encodeURIComponent(url)}`;
    };

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
            ${companyInfo.website ? `<div style="margin: 5px 0;">🌐 <a href="${makeTrackableLink(companyInfo.website)}" style="color: #667eea; text-decoration: none;">${companyInfo.website}</a></div>` : ''}
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

    // Send email
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
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 24px;">
              ${statusConfig[newStatus]?.emoji || '📦'} ${statusConfig[newStatus]?.title || 'Actualizare Comandă'}
            </h2>
            
            <p style="color: #666; line-height: 1.8; margin: 0 0 20px 0; font-size: 16px;">
              ${statusConfig[newStatus]?.message || `Comanda ta a fost actualizată la statusul: ${newStatus}`}
            </p>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">📋 Detalii Comandă</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Număr comandă:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: bold; font-size: 14px;">#${order.id.slice(0, 8)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Data:</td>
                  <td style="padding: 8px 0; color: #333; font-size: 14px;">${new Date(order.created_at).toLocaleDateString('ro-RO')}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Status:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: bold; font-size: 14px;">${statusConfig[newStatus]?.title || newStatus}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Client:</td>
                  <td style="padding: 8px 0; color: #333; font-size: 14px;">${order.customer_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Adresă livrare:</td>
                  <td style="padding: 8px 0; color: #333; font-size: 14px;">${order.customer_address}</td>
                </tr>
              </table>
            </div>

            <div style="margin: 25px 0;">
              <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">🛒 Produse Comandate</h3>
              ${orderItems.map((item: any) => `
                <div style="display: table; width: 100%; margin-bottom: 15px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                  <div style="display: table-row;">
                    <div style="display: table-cell; width: 120px; padding: 15px; vertical-align: top;">
                      ${item.products?.image_url ? `<a href="${makeTrackableLink(item.products.image_url)}" style="display: block;"><img src="${item.products.image_url}" alt="${item.products.name}" style="width: 100%; height: auto; border-radius: 4px; display: block;" /></a>` : ''}
                    </div>
                    <div style="display: table-cell; padding: 15px; vertical-align: top;">
                      <h4 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">${item.products?.name || 'Produs'}</h4>
                      ${item.products?.description ? `<p style="margin: 0 0 8px 0; color: #666; font-size: 13px;">${item.products.description.substring(0, 120)}${item.products.description.length > 120 ? '...' : ''}</p>` : ''}
                      <p style="margin: 0; color: #666; font-size: 14px;">
                        <strong>Cantitate:</strong> ${item.quantity} × ${Number(item.price).toFixed(2)} RON
                      </p>
                      <p style="margin: 5px 0 0 0; color: #667eea; font-weight: bold; font-size: 15px;">
                        Subtotal: ${(item.quantity * Number(item.price)).toFixed(2)} RON
                      </p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
              <p style="color: white; font-size: 14px; margin: 0 0 5px 0;">Total Comandă</p>
              <p style="color: white; font-size: 32px; font-weight: bold; margin: 0;">${Number(order.total).toFixed(2)} RON</p>
            </div>

            ${contactHtml}
            
            <div style="margin: 30px 0; padding: 20px; background: #f0f4ff; border-radius: 8px; text-align: center;">
              <p style="color: #333; margin: 0 0 15px 0; font-size: 14px;">Cum a fost experiența ta cu această comandă?</p>
              <div style="margin: 10px 0;">
                <a href="${makeTrackableLink(`${supabaseUrl}/functions/v1/submit-email-feedback?id=${emailHistoryId}&email=${encodeURIComponent(customerEmail)}&rating=5`)}" style="display: inline-block; margin: 0 5px; font-size: 24px; text-decoration: none;">⭐⭐⭐⭐⭐</a>
                <a href="${makeTrackableLink(`${supabaseUrl}/functions/v1/submit-email-feedback?id=${emailHistoryId}&email=${encodeURIComponent(customerEmail)}&rating=4`)}" style="display: inline-block; margin: 0 5px; font-size: 24px; text-decoration: none;">⭐⭐⭐⭐</a>
                <a href="${makeTrackableLink(`${supabaseUrl}/functions/v1/submit-email-feedback?id=${emailHistoryId}&email=${encodeURIComponent(customerEmail)}&rating=3`)}" style="display: inline-block; margin: 0 5px; font-size: 24px; text-decoration: none;">⭐⭐⭐</a>
              </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #999; font-size: 14px; margin: 0; text-align: center;">
              Cu drag,<br>
              <strong>Echipa ${companyInfo?.company_name || 'Mobila Nomad'}</strong>
            </p>
          </div>
          
          <!-- Tracking Pixel -->
          <img src="${trackingPixelUrl}" width="1" height="1" style="display:block;" alt="" />
        </div>
        `
      })
    });

    const emailData = await emailResponse.json().catch(() => ({}));

    if (!emailResponse.ok || (emailData && (emailData.statusCode || emailData.error))) {
      console.error('Resend API error:', emailData);
      
      // Update email history status to failed
      await supabase
        .from('email_history')
        .update({ status: 'failed', error_message: JSON.stringify(emailData) })
        .eq('id', emailHistoryId);
      
      return new Response(JSON.stringify({ success: false, error: emailData }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log('Email sent successfully:', emailData);

    // Update email history status to sent
    await supabase
      .from('email_history')
      .update({ status: 'sent' })
      .eq('id', emailHistoryId);

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
