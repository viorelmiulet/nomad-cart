import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import Handlebars from "https://cdn.skypack.dev/handlebars@4.7.8";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resendFrom = Deno.env.get("RESEND_FROM");
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TrackingEmailRequest {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  status: string;
  estimatedDelivery?: string;
  notes?: string;
}

const trackingStatusConfig: Record<string, { emoji: string; title: string; message: string }> = {
  pending: {
    emoji: '📦',
    title: 'Comandă Pregătită pentru Expediere',
    message: 'Comanda ta a fost pregătită și va fi expediată în curând!'
  },
  picked_up: {
    emoji: '🚚',
    title: 'Comandă Preluată de Curier',
    message: 'Comanda ta a fost preluată de către curier și este în drum!'
  },
  in_transit: {
    emoji: '🚛',
    title: 'Comandă În Tranzit',
    message: 'Comanda ta este în drum spre tine!'
  },
  out_for_delivery: {
    emoji: '🏃',
    title: 'Comandă În Livrare',
    message: 'Curierul este în drum pentru a-ți livra comanda astăzi!'
  },
  delivered: {
    emoji: '✅',
    title: 'Comandă Livrată',
    message: 'Comanda ta a fost livrată cu succes! Mulțumim pentru încredere!'
  },
  exception: {
    emoji: '⚠️',
    title: 'Problemă cu Livrarea',
    message: 'A apărut o problemă cu livrarea comenzii tale. Te rugăm să ne contactezi.'
  }
};

const carrierTrackingUrls: Record<string, string> = {
  'FedEx': 'https://www.fedex.com/fedextrack/?trknbr=',
  'UPS': 'https://www.ups.com/track?tracknum=',
  'DHL': 'https://www.dhl.com/ro-en/home/tracking/tracking-express.html?submit=1&tracking-id=',
  'USPS': 'https://tools.usps.com/go/TrackConfirmAction?tLabels=',
  'FAN Courier': 'https://www.fancourier.ro/awb-tracking/?xawb=',
  'Cargus': 'https://www.cargus.ro/tracking/?awb=',
  'Sameday': 'https://sameday.ro/tracking?awb=',
  'Other': ''
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
    const { orderId, trackingNumber, carrier, status, estimatedDelivery, notes }: TrackingEmailRequest = await req.json();

    console.log(`Sending tracking email for order: ${orderId}, tracking: ${trackingNumber}, status: ${status}`);

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch order details
    const { data: order } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (
            id,
            name,
            image_url
          )
        )
      `)
      .eq('id', orderId)
      .single();

    if (!order) {
      throw new Error('Order not found');
    }

    // Fetch email template
    const { data: template } = await supabase
      .from('email_templates')
      .select('*')
      .eq('template_type', 'tracking_update')
      .eq('is_active', true)
      .single();

    if (!template) {
      throw new Error('Tracking email template not found');
    }

    // Fetch company info
    const { data: companyInfo } = await supabase
      .from('company_info')
      .select('*')
      .single();

    // Create email history record
    const emailContent = `Tracking Update - Order #${order.id.slice(0, 8).toUpperCase()} - ${trackingNumber}`;
    const { data: historyData, error: historyError } = await supabase
      .from('email_history')
      .insert({
        recipients: [order.customer_email],
        subject: template.subject,
        content: emailContent,
        email_type: 'tracking_update',
        order_id: orderId,
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
    const trackingPixelUrl = `${supabaseUrl}/functions/v1/track-email-open?id=${emailHistoryId}&email=${encodeURIComponent(order.customer_email)}`;
    
    const makeTrackableLink = (url: string) => {
      return `${supabaseUrl}/functions/v1/track-email-click?id=${emailHistoryId}&email=${encodeURIComponent(order.customer_email)}&url=${encodeURIComponent(url)}`;
    };

    // Generate carrier tracking link
    const carrierBaseUrl = carrierTrackingUrls[carrier] || carrierTrackingUrls['Other'];
    const carrierTrackingUrl = carrierBaseUrl ? carrierBaseUrl + trackingNumber : '';

    // Prepare template data
    const orderItems = order.order_items || [];
    const products = orderItems.map((item: any) => ({
      name: item.products?.name || 'Produs',
      quantity: item.quantity,
      price: Number(item.price).toFixed(2)
    }));

    // Generate WhatsApp contact link
    const companyPhoneClean = (companyInfo?.phone || '').replace(/\D/g, '');
    const whatsappMessage = encodeURIComponent(
      `Bună! Am o întrebare despre tracking-ul comenzii mele #${order.id.slice(0, 8).toUpperCase()}.\n\n` +
      `Număr tracking: ${trackingNumber}\n` +
      `Curier: ${carrier}\n` +
      `Status: ${trackingStatusConfig[status]?.title || status}\n\n` +
      `Mulțumesc!`
    );
    const whatsappLink = companyPhoneClean 
      ? `https://wa.me/${companyPhoneClean}?text=${whatsappMessage}`
      : `https://wa.me/?text=${whatsappMessage}`;

    const templateData = {
      customerName: order.customer_name,
      orderNumber: order.id.slice(0, 8).toUpperCase(),
      trackingNumber,
      carrier,
      status: trackingStatusConfig[status]?.title || status,
      statusEmoji: trackingStatusConfig[status]?.emoji || '📦',
      statusMessage: trackingStatusConfig[status]?.message || 'Am actualizat informațiile de tracking pentru comanda ta.',
      estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery).toLocaleDateString('ro-RO', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) : 'Va fi comunicată în curând',
      notes: notes || '',
      carrierTrackingUrl: carrierTrackingUrl ? makeTrackableLink(carrierTrackingUrl) : '',
      orderTotal: Number(order.total).toFixed(2),
      orderDate: new Date(order.created_at).toLocaleDateString('ro-RO'),
      products,
      companyName: companyInfo?.company_name || 'Mobila Nomad',
      companyPhone: companyInfo?.phone || '',
      companyEmail: companyInfo?.email || '',
      companyAddress: companyInfo?.address || '',
      companyCity: companyInfo?.city || '',
      companyWebsite: companyInfo?.website || '',
      trackingPixelUrl,
      whatsappLink: makeTrackableLink(whatsappLink)
    };

    // Compile and render template
    const compiledTemplate = Handlebars.compile(template.html_content);
    const htmlContent = compiledTemplate(templateData);

    // Compile subject
    const compiledSubject = Handlebars.compile(template.subject);
    const emailSubject = compiledSubject(templateData);

    const fromHeader = normalizeFrom(resendFrom || '');
    if (!fromHeader) {
      console.error('Invalid RESEND_FROM format.');
      throw new Error('Invalid RESEND_FROM configuration');
    }

    const replyToEmail = fromHeader.includes('<') 
      ? fromHeader.match(/<(.+)>/)?.[1] || fromHeader
      : fromHeader;

    // Generate plain text version
    const plainText = `
Bună ${order.customer_name},

${trackingStatusConfig[status]?.message || 'Am actualizat informațiile de tracking pentru comanda ta.'}

Detalii Tracking:
- Număr tracking: ${trackingNumber}
- Curier: ${carrier}
- Status: ${trackingStatusConfig[status]?.title || status}
${estimatedDelivery ? `- Livrare estimată: ${new Date(estimatedDelivery).toLocaleDateString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` : ''}
${notes ? `- Notă: ${notes}` : ''}

Detalii comandă:
- Număr comandă: ${order.id.slice(0, 8).toUpperCase()}
- Data: ${new Date(order.created_at).toLocaleDateString('ro-RO')}
- Total: ${Number(order.total).toFixed(2)} RON

${carrierTrackingUrl ? `Urmărește-ți coletul: ${carrierBaseUrl}${trackingNumber}` : ''}

${companyInfo?.company_name || 'Mobila Nomad'}
${companyInfo?.phone || ''}
${companyInfo?.email || ''}
    `.trim();

    // Send email
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromHeader,
        to: [order.customer_email],
        reply_to: replyToEmail,
        subject: emailSubject,
        html: htmlContent,
        text: plainText,
        headers: {
          'X-Entity-Ref-ID': emailHistoryId,
          'List-Unsubscribe': `<mailto:${replyToEmail}?subject=Unsubscribe>`,
          'X-Mailer': 'Mobila Nomad Tracking System',
        }
      })
    });

    const emailData = await emailResponse.json().catch(() => ({}));

    if (!emailResponse.ok || (emailData && (emailData.statusCode || emailData.error))) {
      console.error('Resend API error:', emailData);
      
      await supabase
        .from('email_history')
        .update({ status: 'failed', error_message: JSON.stringify(emailData) })
        .eq('id', emailHistoryId);
      
      return new Response(JSON.stringify({ success: false, error: emailData }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log('Tracking email sent successfully:', emailData);

    await supabase
      .from('email_history')
      .update({ status: 'sent' })
      .eq('id', emailHistoryId);

    return new Response(JSON.stringify({ success: true, emailData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-tracking-email function:", error);
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
