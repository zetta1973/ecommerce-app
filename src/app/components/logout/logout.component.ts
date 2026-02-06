import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `<button (click)="logout()">Cerrar sesión</button>`
})
export class LogoutComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
