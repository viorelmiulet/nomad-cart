import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Package, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  total: number;
  created_at: string;
  status: string;
}

interface Tracking {
  id: string;
  order_id: string;
  tracking_number: string;
  carrier: string;
  status: string;
  estimated_delivery: string | null;
  notes: string | null;
  created_at: string;
}

const carriers = ["FedEx", "UPS", "DHL", "USPS", "Other"];
const statuses = ["pending", "picked_up", "in_transit", "out_for_delivery", "delivered", "exception"];

export const TrackingManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [trackings, setTrackings] = useState<Record<string, Tracking>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    tracking_number: "",
    carrier: "FedEx",
    status: "pending",
    estimated_delivery: "",
    notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ordersRes, trackingsRes] = await Promise.all([
        supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50),
        supabase.from("shipment_tracking").select("*"),
      ]);

      if (ordersRes.error) throw ordersRes.error;
      if (trackingsRes.error) throw trackingsRes.error;

      setOrders(ordersRes.data || []);
      
      const trackingMap: Record<string, Tracking> = {};
      (trackingsRes.data || []).forEach((t) => {
        trackingMap[t.order_id] = t;
      });
      setTrackings(trackingMap);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTracking = (order: Order) => {
    setSelectedOrder(order);
    const existing = trackings[order.id];
    
    if (existing) {
      setFormData({
        tracking_number: existing.tracking_number,
        carrier: existing.carrier,
        status: existing.status,
        estimated_delivery: existing.estimated_delivery
          ? new Date(existing.estimated_delivery).toISOString().split("T")[0]
          : "",
        notes: existing.notes || "",
      });
    } else {
      setFormData({
        tracking_number: "",
        carrier: "FedEx",
        status: "pending",
        estimated_delivery: "",
        notes: "",
      });
    }
    
    setIsDialogOpen(true);
  };

  const handleSaveTracking = async () => {
    if (!selectedOrder) return;
    if (!formData.tracking_number.trim()) {
      toast.error("Tracking number is required");
      return;
    }

    setIsSaving(true);
    try {
      const trackingData = {
        order_id: selectedOrder.id,
        tracking_number: formData.tracking_number,
        carrier: formData.carrier,
        status: formData.status,
        estimated_delivery: formData.estimated_delivery || null,
        notes: formData.notes || null,
      };

      const existing = trackings[selectedOrder.id];

      if (existing) {
        const { error } = await supabase
          .from("shipment_tracking")
          .update(trackingData)
          .eq("id", existing.id);

        if (error) throw error;
        toast.success("Tracking updated successfully");
      } else {
        const { error } = await supabase
          .from("shipment_tracking")
          .insert([trackingData]);

        if (error) throw error;
        toast.success("Tracking added successfully");
      }

      setIsDialogOpen(false);
      loadData();
    } catch (error) {
      console.error("Error saving tracking:", error);
      toast.error("Failed to save tracking");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTracking = async (trackingId: string) => {
    if (!confirm("Are you sure you want to delete this tracking information?")) return;

    try {
      const { error } = await supabase
        .from("shipment_tracking")
        .delete()
        .eq("id", trackingId);

      if (error) throw error;
      toast.success("Tracking deleted");
      loadData();
    } catch (error) {
      console.error("Error deleting tracking:", error);
      toast.error("Failed to delete tracking");
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "in_transit":
      case "out_for_delivery":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "exception":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Shipment Tracking
            </CardTitle>
            <CardDescription>
              Manage tracking information for customer orders
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => {
                  const tracking = trackings[order.id];
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-xs">
                        {order.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{order.customer_name}</div>
                        <div className="text-xs text-muted-foreground">{order.customer_email}</div>
                      </TableCell>
                      <TableCell>RON {order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {tracking ? (
                          <div>
                            <div className="font-mono text-sm">{tracking.tracking_number}</div>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(tracking.status)}`}>
                              {tracking.status.replace("_", " ")}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">No tracking</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {tracking?.carrier || "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddTracking(order)}
                          >
                            {tracking ? <Pencil className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          </Button>
                          {tracking && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteTracking(tracking.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {trackings[selectedOrder?.id || ""] ? "Edit" : "Add"} Tracking Information
              </DialogTitle>
              <DialogDescription>
                {selectedOrder && (
                  <span>Order for {selectedOrder.customer_name}</span>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tracking_number">Tracking Number *</Label>
                <Input
                  id="tracking_number"
                  value={formData.tracking_number}
                  onChange={(e) =>
                    setFormData({ ...formData, tracking_number: e.target.value })
                  }
                  placeholder="e.g., 1Z999AA10123456784"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carrier">Carrier *</Label>
                <Select
                  value={formData.carrier}
                  onValueChange={(value) =>
                    setFormData({ ...formData, carrier: value })
                  }
                >
                  <SelectTrigger id="carrier">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {carriers.map((carrier) => (
                      <SelectItem key={carrier} value={carrier}>
                        {carrier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimated_delivery">Estimated Delivery</Label>
                <Input
                  id="estimated_delivery"
                  type="date"
                  value={formData.estimated_delivery}
                  onChange={(e) =>
                    setFormData({ ...formData, estimated_delivery: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Additional information about this shipment..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTracking} disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save Tracking
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
