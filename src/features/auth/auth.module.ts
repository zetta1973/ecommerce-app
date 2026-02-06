import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Feature components
import { LoginContainerComponent } from './presentation/login-container/login-container.component';
import { LogoutContainerComponent } from './presentation/logout-container/logout-container.component';

// Feature modules
import { AuthRoutingModule } from './auth-routing.module';

// Application services
import { AuthFacade } from './application/auth.service';

@NgModule({
  declarations: [
    LoginContainerComponent,
    LogoutContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers: [
    AuthFacade
  ],
  exports: [
    LoginContainerComponent,
    LogoutContainerComponent
  ]
})
export class AuthModule { }