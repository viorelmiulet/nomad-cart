import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useDiscount = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['discount-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('discount_settings')
        .select('*')
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  return {
    discountPercentage: data?.discount_percentage || 10,
    isActive: data?.is_active || false,
    isLoading,
  };
};
