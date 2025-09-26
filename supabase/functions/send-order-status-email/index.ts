import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY");

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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerEmail, orderNumber, newStatus }: OrderStatusEmailRequest = await req.json();

    console.log(`Sending order status email to: ${customerEmail} for order: ${orderNumber} with status: ${newStatus}`);

    const statusDisplay = getStatusDisplayName(newStatus);
    
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "FurniLux <onboarding@resend.dev>",
        to: [customerEmail],
        subject: `Actualizare comandă #${orderNumber}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">FurniLux</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Actualizare comandă</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin: 0 0 20px 0;">Salut ${customerName}!</h2>
            
            <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
              Comanda ta a fost actualizată cu un nou status.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span style="color: #666;">Numărul comenzii:</span>
                <strong style="color: #333;">#${orderNumber}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Status nou:</span>
                <strong style="color: #667eea;">${statusDisplay}</strong>
              </div>
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
            
            <p style="color: #666; line-height: 1.6; margin: 20px 0 0 0;">
              Dacă ai întrebări despre comanda ta, nu ezita să ne contactezi.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #999; font-size: 14px; margin: 0; text-align: center;">
              Cu drag,<br>
              <strong>Echipa FurniLux</strong>
            </p>
          </div>
        </div>
        `
      })
    });

    const emailData = await emailResponse.json();

    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true, emailData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
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