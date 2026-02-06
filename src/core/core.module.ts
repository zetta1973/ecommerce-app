import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Core components
import { NavbarComponent } from './components/navbar/navbar.component';

// Core guards
import { AuthGuard } from './guards/auth.guard';

// Core interceptors
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }