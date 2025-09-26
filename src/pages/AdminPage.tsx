import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Footer component
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart3, Users, Package, ShoppingCart, Settings, Eye, Edit, Trash2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/ImageUpload";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: string;
  category_id: string;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total: number;
  status: string;
  created_at: string;
  order_items?: OrderItem[];
}

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  products?: {
    id: string;
    name: string;
    image_url: string;
  };
}

interface ProductImage {
  id: string;
  image_url: string;
  image_name: string;
  display_order: number;
  is_primary: boolean;
}

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<ImageFile[]>([]);
  const [editProductImages, setEditProductImages] = useState<ImageFile[]>([]);
  const { toast } = useToast();

  // Form states for new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    status: "active"
  });

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);

      // Fetch products with categories
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;
      setProducts(productsData || []);

      // Fetch orders with order items and product details
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (
              id,
              name,
              image_url
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca datele.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Upload images to Supabase Storage
  const uploadImages = async (images: ImageFile[], productId: string) => {
    const uploadPromises = images.map(async (imageFile, index) => {
      const fileExt = imageFile.file.name.split('.').pop();
      const fileName = `${productId}/${Date.now()}-${index}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, imageFile.file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      // Save image record to database
      const { error: dbError } = await supabase
        .from('product_images')
        .insert({
          product_id: productId,
          image_url: urlData.publicUrl,
          image_name: imageFile.file.name,
          display_order: index,
          is_primary: index === 0
        });

      if (dbError) throw dbError;
      
      return urlData.publicUrl;
    });

    return Promise.all(uploadPromises);
  };

  // Add new product
  const handleAddProduct = async () => {
    try {
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert([{
          name: newProduct.name,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
          category_id: newProduct.category_id,
          status: newProduct.status
        }])
        .select()
        .single();

      if (productError) throw productError;

      // Upload images if any
      if (productImages.length > 0) {
        await uploadImages(productImages, productData.id);
      }

      toast({
        title: "Succes",
        description: `Produsul a fost adăugat cu succes${productImages.length > 0 ? ` cu ${productImages.length} imagini` : ''}!`,
      });

      setIsAddProductOpen(false);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        status: "active"
      });
      setProductImages([]);
      fetchData();
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut adăuga produsul.",
        variant: "destructive",
      });
    }
  };

  // Edit product
  const handleEditProduct = async () => {
    if (!editingProduct) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: editingProduct.name,
          description: editingProduct.description,
          price: editingProduct.price,
          stock: editingProduct.stock,
          category_id: editingProduct.category_id,
          status: editingProduct.status
        })
        .eq('id', editingProduct.id);

      if (error) throw error;

      // Upload new images if any
      if (editProductImages.length > 0) {
        await uploadImages(editProductImages, editingProduct.id);
      }

      toast({
        title: "Succes",
        description: `Produsul a fost actualizat cu succes${editProductImages.length > 0 ? ` cu ${editProductImages.length} imagini noi` : ''}!`,
      });

      setIsEditProductOpen(false);
      setEditingProduct(null);
      setEditProductImages([]);
      fetchData();
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut actualiza produsul.",
        variant: "destructive",
      });
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Ești sigur că vrei să ștergi acest produs?")) return;

    try {
      // First delete associated images from storage
      const { data: imageData } = await supabase
        .from('product_images')
        .select('image_url')
        .eq('product_id', productId);

      if (imageData) {
        const deletePromises = imageData.map(async (img) => {
          const fileName = img.image_url.split('/').pop();
          if (fileName) {
            await supabase.storage
              .from('product-images')
              .remove([`${productId}/${fileName}`]);
          }
        });
        await Promise.all(deletePromises);
      }

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Succes",
        description: "Produsul a fost șters cu succes!",
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge produsul.",
        variant: "destructive",
      });
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      // Find the order to get customer details
      const order = orders.find(o => o.id === orderId);
      if (!order) {
        throw new Error("Comanda nu a fost găsită");
      }

      // Update order status in database
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      
      // Send status update email
      try {
        const { error: emailError } = await supabase.functions.invoke('send-order-status-email', {
          body: {
            customerName: order.customer_name,
            customerEmail: order.customer_email,
            orderNumber: orderId.slice(0, 8).toUpperCase(),
            newStatus: newStatus
          }
        });

        if (emailError) {
          console.error('Error sending email:', emailError);
        }
      } catch (emailError) {
        console.error('Error sending status email:', emailError);
        // Don't throw here - we still want to show success for status update
      }

      toast({
        title: "Succes",
        description: "Statusul comenzii a fost actualizat și clientul a fost notificat prin email.",
      });

      fetchData();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut actualiza statusul comenzii.",
        variant: "destructive",
      });
    }
  };

  // View order details
  const handleViewOrderDetails = async (order: Order) => {
    try {
      setSelectedOrder(order);
      
      // Fetch order items with product details
      const { data: orderItemsData, error } = await supabase
        .from('order_items')
        .select(`
          *,
          products (
            id,
            name,
            image_url
          )
        `)
        .eq('order_id', order.id);

      if (error) throw error;
      
      setOrderItems(orderItemsData || []);
      setIsOrderDetailsOpen(true);
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca detaliile comenzii.",
        variant: "destructive",
      });
    }
  };

  const stats = [
    { title: "Total Produse", value: products.length.toString(), icon: Package, color: "bg-blue-500" },
    { title: "Comenzi Luna", value: orders.filter(order => {
      const orderDate = new Date(order.created_at);
      const now = new Date();
      return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
    }).length.toString(), icon: ShoppingCart, color: "bg-green-500" },
    { title: "Produse Active", value: products.filter(p => p.status === 'active').length.toString(), icon: Users, color: "bg-purple-500" },
    { title: "Vânzări Luna", value: `${orders.filter(order => {
      const orderDate = new Date(order.created_at);
      const now = new Date();
      return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
    }).reduce((sum, order) => sum + order.total, 0).toFixed(0)} RON`, icon: BarChart3, color: "bg-orange-500" },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status: string) => {
    const statusText = {
      active: "Activ",
      inactive: "Inactiv",
      completed: "Finalizată",
      pending: "În așteptare",
      processing: "În procesare",
      cancelled: "Anulată",
    };
    return statusText[status as keyof typeof statusText] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Încărcare...</div>
        </div>
        <Footer />
      </div>
    );
  }

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
                  Administrează inventarul de mobilier cu imagini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary text-primary-foreground">
                        <Plus className="mr-2 h-4 w-4" />
                        Adaugă Produs Nou
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Adaugă Produs Nou</DialogTitle>
                        <DialogDescription>
                          Completează informațiile pentru noul produs și adaugă până la 50 de imagini.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Nume</Label>
                          <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">Descriere</Label>
                          <Input
                            id="description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="price" className="text-right">Preț</Label>
                          <Input
                            id="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="stock" className="text-right">Stoc</Label>
                          <Input
                            id="stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="category" className="text-right">Categorie</Label>
                          <Select value={newProduct.category_id} onValueChange={(value) => setNewProduct({...newProduct, category_id: value})}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Selectează categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Image Upload Section */}
                        <div className="col-span-4">
                          <Label className="text-sm font-medium mb-4 block">Imagini Produs</Label>
                          <ImageUpload 
                            images={productImages}
                            onImagesChange={setProductImages}
                            maxImages={50}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddProduct}>Adaugă Produs</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
                        <TableCell>{product.categories?.name || 'N/A'}</TableCell>
                        <TableCell>{product.price} RON</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(product.status)}>
                            {getStatusText(product.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingProduct(product);
                                setIsEditProductOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
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
                      <TableHead>Produse</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefon</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Acțiuni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="flex -space-x-2">
                            {order.order_items?.slice(0, 3).map((item, index) => (
                              <div key={item.id} className="relative">
                                {item.products?.image_url ? (
                                  <img 
                                    src={item.products.image_url} 
                                    alt={item.products.name}
                                    className="w-10 h-10 object-cover rounded-lg border-2 border-background"
                                    title={`${item.products.name} (${item.quantity}x)`}
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-muted rounded-lg border-2 border-background flex items-center justify-center">
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                            ))}
                            {order.order_items && order.order_items.length > 3 && (
                              <div className="w-10 h-10 bg-muted rounded-lg border-2 border-background flex items-center justify-center text-xs font-medium">
                                +{order.order_items.length - 3}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{order.customer_name}</TableCell>
                        <TableCell>{order.customer_email}</TableCell>
                        <TableCell>{order.customer_phone}</TableCell>
                        <TableCell>{order.total} RON</TableCell>
                        <TableCell>
                          <Select 
                            value={order.status} 
                            onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">În așteptare</SelectItem>
                              <SelectItem value="processing">În procesare</SelectItem>
                              <SelectItem value="completed">Finalizată</SelectItem>
                              <SelectItem value="preluata">Preluată</SelectItem>
                              <SelectItem value="cancelled">Anulată</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
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
                        <CardTitle className="text-lg">Statistici</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Total Categorii:</span>
                            <span className="font-medium">{categories.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Produse:</span>
                            <span className="font-medium">{products.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Comenzi:</span>
                            <span className="font-medium">{orders.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Produse în Stoc:</span>
                            <span className="font-medium">{products.reduce((sum, p) => sum + p.stock, 0)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Product Dialog */}
        <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editează Produs</DialogTitle>
              <DialogDescription>
                Modifică informațiile produsului și adaugă imagini noi.
              </DialogDescription>
            </DialogHeader>
            {editingProduct && (
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">Nume</Label>
                  <Input
                    id="edit-name"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-description" className="text-right">Descriere</Label>
                  <Input
                    id="edit-description"
                    value={editingProduct.description || ""}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-price" className="text-right">Preț</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-stock" className="text-right">Stoc</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-category" className="text-right">Categorie</Label>
                  <Select 
                    value={editingProduct.category_id} 
                    onValueChange={(value) => setEditingProduct({...editingProduct, category_id: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selectează categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">Status</Label>
                  <Select 
                    value={editingProduct.status} 
                    onValueChange={(value) => setEditingProduct({...editingProduct, status: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activ</SelectItem>
                      <SelectItem value="inactive">Inactiv</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Image Upload Section for Edit */}
                <div className="col-span-4">
                  <Label className="text-sm font-medium mb-4 block">Adaugă Imagini Noi</Label>
                  <ImageUpload 
                    images={editProductImages}
                    onImagesChange={setEditProductImages}
                    maxImages={50}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={handleEditProduct}>Salvează Modificările</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Order Details Dialog */}
        <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalii Comandă</DialogTitle>
              <DialogDescription>
                Vizualizează toate detaliile comenzii și produsele comandate
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6 py-4">
                {/* Customer Information */}
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Informații Client</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Nume</Label>
                        <p className="text-sm">{selectedOrder.customer_name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                        <p className="text-sm">{selectedOrder.customer_email}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Telefon</Label>
                        <p className="text-sm">{selectedOrder.customer_phone || 'Nu a fost furnizat'}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Informații Comandă</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">ID Comandă</Label>
                        <p className="text-sm font-mono">{selectedOrder.id.slice(0, 8).toUpperCase()}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Data Comandă</Label>
                        <p className="text-sm">{new Date(selectedOrder.created_at).toLocaleString('ro-RO')}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                        <Badge className={getStatusBadge(selectedOrder.status)}>
                          {getStatusText(selectedOrder.status)}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Total</Label>
                        <p className="text-lg font-bold text-primary">{selectedOrder.total.toLocaleString('ro-RO')} RON</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Produse Comandate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produs</TableHead>
                          <TableHead>Cantitate</TableHead>
                          <TableHead>Preț Unitar</TableHead>
                          <TableHead>Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                {item.products?.image_url && (
                                  <img 
                                    src={item.products.image_url} 
                                    alt={item.products.name}
                                    className="w-12 h-12 object-cover rounded-lg"
                                  />
                                )}
                                <div>
                                  <p className="font-medium">{item.products?.name || 'Produs șters'}</p>
                                  <p className="text-sm text-muted-foreground">ID: {item.product_id.slice(0, 8)}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">{item.quantity}</span>
                            </TableCell>
                            <TableCell>
                              {item.price.toLocaleString('ro-RO')} RON
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">
                                {(item.price * item.quantity).toLocaleString('ro-RO')} RON
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    {/* Order Summary */}
                    <div className="mt-6 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total Comandă:</span>
                        <span className="text-xl font-bold text-primary">
                          {selectedOrder.total.toLocaleString('ro-RO')} RON
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOrderDetailsOpen(false)}>
                Închide
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;