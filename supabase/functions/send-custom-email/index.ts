import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resendFrom = Deno.env.get("RESEND_FROM") || "Mobila Nomad <onboarding@resend.dev>";

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

    // Send email to all recipients
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromHeader,
        to: recipients,
        subject: subject,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Mobila Nomad</h1>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;">
            ${htmlContent}
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #999; font-size: 14px; margin: 0; text-align: center;">
              Cu drag,<br>
              <strong>Echipa Mobila Nomad</strong>
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

    console.log('Custom email sent successfully:', emailData);

    return new Response(JSON.stringify({ success: true, emailData }), {
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
