// product.d.ts
export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    availabilityStatus: string;
    price: number;
    rating: number;
    thumbnail: string;
  }
  
  export interface ProductAPIResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  