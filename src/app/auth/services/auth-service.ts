import { Injectable, signal, inject, computed, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../interfaces/auth-response';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

const baseUrl = environment.baseUrl;


type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  checkStatusResource = rxResource({
    stream: () => this.checkStatus(),
  })


  private http = inject(HttpClient);

  // Getters
  authStatus = computed(() => {
    if (this._authStatus() === 'checking') return 'checking'
    if (this._authStatus() === 'authenticated') return 'authenticated'
    return 'not-authenticated'
  });

  // user = computed(() => (this._user()));
  // token = computed(() => (this._token()));

  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {
      email: email,
      password: password
    }, {}).pipe(
      map((resp) => this.handleLoginSuccess(resp)),
      catchError((err: any) => this.handleAuthError(err))
    )
  }

  register(fullName: string, email: string, password: string) {

    return this.http.post<AuthResponse>(`${baseUrl}/auth/register`, {
      email, fullName, password
    })
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false)
    };
    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // },
    }).pipe(
      map((resp) => this.handleLoginSuccess(resp)),
      catchError((err: any) => this.handleAuthError(err))
    )

  }


  logout() {
    this._authStatus.set('not-authenticated');
    this._user.set(null);
    this._token.set(null);


    localStorage.removeItem('token');
  }

  private handleLoginSuccess(response: AuthResponse) {
    this._authStatus.set('authenticated');
    this._user.set(response.user);
    this._token.set(response.token);
    localStorage.setItem('token', response.token);
    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }
}
