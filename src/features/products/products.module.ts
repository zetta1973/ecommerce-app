import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Feature components
import { ProductListContainerComponent } from './presentation/product-list-container/product-list-container.component';

// Feature modules
import { ProductsRoutingModule } from './products-routing.module';

// Application services
import { ProductFacade } from './application/product.service';

@NgModule({
  declarations: [
    ProductListContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule
  ],
  providers: [
    ProductFacade
  ],
  exports: [
    ProductListContainerComponent
  ]
})
export class ProductsModule { }