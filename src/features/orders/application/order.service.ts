import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Order {
  id: number;
  createdAt: string;
  products: { name: string; price: number }[];
  total: number;
  status: OrderStatus;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CreateOrder {
  products: { productId: number; quantity: number }[];
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: CreateOrder): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  updateOrderStatus(id: number, status: OrderStatus): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${id}/status`, { status });
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

export interface OrderFilter {
  dateFrom?: string;
  dateTo?: string;
  status?: OrderStatus;
  productId?: number;
}

export class OrderFacade {
  constructor(private orderService: OrderService) {}

  async getOrders(filter?: OrderFilter): Promise<Order[]> {
    // Aquí se podría implementar lógica de caché, transformación, etc.
    return this.orderService.getOrders().toPromise();
  }

  async getOrder(id: number): Promise<Order> {
    return this.orderService.getOrder(id).toPromise();
  }

  async createOrder(order: CreateOrder): Promise<Order> {
    return this.orderService.createOrder(order).toPromise();
  }

  async updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
    return this.orderService.updateOrderStatus(id, status).toPromise();
  }

  async deleteOrder(id: number): Promise<void> {
    return this.orderService.deleteOrder(id).toPromise();
  }
}

export class OrderCommand {
  static readonly LOAD_ORDERS = '[Order] Load Orders';
  static readonly CREATE_ORDER = '[Order] Create Order';
  static readonly UPDATE_ORDER_STATUS = '[Order] Update Order Status';
  static readonly DELETE_ORDER = '[Order] Delete Order';
  
  constructor(
    public readonly type: string,
    public payload?: any
  ) {}
}

export class OrderQuery {
  static readonly GET_ORDERS = '[Order] Get Orders';
  static readonly GET_ORDER = '[Order] Get Order';
  
  constructor(
    public readonly type: string,
    public payload?: any
  ) {}
}