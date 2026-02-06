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

export interface AuthRepository {
  login(credentials: Credentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}

export interface AuthFacade {
  login(credentials: Credentials): Promise<void>;
  logout(): Promise<void>;
  isAuthenticated(): boolean;
  getUser(): User | null;
}

export interface AuthError {
  code: string;
  message: string;
}

export enum AuthStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  IDLE = 'idle'
}

export interface AuthState {
  status: AuthStatus;
  user: User | null;
  error: AuthError | null;
}