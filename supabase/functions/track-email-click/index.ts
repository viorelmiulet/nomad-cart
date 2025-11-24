import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const emailHistoryId = url.searchParams.get('id');
    const recipientEmail = url.searchParams.get('email');
    const targetUrl = url.searchParams.get('url');

    if (!emailHistoryId || !recipientEmail || !targetUrl) {
      return new Response('Missing required parameters', {
        status: 400,
        headers: corsHeaders
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get IP and user agent
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Track the link click
    const { error } = await supabase
      .from('email_clicks')
      .insert({
        email_history_id: emailHistoryId,
        recipient_email: recipientEmail,
        link_url: decodeURIComponent(targetUrl),
        ip_address: ipAddress,
        user_agent: userAgent
      });

    if (error) {
      console.error('Error tracking email click:', error);
    } else {
      console.log(`Link clicked by ${recipientEmail} for email ${emailHistoryId}: ${targetUrl}`);
    }

    // Redirect to the target URL
    return new Response(null, {
      status: 302,
      headers: {
        'Location': decodeURIComponent(targetUrl),
        ...corsHeaders
      }
    });
  } catch (error: any) {
    console.error("Error in track-email-click function:", error);
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
