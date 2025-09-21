import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const useWishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const addItem = (product: WishlistItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Deja în wishlist",
          description: `${product.name} este deja în lista de dorințe.`,
        });
        return currentItems;
      } else {
        toast({
          title: "Adăugat în wishlist",
          description: `${product.name} a fost adăugat în lista de dorințe.`,
        });
        return [...currentItems, product];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(currentItems => {
      const item = currentItems.find(item => item.id === id);
      if (item) {
        toast({
          title: "Eliminat din wishlist",
          description: `${item.name} a fost eliminat din lista de dorințe.`,
        });
      }
      return currentItems.filter(item => item.id !== id);
    });
  };

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };

  const toggleItem = (product: WishlistItem) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return {
    items,
    addItem,
    removeItem,
    isInWishlist,
    toggleItem
  };
};