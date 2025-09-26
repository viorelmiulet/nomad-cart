import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Footer component
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Package, ShoppingCart, Settings, Eye, Edit, Trash2 } from "lucide-react";

const AdminPage = () => {
  // Mock data for demonstration
  const [products] = useState([
    { id: 1, name: "Canapea Modernă", category: "Living", price: 2500, stock: 15, status: "active" },
    { id: 2, name: "Masă Dining", category: "Bucătărie", price: 1800, stock: 8, status: "active" },
    { id: 3, name: "Dulap Dormitor", category: "Dormitor", price: 3200, stock: 5, status: "inactive" },
    { id: 4, name: "Fotoliu Elegant", category: "Living", price: 1200, stock: 12, status: "active" },
  ]);

  const [orders] = useState([
    { id: 1, customer: "Ion Popescu", total: 2500, status: "completed", date: "2024-01-15" },
    { id: 2, customer: "Maria Ionescu", total: 1800, status: "pending", date: "2024-01-14" },
    { id: 3, customer: "Andrei Stoica", total: 4400, status: "processing", date: "2024-01-13" },
  ]);

  const stats = [
    { title: "Total Produse", value: "124", icon: Package, color: "bg-blue-500" },
    { title: "Comenzi Luna", value: "48", icon: ShoppingCart, color: "bg-green-500" },
    { title: "Clienți Activi", value: "1,234", icon: Users, color: "bg-purple-500" },
    { title: "Vânzări Luna", value: "85,240 RON", icon: BarChart3, color: "bg-orange-500" },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Panou Administrator</h1>
          <p className="text-muted-foreground">Gestionează magazinul tău de mobilier</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`h-8 w-8 rounded-md ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Produse</TabsTrigger>
            <TabsTrigger value="orders">Comenzi</TabsTrigger>
            <TabsTrigger value="settings">Setări</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Gestionare Produse</CardTitle>
                <CardDescription>
                  Administrează inventarul de mobilier
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Button className="bg-primary text-primary-foreground">
                    <Package className="mr-2 h-4 w-4" />
                    Adaugă Produs Nou
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nume Produs</TableHead>
                      <TableHead>Categorie</TableHead>
                      <TableHead>Preț</TableHead>
                      <TableHead>Stoc</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Acțiuni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price} RON</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(product.status)}>
                            {product.status === 'active' ? 'Activ' : 'Inactiv'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Gestionare Comenzi</CardTitle>
                <CardDescription>
                  Monitorizează și procesează comenzile clienților
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Comandă</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Acțiuni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.total} RON</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(order.status)}>
                            {order.status === 'completed' ? 'Finalizată' : 
                             order.status === 'pending' ? 'În așteptare' : 'În procesare'}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Setări Generale</CardTitle>
                <CardDescription>
                  Configurează setările magazinului
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Informații Magazin</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Nume Magazin</label>
                            <p className="text-sm text-muted-foreground">FurniLux</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email Contact</label>
                            <p className="text-sm text-muted-foreground">contact@mobilierultau.ro</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Telefon WhatsApp</label>
                            <p className="text-sm text-muted-foreground">0758433114</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Acțiuni Rapide</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            Configurare Plăți
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Users className="mr-2 h-4 w-4" />
                            Gestionare Utilizatori
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Rapoarte Vânzări
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;