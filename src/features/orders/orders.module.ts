import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Feature components
import { OrderListContainerComponent } from './presentation/order-list-container/order-list-container.component';

// Feature modules
import { OrdersRoutingModule } from './orders-routing.module';

// Application services
import { OrderFacade } from './application/order.service';

@NgModule({
  declarations: [
    OrderListContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrdersRoutingModule
  ],
  providers: [
    OrderFacade
  ],
  exports: [
    OrderListContainerComponent
  ]
})
export class OrdersModule { }