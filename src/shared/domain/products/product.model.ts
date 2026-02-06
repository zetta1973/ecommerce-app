export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface ProductFilter {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface ProductRepository {
  getAll(filter?: ProductFilter): Promise<Product[]>;
  getById(id: number): Promise<Product>;
  create(product: Omit<Product, 'id'>): Promise<Product>;
  update(id: number, product: Partial<Product>): Promise<Product>;
  delete(id: number): Promise<void>;
}

export interface ProductFacade {
  getProducts(filter?: ProductFilter): Promise<Product[]>;
  getProduct(id: number): Promise<Product>;
  createProduct(product: Omit<Product, 'id'>): Promise<Product>;
  updateProduct(id: number, product: Partial<Product>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
}

export interface ProductError {
  code: string;
  message: string;
}

export enum ProductStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  IDLE = 'idle'
}

export interface ProductState {
  status: ProductStatus;
  products: Product[];
  error: ProductError | null;
}