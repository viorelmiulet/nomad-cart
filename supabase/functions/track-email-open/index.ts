import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 1x1 transparent PNG pixel
const pixel = Uint8Array.from(atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="), c => c.charCodeAt(0));

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const emailHistoryId = url.searchParams.get('id');
    const recipientEmail = url.searchParams.get('email');

    if (!emailHistoryId || !recipientEmail) {
      console.log('Missing required parameters');
      return new Response(pixel, {
        headers: { "Content-Type": "image/png", ...corsHeaders }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get IP and user agent
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Track the email open
    const { error } = await supabase
      .from('email_opens')
      .insert({
        email_history_id: emailHistoryId,
        recipient_email: recipientEmail,
        ip_address: ipAddress,
        user_agent: userAgent
      });

    if (error) {
      console.error('Error tracking email open:', error);
    } else {
      console.log(`Email opened by ${recipientEmail} for email ${emailHistoryId}`);
    }

    // Always return the tracking pixel
    return new Response(pixel, {
      headers: { "Content-Type": "image/png", ...corsHeaders }
    });
  } catch (error: any) {
    console.error("Error in track-email-open function:", error);
    // Still return the pixel even if tracking fails
    return new Response(pixel, {
      headers: { "Content-Type": "image/png", ...corsHeaders }
    });
  }
};

serve(handler);
