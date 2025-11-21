import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Ticket, Plus, Trash2, Copy, CheckCircle } from "lucide-react";

interface DiscountCode {
  id: string;
  code: string;
  discount_percentage: number;
  is_active: boolean;
  max_uses: number | null;
  current_uses: number;
  expires_at: string | null;
  created_at: string;
}

export const DiscountCodes = () => {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();

  const [newCode, setNewCode] = useState({
    code: "",
    discount_percentage: "",
    max_uses: "",
    expires_at: "",
  });

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("discount_codes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCodes(data || []);
    } catch (error) {
      console.error("Error fetching discount codes:", error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca codurile de reducere.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setNewCode({ ...newCode, code: result });
  };

  const handleAddCode = async () => {
    if (!newCode.code || !newCode.discount_percentage) {
      toast({
        title: "Eroare",
        description: "Codul și procentajul sunt obligatorii.",
        variant: "destructive",
      });
      return;
    }

    const discountPercentage = parseInt(newCode.discount_percentage);
    if (discountPercentage < 0 || discountPercentage > 100) {
      toast({
        title: "Eroare",
        description: "Procentajul trebuie să fie între 0 și 100.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("discount_codes").insert({
        code: newCode.code.toUpperCase(),
        discount_percentage: discountPercentage,
        max_uses: newCode.max_uses ? parseInt(newCode.max_uses) : null,
        expires_at: newCode.expires_at || null,
      });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Eroare",
            description: "Acest cod există deja.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "Succes",
        description: "Codul de reducere a fost adăugat!",
      });

      setIsAddDialogOpen(false);
      setNewCode({
        code: "",
        discount_percentage: "",
        max_uses: "",
        expires_at: "",
      });
      fetchCodes();
    } catch (error) {
      console.error("Error adding discount code:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut adăuga codul de reducere.",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("discount_codes")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Succes",
        description: `Codul a fost ${!currentStatus ? "activat" : "dezactivat"}.`,
      });

      fetchCodes();
    } catch (error) {
      console.error("Error toggling code status:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut actualiza statusul.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCode = async (id: string) => {
    if (!confirm("Ești sigur că vrei să ștergi acest cod?")) return;

    try {
      const { error } = await supabase
        .from("discount_codes")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Succes",
        description: "Codul a fost șters.",
      });

      fetchCodes();
    } catch (error) {
      console.error("Error deleting code:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge codul.",
        variant: "destructive",
      });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    toast({
      title: "Copiat!",
      description: `Codul "${code}" a fost copiat în clipboard.`,
    });
  };

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const isMaxUsesReached = (code: DiscountCode) => {
    if (code.max_uses === null) return false;
    return code.current_uses >= code.max_uses;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Se încarcă...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Coduri de Reducere
            </CardTitle>
            <CardDescription>
              Generează și gestionează coduri de reducere pentru clienți
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Cod Nou
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adaugă Cod de Reducere</DialogTitle>
                <DialogDescription>
                  Creează un nou cod de reducere pentru clienți
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="code">Cod</Label>
                  <div className="flex gap-2">
                    <Input
                      id="code"
                      value={newCode.code}
                      onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                      placeholder="REDUCERE20"
                      className="uppercase"
                    />
                    <Button type="button" variant="outline" onClick={generateRandomCode}>
                      Generează
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="discount">Reducere (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={newCode.discount_percentage}
                    onChange={(e) => setNewCode({ ...newCode, discount_percentage: e.target.value })}
                    placeholder="20"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxUses">Utilizări maxime (opțional)</Label>
                  <Input
                    id="maxUses"
                    type="number"
                    min="1"
                    value={newCode.max_uses}
                    onChange={(e) => setNewCode({ ...newCode, max_uses: e.target.value })}
                    placeholder="Nelimitat"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expires">Data expirării (opțional)</Label>
                  <Input
                    id="expires"
                    type="datetime-local"
                    value={newCode.expires_at}
                    onChange={(e) => setNewCode({ ...newCode, expires_at: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Anulează
                </Button>
                <Button onClick={handleAddCode}>Adaugă Cod</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {codes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nu există coduri de reducere. Creează primul cod!
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cod</TableHead>
                <TableHead>Reducere</TableHead>
                <TableHead>Utilizări</TableHead>
                <TableHead>Expiră</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {codes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell className="font-mono font-bold">
                    <div className="flex items-center gap-2">
                      {code.code}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyCode(code.code)}
                        className="h-6 w-6 p-0"
                      >
                        {copiedCode === code.code ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{code.discount_percentage}%</Badge>
                  </TableCell>
                  <TableCell>
                    {code.current_uses} / {code.max_uses || "∞"}
                  </TableCell>
                  <TableCell>
                    {code.expires_at ? (
                      <span className={isExpired(code.expires_at) ? "text-destructive" : ""}>
                        {new Date(code.expires_at).toLocaleDateString("ro-RO")}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Nelimitat</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isExpired(code.expires_at) ? (
                      <Badge variant="destructive">Expirat</Badge>
                    ) : isMaxUsesReached(code) ? (
                      <Badge variant="destructive">Utilizat complet</Badge>
                    ) : code.is_active ? (
                      <Badge variant="default" className="bg-green-500">Activ</Badge>
                    ) : (
                      <Badge variant="secondary">Inactiv</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Switch
                        checked={code.is_active}
                        onCheckedChange={() => handleToggleActive(code.id, code.is_active)}
                        disabled={isExpired(code.expires_at) || isMaxUsesReached(code)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCode(code.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};