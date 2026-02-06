import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { SwaggerComponent } from './components/swagger/swagger.component';

// Core modules
import { CoreModule } from './core/core.module';

// Feature modules
import { AuthModule } from './features/auth/auth.module';
import { ProductsModule } from './features/products/products.module';
import { OrdersModule } from './features/orders/orders.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProductListComponent,
    OrderListComponent,
    LogoutComponent,
    MonitorComponent,
    SwaggerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
    // Core module
    CoreModule,
    
    // Feature modules
    AuthModule,
    ProductsModule,
    OrdersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }