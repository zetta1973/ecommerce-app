import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

export interface ProductFilter {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export class ProductFacade {
  constructor(private productService: ProductService) {}

  async getProducts(filter?: ProductFilter): Promise<Product[]> {
    // Aquí se podría implementar lógica de caché, transformación, etc.
    return this.productService.getProducts().toPromise();
  }

  async getProduct(id: number): Promise<Product> {
    return this.productService.getProduct(id).toPromise();
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    return this.productService.createProduct(product).toPromise();
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    return this.productService.updateProduct(id, product).toPromise();
  }

  async deleteProduct(id: number): Promise<void> {
    return this.productService.deleteProduct(id).toPromise();
  }
}

export class ProductCommand {
  static readonly LOAD_PRODUCTS = '[Product] Load Products';
  static readonly CREATE_PRODUCT = '[Product] Create Product';
  static readonly UPDATE_PRODUCT = '[Product] Update Product';
  static readonly DELETE_PRODUCT = '[Product] Delete Product';
  
  constructor(
    public readonly type: string,
    public payload?: any
  ) {}
}

export class ProductQuery {
  static readonly GET_PRODUCTS = '[Product] Get Products';
  static readonly GET_PRODUCT = '[Product] Get Product';
  
  constructor(
    public readonly type: string,
    public payload?: any
  ) {}
}