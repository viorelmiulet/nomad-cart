import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { Loader2, ArrowLeft } from 'lucide-react';

const emailSchema = z.string().trim().email({ message: "Adresă de email invalidă" });
const passwordSchema = z.string().min(6, { message: "Parola trebuie să aibă cel puțin 6 caractere" });
const nameSchema = z.string().trim().min(2, { message: "Numele trebuie să aibă cel puțin 2 caractere" }).max(50, { message: "Numele trebuie să aibă maxim 50 caractere" });

export default function AuthPage() {
  const { user, signIn, signUp, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');

  // Redirect authenticated users
  useEffect(() => {
    if (user && !authLoading) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, authLoading, navigate, location]);

  const validateForm = (formType: 'login' | 'signup') => {
    try {
      if (formType === 'login') {
        emailSchema.parse(loginEmail);
        passwordSchema.parse(loginPassword);
      } else {
        emailSchema.parse(signupEmail);
        passwordSchema.parse(signupPassword);
        nameSchema.parse(signupName);
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Eroare de validare",
          description: error.issues[0].message,
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm('login')) return;
    
    setLoading(true);
    
    try {
      const { error } = await signIn(loginEmail, loginPassword);
      
      if (error) {
        let errorMessage = "Eroare la autentificare";
        
        if (error.message?.includes("Invalid login credentials")) {
          errorMessage = "Email sau parolă incorectă";
        } else if (error.message?.includes("Email not confirmed")) {
          errorMessage = "Vă rugăm să vă confirmați email-ul";
        } else if (error.message?.includes("Too many requests")) {
          errorMessage = "Prea multe încercări. Vă rugăm să așteptați";
        }
        
        toast({
          title: "Eroare",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Bun venit!",
          description: "V-ați autentificat cu succes.",
        });
      }
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o eroare neașteptată.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm('signup')) return;
    
    setLoading(true);
    
    try {
      const { error } = await signUp(signupEmail, signupPassword, signupName);
      
      if (error) {
        let errorMessage = "Eroare la înregistrare";
        
        if (error.message?.includes("User already registered")) {
          errorMessage = "Acest email este deja înregistrat";
        } else if (error.message?.includes("Password should be")) {
          errorMessage = "Parola trebuie să aibă cel puțin 6 caractere";
        } else if (error.message?.includes("Invalid email")) {
          errorMessage = "Adresă de email invalidă";
        }
        
        toast({
          title: "Eroare",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Cont creat cu succes!",
          description: "Vă rugăm să vă verificați email-ul pentru a confirma contul.",
        });
        // Switch to login tab after successful signup
        setActiveTab('login');
        setLoginEmail(signupEmail);
      }
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o eroare neașteptată.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Înapoi la magazin
        </Button>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">FurniLux</h1>
            <p className="text-muted-foreground">Autentifică-te sau creează un cont nou</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Autentificare</CardTitle>
              <CardDescription>
                Accesează contul tău sau creează unul nou pentru o experiență personalizată
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Conectare</TabsTrigger>
                  <TabsTrigger value="signup">Cont nou</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="email@exemplu.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Parolă</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Introdu parola"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Se conectează...
                        </>
                      ) : (
                        "Conectare"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Nume complet</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="Nume Prenume"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="email@exemplu.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Parolă</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Minim 6 caractere"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Se creează contul...
                        </>
                      ) : (
                        "Creează cont"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Poți comanda și ca oaspete fără să creezi cont
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}