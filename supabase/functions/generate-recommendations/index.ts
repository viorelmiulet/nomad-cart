import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

interface RecommendationRequest {
  customerEmail?: string;
  currentProductHandle?: string;
  limit?: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerEmail, currentProductHandle, limit = 4 }: RecommendationRequest = await req.json();

    console.log('Generating recommendations for:', { customerEmail, currentProductHandle });

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch order history
    let orderHistory = [];
    if (customerEmail) {
      const { data: orders } = await supabase
        .from('orders')
        .select(`
          id,
          created_at,
          total,
          order_items (
            quantity,
            price,
            products (
              id,
              name,
              description,
              category_id,
              categories (
                name,
                slug
              )
            )
          )
        `)
        .eq('customer_email', customerEmail)
        .order('created_at', { ascending: false })
        .limit(10);

      orderHistory = orders || [];
    }

    // Fetch all available products for recommendations
    const { data: allProducts } = await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        price,
        image_url,
        category_id,
        categories (
          name,
          slug
        )
      `)
      .eq('status', 'active')
      .limit(50);

    // Build context for AI
    const purchasedProducts = orderHistory.flatMap((order: any) => 
      order.order_items.map((item: any) => ({
        name: item.products?.name,
        category: item.products?.categories?.name,
        quantity: item.quantity,
        price: item.price
      }))
    );

    const systemPrompt = `You are a smart product recommendation engine for an e-commerce furniture store (Mobila Nomad). 
Your task is to analyze customer purchase history and suggest products they might be interested in.

Consider:
- Previously purchased product categories
- Price ranges customer is comfortable with
- Complementary products (e.g., if bought a bed, suggest nightstands)
- Similar style products
- Products that complete a room set

Return EXACTLY ${limit} product recommendations from the available products list.`;

    const userPrompt = `
Customer Purchase History:
${purchasedProducts.length > 0 ? JSON.stringify(purchasedProducts, null, 2) : 'No previous purchases (new customer)'}

${currentProductHandle ? `Currently viewing product: ${currentProductHandle}` : ''}

Available Products to Recommend:
${JSON.stringify(allProducts?.slice(0, 30).map((p: any) => ({
  id: p.id,
  name: p.name,
  description: p.description?.substring(0, 100),
  price: p.price,
  category: p.categories?.name
})), null, 2)}

Based on this data, recommend ${limit} products. For each product, explain WHY you're recommending it.
Return the response as a JSON array with this structure:
[
  {
    "productId": "product-id-from-list",
    "reason": "Brief explanation why this product is recommended"
  }
]

Only recommend products from the Available Products list. Focus on relevance and customer value.
`;

    // Call Lovable AI
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'AI service payment required.' 
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;

    console.log('AI Response:', aiContent);

    // Parse AI response
    let recommendations = [];
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = aiContent.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/) || 
                       aiContent.match(/(\[[\s\S]*?\])/);
      const jsonStr = jsonMatch ? jsonMatch[1] : aiContent;
      recommendations = JSON.parse(jsonStr);
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      // Fallback: return random products
      recommendations = allProducts?.slice(0, limit).map((p: any) => ({
        productId: p.id,
        reason: 'Recomandare populară'
      })) || [];
    }

    // Enrich recommendations with full product data
    const enrichedRecommendations = recommendations
      .map((rec: any) => {
        const product = allProducts?.find((p: any) => p.id === rec.productId);
        if (!product) return null;
        
        return {
          ...product,
          recommendationReason: rec.reason
        };
      })
      .filter(Boolean)
      .slice(0, limit);

    return new Response(JSON.stringify({ 
      recommendations: enrichedRecommendations,
      success: true 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error generating recommendations:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);
