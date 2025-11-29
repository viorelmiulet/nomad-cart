import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import Handlebars from "https://esm.sh/handlebars@4.7.8";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resendFrom = Deno.env.get("RESEND_FROM");
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

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

    // Fetch email template
    const { data: template } = await supabase
      .from('email_templates')
      .select('*')
      .eq('template_type', 'order_status')
      .eq('is_active', true)
      .single();

    if (!template) {
      throw new Error('Email template not found');
    }

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
        subject: template.subject,
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

    // Prepare template data
    const products = orderItems.map((item: any) => {
      const productUrl = item.products?.id 
        ? `https://mobilanomad.ro/product/${item.products.id}`
        : 'https://mobilanomad.ro/products';
      
      return {
        name: item.products?.name || 'Produs',
        description: item.products?.description ? item.products.description.substring(0, 120) + (item.products.description.length > 120 ? '...' : '') : '',
        image_url: item.products?.image_url || '',
        quantity: item.quantity,
        price: Number(item.price).toFixed(2),
        subtotal: (item.quantity * Number(item.price)).toFixed(2),
        productLink: makeTrackableLink(productUrl)
      };
    });

    // Generate WhatsApp contact link
    const companyPhoneClean = (companyInfo?.phone || '').replace(/\D/g, '');
    const whatsappMessage = encodeURIComponent(
      `Bună! Am o întrebare despre comanda mea #${order.id.slice(0, 8).toUpperCase()}.\n\n` +
      `Status actual: ${statusConfig[newStatus]?.title || newStatus}\n` +
      `Data comenzii: ${new Date(order.created_at).toLocaleDateString('ro-RO')}\n` +
      `Total: ${Number(order.total).toFixed(2)} RON\n\n` +
      `Mulțumesc!`
    );
    const whatsappLink = companyPhoneClean 
      ? `https://wa.me/${companyPhoneClean}?text=${whatsappMessage}`
      : `https://wa.me/?text=${whatsappMessage}`;

    const templateData = {
      customerName,
      orderNumber: order.id.slice(0, 8).toUpperCase(),
      statusTitle: statusConfig[newStatus]?.title || 'Actualizare Comandă',
      statusMessage: statusConfig[newStatus]?.message || `Comanda ta a fost actualizată la statusul: ${newStatus}`,
      newStatus: statusConfig[newStatus]?.title || newStatus,
      orderTotal: Number(order.total).toFixed(2),
      orderDate: new Date(order.created_at).toLocaleDateString('ro-RO'),
      orderAddress: order.customer_address,
      products,
      companyName: companyInfo?.company_name || 'Mobila Nomad',
      companyPhone: companyInfo?.phone || '',
      companyEmail: companyInfo?.email || '',
      companyAddress: companyInfo?.address || '',
      companyCity: companyInfo?.city || '',
      companyWebsite: companyInfo?.website || '',
      trackingPixelUrl,
      whatsappLink: makeTrackableLink(whatsappLink),
      feedbackUrl5: makeTrackableLink(`${supabaseUrl}/functions/v1/submit-email-feedback?id=${emailHistoryId}&email=${encodeURIComponent(customerEmail)}&rating=5`),
      feedbackUrl4: makeTrackableLink(`${supabaseUrl}/functions/v1/submit-email-feedback?id=${emailHistoryId}&email=${encodeURIComponent(customerEmail)}&rating=4`),
      feedbackUrl3: makeTrackableLink(`${supabaseUrl}/functions/v1/submit-email-feedback?id=${emailHistoryId}&email=${encodeURIComponent(customerEmail)}&rating=3`)
    };

    // Compile and render template
    const compiledTemplate = Handlebars.compile(template.html_content);
    const htmlContent = compiledTemplate(templateData);

    // Compile subject
    const compiledSubject = Handlebars.compile(template.subject);
    const emailSubject = compiledSubject(templateData);

    const fromHeader = normalizeFrom(resendFrom || '');
    if (!fromHeader) {
      console.error('Invalid RESEND_FROM format. Expected "Name <email@domain>" or "email@domain". Received:', resendFrom);
      return new Response(JSON.stringify({ error: 'Invalid RESEND_FROM format. Use "Name <email@domain>" or "email@domain".' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Extract reply-to email from fromHeader
    const replyToEmail = fromHeader.includes('<') 
      ? fromHeader.match(/<(.+)>/)?.[1] || fromHeader
      : fromHeader;

    // Generate plain text version
    const plainText = `
Bună ${customerName},

${statusConfig[newStatus]?.message || `Comanda ta a fost actualizată la statusul: ${newStatus}`}

Detalii comandă:
- Număr comandă: ${order.id.slice(0, 8).toUpperCase()}
- Data: ${new Date(order.created_at).toLocaleDateString('ro-RO')}
- Total: ${Number(order.total).toFixed(2)} RON
- Adresă: ${order.customer_address}

Produse comandate:
${orderItems.map((item: any) => `- ${item.products?.name || 'Produs'} x${item.quantity} - ${(item.quantity * Number(item.price)).toFixed(2)} RON`).join('\n')}

Pentru detalii, vizitează: https://mobilanomad.ro

${companyInfo?.company_name || 'Mobila Nomad'}
${companyInfo?.phone || ''}
${companyInfo?.email || ''}
${companyInfo?.address || ''}, ${companyInfo?.city || ''}
    `.trim();

    // Send email with anti-spam headers
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromHeader,
        to: [customerEmail],
        reply_to: replyToEmail,
        subject: emailSubject,
        html: htmlContent,
        text: plainText,
        headers: {
          'X-Entity-Ref-ID': emailHistoryId,
          'List-Unsubscribe': `<mailto:${replyToEmail}?subject=Unsubscribe>`,
          'X-Mailer': 'Mobila Nomad Notification System',
        }
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
