import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../application/auth.facade';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(
    private authFacade: AuthFacade,
    private router: Router
  ) {}

  logout(): void {
    this.authFacade.logout().then(() => {
      this.router.navigate(['login']);
    });
  }
}

@Component({
  selector: 'app-logout-container',
  template: `
    <app-logout></app-logout>
  `
})
export class LogoutContainerComponent {
  constructor() {}
}