import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminPasswordLoginProps {
  onLogin: () => void;
}

export function AdminPasswordLogin({ onLogin }: AdminPasswordLoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Admin password hash (SHA-256 of "123456" - change this in production)
  const ADMIN_PASSWORD_HASH = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      toast({
        title: "Eroare",
        description: "Vă rugăm să introduceți parola.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const hashedPassword = await hashPassword(password.trim());
      
      if (hashedPassword === ADMIN_PASSWORD_HASH) {
        // Store admin session
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_auth_time', Date.now().toString());
        
        toast({
          title: "Autentificare reușită",
          description: "Bun venit în panoul de administrare!"
        });
        
        onLogin();
      } else {
        toast({
          title: "Parola incorectă",
          description: "Vă rugăm să introduceți parola corectă pentru acces.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la autentificare. Încercați din nou.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Acces Administrator</CardTitle>
          <CardDescription>
            Introduceți parola pentru a accesa panoul de administrare
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Parola Administrator</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduceți parola..."
                  className="pr-10"
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Se autentifică..." : "Acces"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Pentru securitate, sesiunea va expira după 24 de ore.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}