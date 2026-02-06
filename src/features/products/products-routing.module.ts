import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListContainerComponent } from './presentation/product-list-container/product-list-container.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListContainerComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }