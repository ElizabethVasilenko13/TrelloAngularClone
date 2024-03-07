import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, take } from 'rxjs';
import { LoginRequestInterface, RegisterRequestInterface } from '../models/auth.requests.interface';
import { environment } from '@environment/environment';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private handler = inject(HttpBackend);

  constructor() {
    this.http = new HttpClient(this.handler);
  }

  private readonly AUTH_API_URL = `${environment.apiUrl}users/`;
  private readonly REGISTER_ENDPOINT = `register`;
  private readonly LOGIN_ENDPOINT = `login`;

  public currentUser$ = new BehaviorSubject<User | null | undefined>(undefined);
  public isLoggedIn$ = this.currentUser$.pipe(
    filter((user) => user !== undefined),
    map(Boolean)
  );
  public backendErrors$ = new BehaviorSubject<string[] | null>(null);

  register(data: RegisterRequestInterface): Observable<User> {
    const url = `${this.AUTH_API_URL}${this.REGISTER_ENDPOINT}`;
    return this.http.post<User>(url, data);
  }

  login(data: LoginRequestInterface): Observable<User> {
    const url = `${this.AUTH_API_URL}${this.LOGIN_ENDPOINT}`;
    return this.http.post<User>(url, data);
  }

  getCurrentUser(): Observable<User> {
    const url = environment.apiUrl + 'user';
    return this.http.get<User>(url);
  }

  onRegisterFormSubmit(currentUser: RegisterRequestInterface): void {
    this.register(currentUser)
      .pipe(take(1))
      .subscribe({
        next: (currentUser: User) => {
          this.setToken(currentUser);
          this.setCurrentUser(currentUser);
          this.backendErrors$.next(null);
          this.router.navigateByUrl('/');
        },
        error: (err: HttpErrorResponse) => {
          this.backendErrors$.next(err.error);
        }
      });
  }

  onLoginFormSubmit(currentUser: LoginRequestInterface): void {
    this.login(currentUser)
      .pipe(take(1))
      .subscribe({
        next: (currentUser: User) => {
          this.setToken(currentUser);
          this.setCurrentUser(currentUser);
          this.backendErrors$.next(null);
          this.router.navigateByUrl('/');
        },
        error: (err: HttpErrorResponse) => {
          const errorValues: string[] = Object.values(err.error);
          this.backendErrors$.next(errorValues);
        }
      });
  }

  setCurrentUser(currentUser: User | null): void {
    this.currentUser$.next(currentUser);
  }

  setToken(currentUser: User): void {
    const [, exstractedToken] = currentUser.token.split(' ');
    localStorage.setItem('token', exstractedToken);
  }
}
