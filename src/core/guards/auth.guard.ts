import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthFacade } from '../auth/application/auth.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authFacade: AuthFacade,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    if (this.authFacade.isAuthenticated()) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}