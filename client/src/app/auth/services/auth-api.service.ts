import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, take } from 'rxjs';
import { LoginRequestInterface, RegisterRequestInterface } from '../models/auth.requests.interface';
import { environment } from '@environment/environment';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';

interface AuthApiMethods {
  register: (data: RegisterRequestInterface) => Observable<User>;
  login: (data: LoginRequestInterface) => Observable<User>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly AUTH_API_URL = `${environment.apiUrl}users/`;
  private readonly REGISTER_ENDPOINT = `register`;
  private readonly LOGIN_ENDPOINT = `login`;

  protected currentUser$ = new BehaviorSubject<User | null | undefined>(undefined);
  public isLoggedIn$ = this.currentUser$.pipe(
    filter((user) => user !== undefined),
    map(Boolean)
  );
  public backendErrors$ = new BehaviorSubject<string[] | null>(null);

  methods: AuthApiMethods = {
    register: (data: RegisterRequestInterface) => this.register(data),
    login: (data: LoginRequestInterface) => this.login(data)
  };

  register(data: RegisterRequestInterface): Observable<User> {
    const url = `${this.AUTH_API_URL}${this.REGISTER_ENDPOINT}`;
    return this.http.post<User>(url, data);
  }

  login(data: LoginRequestInterface): Observable<User> {
    const url = `${this.AUTH_API_URL}${this.LOGIN_ENDPOINT}`;
    return this.http.post<User>(url, data);
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
    localStorage.setItem('token', currentUser.token);
  }
}
