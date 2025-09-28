import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CompanyInfo {
  id: string;
  company_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  description: string | null;
  website: string | null;
}

export function CompanyInfoEditor() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Fetch company information
  const fetchCompanyInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('company_info')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setCompanyInfo(data);
      } else {
        // If no data exists, create default entry
        const defaultInfo = {
          company_name: 'Mobila Nomad',
          email: 'contact@mobilanomad.ro',
          phone: '+40 123 456 789',
          address: 'Strada Exemplu nr. 123',
          city: 'București',
          description: 'Magazin de mobilier de calitate pentru casa ta',
          website: 'https://mobilanomad.ro'
        };

        const { data: newData, error: insertError } = await supabase
          .from('company_info')
          .insert(defaultInfo)
          .select()
          .single();

        if (insertError) throw insertError;
        setCompanyInfo(newData);
      }
    } catch (error) {
      console.error('Error fetching company info:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca informațiile companiei.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update company information
  const updateCompanyInfo = async () => {
    if (!companyInfo) return;

    try {
      setIsSaving(true);

      const { error } = await supabase
        .from('company_info')
        .update({
          company_name: companyInfo.company_name,
          email: companyInfo.email,
          phone: companyInfo.phone,
          address: companyInfo.address,
          city: companyInfo.city,
          description: companyInfo.description,
          website: companyInfo.website
        })
        .eq('id', companyInfo.id);

      if (error) throw error;

      toast({
        title: "Succes",
        description: "Informațiile companiei au fost actualizate cu succes."
      });
    } catch (error) {
      console.error('Error updating company info:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut actualiza informațiile companiei.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const handleInputChange = (field: keyof CompanyInfo, value: string) => {
    if (!companyInfo) return;
    
    setCompanyInfo({
      ...companyInfo,
      [field]: value
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <CardTitle>Informații Companie</CardTitle>
          </div>
          <CardDescription>
            Se încarcă informațiile companiei...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!companyInfo) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <CardTitle>Informații Companie</CardTitle>
          </div>
          <CardDescription>
            Nu s-au putut încărca informațiile companiei.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Building2 className="h-5 w-5" />
          <CardTitle>Informații Companie</CardTitle>
        </div>
        <CardDescription>
          Editează detaliile companiei tale
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company_name">Nume Companie *</Label>
            <Input
              id="company_name"
              value={companyInfo.company_name}
              onChange={(e) => handleInputChange('company_name', e.target.value)}
              placeholder="Numele companiei"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={companyInfo.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="contact@compania.ro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              value={companyInfo.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+40 123 456 789"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={companyInfo.website || ''}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://compania.ro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adresă</Label>
            <Input
              id="address"
              value={companyInfo.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Strada Exemplu nr. 123"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Oraș</Label>
            <Input
              id="city"
              value={companyInfo.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="București"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descriere</Label>
          <Textarea
            id="description"
            value={companyInfo.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Descrierea companiei..."
            rows={3}
          />
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={updateCompanyInfo}
            disabled={isSaving}
            className="min-w-[120px]"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Se salvează...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvează
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}