export interface Order {
  id: number;
  createdAt: string;
  products: OrderItem[];
  total: number;
  status: OrderStatus;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderFilter {
  dateFrom?: string;
  dateTo?: string;
  status?: OrderStatus;
  productId?: number;
}

export interface OrderRepository {
  getAll(filter?: OrderFilter): Promise<Order[]>;
  getById(id: number): Promise<Order>;
  create(order: CreateOrder): Promise<Order>;
  updateStatus(id: number, status: OrderStatus): Promise<Order>;
  delete(id: number): Promise<void>;
}

export interface OrderFacade {
  getOrders(filter?: OrderFilter): Promise<Order[]>;
  getOrder(id: number): Promise<Order>;
  createOrder(order: CreateOrder): Promise<Order>;
  updateOrderStatus(id: number, status: OrderStatus): Promise<Order>;
  deleteOrder(id: number): Promise<void>;
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

export interface OrderError {
  code: string;
  message: string;
}

export enum OrderStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  IDLE = 'idle'
}

export interface OrderState {
  status: OrderStatus;
  orders: Order[];
  error: OrderError | null;
}