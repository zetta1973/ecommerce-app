import { Component, OnInit } from '@angular/core';
import { OrderFacade } from '../../application/order.service';

@Component({
  selector: 'app-order-list-container',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListContainerComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderFacade: OrderFacade) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  async loadOrders(): Promise<void> {
    try {
      this.orders = await this.orderFacade.getOrders();
    } catch (error) {
      console.error('Error loading orders:', error);
      // Aquí se podría mostrar un mensaje de error al usuario
    }
  }
}

@Component({
  selector: 'app-order-list',
  template: `
    <div class="order-list-container">
      <h2>Lista de Pedidos</h2>
      <ul>
        <li *ngFor="let order of orders">
          Pedido #{{ order.id }} - {{ order.createdAt | date }}
        </li>
      </ul>
    </div>
  `
})
export class OrderListComponent {
  constructor() {}
}