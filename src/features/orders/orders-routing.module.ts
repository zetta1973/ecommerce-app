import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListContainerComponent } from './presentation/order-list-container/order-list-container.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'orders',
    component: OrderListContainerComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }