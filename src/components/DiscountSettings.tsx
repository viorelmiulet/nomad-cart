import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Percent, Save } from "lucide-react";

export const DiscountSettings = () => {
  const [discountPercentage, setDiscountPercentage] = useState(10);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('discount_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      
      if (data) {
        setDiscountPercentage(data.discount_percentage);
        setIsActive(data.is_active);
      }
    } catch (error) {
      console.error('Error fetching discount settings:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: existingData } = await supabase
        .from('discount_settings')
        .select('id')
        .single();

      if (existingData) {
        const { error } = await supabase
          .from('discount_settings')
          .update({ 
            discount_percentage: discountPercentage,
            is_active: isActive 
          })
          .eq('id', existingData.id);

        if (error) throw error;
      }

      toast({
        title: "Setări salvate",
        description: "Procentul de reducere a fost actualizat cu succes.",
      });

      // Refresh the page to update all components
      window.location.reload();
    } catch (error: any) {
      console.error('Error saving discount settings:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut salva setările. Încercați din nou.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Percent className="h-5 w-5" />
          Setări Reducere Card
        </CardTitle>
        <CardDescription>
          Configurează procentul de reducere pentru plata cu cardul bancar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="discount-percentage">Procent reducere (%)</Label>
          <Input
            id="discount-percentage"
            type="number"
            min="0"
            max="100"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(Number(e.target.value))}
            placeholder="10"
          />
          <p className="text-sm text-muted-foreground">
            Procentul de reducere care va fi aplicat la plata cu cardul (0-100%)
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="discount-active">Reducere activă</Label>
            <p className="text-sm text-muted-foreground">
              Activează sau dezactivează reducerea pe site
            </p>
          </div>
          <Switch
            id="discount-active"
            checked={isActive}
            onCheckedChange={setIsActive}
          />
        </div>

        <Button 
          onClick={handleSave} 
          disabled={loading}
          className="w-full"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Se salvează..." : "Salvează setările"}
        </Button>

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Previzualizare:</p>
          <p className="text-sm text-muted-foreground">
            Produsele vor afișa <span className="font-bold text-brand-gold">-{discountPercentage}%</span> reducere pentru plata cu cardul.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Status: <span className={isActive ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
              {isActive ? "Activă" : "Dezactivată"}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
