import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  email: string;
  token: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => ({
        ...response,
        user: {
          ...response.user,
          token: response.token
        }
      }))
    );
  }

  logout(): Observable<void> {
    // Aquí se podría implementar lógica de logout en el backend
    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }

  getCurrentUser(): Observable<User | null> {
    const token = localStorage.getItem('jwt');
    if (!token) return new Observable<User | null>(observer => {
      observer.next(null);
      observer.complete();
    });

    // Aquí se podría implementar lógica para obtener el usuario actual
    const user: User = {
      id: 1,
      email: 'user@example.com',
      token: token
    };
    return new Observable<User>(observer => {
      observer.next(user);
      observer.complete();
    });
  }
}

export class AuthFacade {
  constructor(private authService: AuthService) {}

  async login(credentials: Credentials): Promise<void> {
    try {
      const response = await this.authService.login(credentials).toPromise();
      localStorage.setItem('jwt', response.token);
    } catch (error) {
      throw new Error('Credenciales inválidas');
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout().toPromise();
    localStorage.removeItem('jwt');
  }

  async getCurrentUser(): Promise<User | null> {
    return this.authService.getCurrentUser().toPromise();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }
}

export class AuthCommand {
  static readonly LOGIN = '[Auth] Login';
  static readonly LOGOUT = '[Auth] Logout';
  
  constructor(
    public readonly type: string,
    public payload?: any
  ) {}
}

export class AuthQuery {
  static readonly IS_AUTHENTICATED = '[Auth] Is Authenticated';
  static readonly GET_USER = '[Auth] Get User';
  
  constructor(
    public readonly type: string,
    public payload?: any
  ) {}
}