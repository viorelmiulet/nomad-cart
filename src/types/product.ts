export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  stock: number;
  category_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
}