import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SupportChat } from "@/components/SupportChat";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ContactPage from "./pages/ContactPage";
import MobilierPage from "./pages/MobilierPage";
import CameraDeZiPage from "./pages/CameraDeZiPage";
import DormitorPage from "./pages/DormitorPage";
import BucatariePage from "./pages/BucatariePage";
import HolPage from "./pages/HolPage";
import InspiratiiPage from "./pages/InspiratiiPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import CheckoutCancelPage from "./pages/CheckoutCancelPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mobilier" element={<MobilierPage />} />
          <Route path="/camera-de-zi" element={<CameraDeZiPage />} />
          <Route path="/dormitor" element={<DormitorPage />} />
          <Route path="/bucatarie" element={<BucatariePage />} />
          <Route path="/hol" element={<HolPage />} />
          <Route path="/inspiratii" element={<InspiratiiPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SupportChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
