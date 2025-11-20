import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SupportNotificationRequest {
  user_name: string;
  user_email: string;
  user_phone?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_name, user_email, user_phone, message }: SupportNotificationRequest = await req.json();

    console.log("Received support notification request:", { user_name, user_email, user_phone });

    // Validate input
    if (!user_name || !user_email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get admin email from company_info
    const { data: companyInfo, error: companyError } = await supabase
      .from("company_info")
      .select("email")
      .limit(1)
      .single();

    if (companyError) {
      console.error("Error fetching company info:", companyError);
      return new Response(
        JSON.stringify({ error: "Could not fetch admin email" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const adminEmail = companyInfo?.email;
    if (!adminEmail) {
      console.error("No admin email configured in company_info");
      return new Response(
        JSON.stringify({ error: "Admin email not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const fromEmail = Deno.env.get("RESEND_FROM") || "Mobila Nomad <onboarding@resend.dev>";

    // Send email to admin
    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject: `🔔 Mesaj nou de support de la ${user_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #1e40af; margin-bottom: 20px; font-size: 24px;">
              📨 Mesaj nou de support
            </h1>
            
            <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p style="margin: 0; color: #1e40af; font-weight: bold;">Detalii client:</p>
              <p style="margin: 8px 0 0 0; color: #1e3a8a;"><strong>Nume:</strong> ${user_name}</p>
              <p style="margin: 5px 0 0 0; color: #1e3a8a;"><strong>Email:</strong> ${user_email}</p>
              ${user_phone ? `<p style="margin: 5px 0 0 0; color: #1e3a8a;"><strong>Telefon:</strong> ${user_phone}</p>` : ''}
            </div>

            <div style="background-color: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #374151; font-weight: bold;">Mesajul:</p>
              <p style="margin: 0; color: #1f2937; line-height: 1.6;">${message}</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                Răspunde rapid accesând <a href="https://shogmmpqpwkljdlmmcbs.supabase.co" style="color: #3b82f6; text-decoration: none;">panoul de administrare</a>.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Mobila Nomad - Sistem de notificări support</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailResponse }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-support-notification function:", error);
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
