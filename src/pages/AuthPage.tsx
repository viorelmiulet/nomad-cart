import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';

// Validation schemas
const loginSchema = z.object({
  email: z.string().trim().email({ message: "Email invalid" }).max(255, { message: "Email-ul trebuie să aibă mai puțin de 255 de caractere" }),
  password: z.string().min(6, { message: "Parola trebuie să aibă cel puțin 6 caractere" }).max(128, { message: "Parola trebuie să aibă mai puțin de 128 de caractere" })
});

const signupSchema = z.object({
  email: z.string().trim().email({ message: "Email invalid" }).max(255, { message: "Email-ul trebuie să aibă mai puțin de 255 de caractere" }),
  password: z.string().min(6, { message: "Parola trebuie să aibă cel puțin 6 caractere" }).max(128, { message: "Parola trebuie să aibă mai puțin de 128 de caractere" }),
  confirmPassword: z.string(),
  displayName: z.string().trim().min(2, { message: "Numele trebuie să aibă cel puțin 2 caractere" }).max(100, { message: "Numele trebuie să aibă mai puțin de 100 de caractere" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Parolele nu se potrivesc",
  path: ["confirmPassword"]
});

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signIn, signUp } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = loginSchema.parse(loginData);
      
      const { error } = await signIn(validatedData.email, validatedData.password);

      if (error) {
        let errorMessage = "A apărut o eroare la autentificare";
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = "Email sau parolă incorectă";
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = "Vă rugăm să vă confirmați email-ul înainte de a vă conecta";
        } else if (error.message.includes('Too many requests')) {
          errorMessage = "Prea multe încercări. Încercați din nou mai târziu";
        }
        
        toast({
          title: "Eroare autentificare",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Bine ai venit!",
          description: "Te-ai conectat cu succes.",
        });
        navigate('/');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Date invalide",
          description: firstError.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = signupSchema.parse(signupData);
      
      const { error } = await signUp(validatedData.email, validatedData.password, validatedData.displayName);

      if (error) {
        let errorMessage = "A apărut o eroare la înregistrare";
        
        if (error.message.includes('User already registered')) {
          errorMessage = "Există deja un cont cu acest email";
        } else if (error.message.includes('Password should be at least 6 characters')) {
          errorMessage = "Parola trebuie să aibă cel puțin 6 caractere";
        } else if (error.message.includes('Unable to validate email address')) {
          errorMessage = "Adresa de email nu este validă";
        }
        
        toast({
          title: "Eroare înregistrare",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Cont creat cu succes!",
          description: "Vă rugăm să vă verificați email-ul pentru a vă confirma contul.",
        });
        // Reset form
        setSignupData({
          email: '',
          password: '',
          confirmPassword: '',
          displayName: ''
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Date invalide",
          description: firstError.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mobila Nomad</h1>
          <p className="text-muted-foreground mt-2">Mobilier de lux pentru căminul tău</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Autentificare</TabsTrigger>
            <TabsTrigger value="signup">Înregistrare</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Autentificare</CardTitle>
                <CardDescription>
                  Conectează-te la contul tău pentru a accesa istoricul comenzilor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="email@exemplu.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Parola</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Se conectează..." : "Conectează-te"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Înregistrare</CardTitle>
                <CardDescription>
                  Creează un cont pentru a beneficia de avantajele noastre
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nume complet</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Ion Popescu"
                      value={signupData.displayName}
                      onChange={(e) => setSignupData(prev => ({ ...prev, displayName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="email@exemplu.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Parola</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirmă parola</Label>
                    <div className="relative">
                      <Input
                        id="signup-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Se înregistrează..." : "Înregistrează-te"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <Button
            variant="link"
            onClick={() => navigate('/')}
            className="text-muted-foreground"
          >
            Înapoi la magazin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;