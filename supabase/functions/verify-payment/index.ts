import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { session_id } = await req.json();
    
    console.log("Verifying payment for session:", session_id);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (session.payment_status !== 'paid') {
      throw new Error('Payment not completed');
    }

    console.log("Payment verified, creating order");

    // Get order data from session metadata
    const orderData = JSON.parse(session.metadata?.order_data || '{}');
    const paymentMethod = session.metadata?.payment_method || 'card';
    
    // Create order in database
    const { data: orderRecord, error: orderError } = await supabaseClient
      .from('orders')
      .insert([{
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        customer_address: orderData.customer_address,
        total: session.amount_total / 100, // Convert back from bani to RON
        discount_code_id: orderData.discount_code_id || null,
        discount_percentage: orderData.discount_percentage || 0,
        discount_amount: orderData.discount_amount || 0,
        status: 'paid'
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    console.log("Order created:", orderRecord.id);

    // Create order items
    const orderItems = orderData.items.map((item: any) => ({
      order_id: orderRecord.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    console.log("Order items created");

    // Increment discount code usage if applied
    if (orderData.discount_code_id) {
      const { data: discountData } = await supabaseClient
        .from('discount_codes')
        .select('current_uses')
        .eq('id', orderData.discount_code_id)
        .single();
      
      if (discountData) {
        await supabaseClient
          .from('discount_codes')
          .update({ current_uses: discountData.current_uses + 1 })
          .eq('id', orderData.discount_code_id);
        
        console.log("Discount code usage incremented");
      }
    }

    return new Response(JSON.stringify({
      success: true, 
      order_id: orderRecord.id,
      payment_method: paymentMethod,
      discount_applied: session.metadata?.discount_applied
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});