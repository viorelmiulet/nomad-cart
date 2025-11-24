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

interface CustomEmailRequest {
  recipients: string[];
  subject: string;
  htmlContent: string;
}

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
    const { recipients, subject, htmlContent }: CustomEmailRequest = await req.json();

    console.log(`Sending custom email to ${recipients.length} recipient(s) with subject: ${subject}`);

    if (!recipients || recipients.length === 0) {
      return new Response(JSON.stringify({ error: 'No recipients provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!subject || !htmlContent) {
      return new Response(JSON.stringify({ error: 'Subject and content are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const fromHeader = normalizeFrom(resendFrom);
    if (!fromHeader) {
      console.error('Invalid RESEND_FROM format. Expected "Name <email@domain>" or "email@domain". Received:', resendFrom);
      return new Response(JSON.stringify({ error: 'Invalid RESEND_FROM format. Use "Name <email@domain>" or "email@domain".' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch company info
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: companyInfo } = await supabase
      .from('company_info')
      .select('*')
      .single();

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

    // We'll send individual emails to track each recipient
    const emailResults = [];
    
    for (const recipient of recipients) {
      // Generate a unique email history ID for tracking
      const { data: historyData, error: historyError } = await supabase
        .from('email_history')
        .insert({
          recipients: [recipient],
          subject: subject,
          content: htmlContent,
          email_type: 'custom',
          status: 'sending'
        })
        .select()
        .single();

      if (historyError || !historyData) {
        console.error('Failed to create email history:', historyError);
        continue;
      }

      const emailHistoryId = historyData.id;
      
      // Generate tracking URLs
      const trackingPixelUrl = `${supabaseUrl}/functions/v1/track-email-open?id=${emailHistoryId}&email=${encodeURIComponent(recipient)}`;

      // Send email to this recipient
      const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          from: fromHeader,
          to: [recipient],
          subject: subject,
          html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">${companyInfo?.company_name || 'Mobila Nomad'}</h1>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;">
            ${htmlContent}
            
            ${contactHtml}
            
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
        console.error('Resend API error for recipient:', recipient, emailData);
        
        // Update status to failed
        await supabase
          .from('email_history')
          .update({ status: 'failed', error_message: JSON.stringify(emailData) })
          .eq('id', emailHistoryId);
          
        emailResults.push({ recipient, success: false, error: emailData });
      } else {
        console.log('Custom email sent successfully to:', recipient);
        
        // Update status to sent
        await supabase
          .from('email_history')
          .update({ status: 'sent' })
          .eq('id', emailHistoryId);
          
        emailResults.push({ recipient, success: true, emailData });
      }
    }

    const successCount = emailResults.filter(r => r.success).length;
    const failCount = emailResults.filter(r => !r.success).length;

    return new Response(JSON.stringify({ 
      success: successCount > 0, 
      totalSent: successCount,
      totalFailed: failCount,
      results: emailResults 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-custom-email function:", error);
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
