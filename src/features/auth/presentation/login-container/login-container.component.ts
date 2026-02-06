import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '../../application/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  login(): void {
    if (this.form.valid) {
      this.authFacade.login(this.form.value).then(() => {
        this.router.navigate(['/products']);
      }).catch(error => {
        console.error('Login failed:', error);
      });
    }
  }
}

@Component({
  selector: 'app-login-container',
  template: `
    <app-login></app-login>
  `
})
export class LoginContainerComponent {
  constructor() {}
}