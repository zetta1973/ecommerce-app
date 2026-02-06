import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerComponent } from './presentation/login-container/login-container.component';
import { LogoutContainerComponent } from './presentation/logout-container/logout-container.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginContainerComponent
  },
  {
    path: 'logout',
    component: LogoutContainerComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }