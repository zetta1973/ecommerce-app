import { Component, OnInit } from '@angular/core';
import { ProductFacade } from '../../application/product.service';

@Component({
  selector: 'app-product-list-container',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListContainerComponent implements OnInit {
  products: any[] = [];

  constructor(private productFacade: ProductFacade) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      this.products = await this.productFacade.getProducts();
    } catch (error) {
      console.error('Error loading products:', error);
      // Aquí se podría mostrar un mensaje de error al usuario
    }
  }
}

@Component({
  selector: 'app-product-list',
  template: `
    <div class="product-list-container">
      <h2>Lista de Productos</h2>
      <ul>
        <li *ngFor="let product of products">
          {{ product.name }} - {{ product.price | currency }}
        </li>
      </ul>
    </div>
  `
})
export class ProductListComponent {
  constructor() {}
}