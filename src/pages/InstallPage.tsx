import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Smartphone, Download, Check, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPage = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsInstallable(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <SEO 
        title="Instalează Aplicația Mobila Nomad"
        description="Instalează aplicația Mobila Nomad pe telefonul tău pentru o experiență mai rapidă și acces offline la produsele noastre."
        canonical="https://mobilanomad.ro/install"
      />
      <Header onSearchOpenChange={() => {}} />
      
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-foreground">
              Instalează Aplicația Mobila Nomad
            </h1>
            <p className="text-lg text-muted-foreground">
              Descoperă o experiență mai rapidă de cumpărături cu aplicația noastră
            </p>
          </div>

          {isInstalled ? (
            <Card className="border-brand-gold/20">
              <CardHeader>
                <div className="flex items-center gap-2 text-brand-gold mb-2">
                  <Check className="w-6 h-6" />
                  <CardTitle>Aplicația este deja instalată!</CardTitle>
                </div>
                <CardDescription>
                  Poți accesa Mobila Nomad direct de pe ecranul principal al telefonului tău.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate("/")}
                  className="w-full bg-brand-gradient text-brand-dark hover:opacity-90"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Înapoi la Pagina Principală
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {isInstallable && (
                <Card className="mb-8 border-brand-gold/20">
                  <CardHeader>
                    <CardTitle>Instalează acum</CardTitle>
                    <CardDescription>
                      Apasă butonul de mai jos pentru a instala aplicația pe dispozitivul tău
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={handleInstallClick}
                      className="w-full bg-brand-gradient text-brand-dark hover:opacity-90"
                      size="lg"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Instalează Aplicația
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <Smartphone className="w-12 h-12 text-brand-gold mb-4" />
                    <CardTitle>Acces Rapid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Deschide aplicația direct de pe ecranul principal, fără să deschizi browserul
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Download className="w-12 h-12 text-brand-gold mb-4" />
                    <CardTitle>Funcționează Offline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Navighează prin produse chiar și fără conexiune la internet
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Cum să instalezi manual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Pe iPhone/Safari:</h3>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>Apasă butonul "Share" (pătrățelul cu săgeată)</li>
                      <li>Scroll în jos și alege "Add to Home Screen"</li>
                      <li>Apasă "Add" pentru confirmare</li>
                    </ol>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Pe Android/Chrome:</h3>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>Apasă meniul (cele 3 puncte)</li>
                      <li>Alege "Add to Home screen" sau "Install app"</li>
                      <li>Apasă "Install" pentru confirmare</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default InstallPage;