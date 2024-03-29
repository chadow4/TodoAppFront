import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {User, UserCreate, UserJwtSession, UserJwtToken, UserLogin} from "../Models/user-model";
import {AlertService} from "./alert.service";
import {API_URL} from "./config";


const AUTH_API = API_URL +'/auth/';
const USER_TOKEN_KEY = 'user_token_key';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user!: User;
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!this.getCurrentSession());

  authStateChanged = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) {
  }

  login(userLogin: UserLogin): Observable<UserJwtToken> {

    return this.http.post<UserJwtToken>(AUTH_API + 'login', userLogin).pipe(
      tap((response: UserJwtToken) => {
        // mettre à jour le BehaviorSubject si la connexion réussit
        this.isLoggedInSubject.next(true);
      })
    );
  }

  register(userCreateDto: UserCreate): Observable<any> {
    console.log(userCreateDto);
    return this.http.post<UserCreate>(AUTH_API + 'register', userCreateDto);
  }

  logout(): void {
    localStorage.removeItem(USER_TOKEN_KEY);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['home']).then(() => this.alertService.success('Vous venez de vous déconnecter'))
  }

  getCurrentSession(): UserJwtSession {
    const userJwtToken = localStorage.getItem(USER_TOKEN_KEY);
    return userJwtToken ? JSON.parse(atob(userJwtToken.split('.')[1])) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentSession() !== null;
  }

  getCurrentToken(): UserJwtToken | null {
    const userJwtToken = window.localStorage.getItem(USER_TOKEN_KEY);
    return userJwtToken ? JSON.parse(userJwtToken) : null;
  }

  setCurrentToken(token: UserJwtToken): void {
    const userJwtTokenString = JSON.stringify(token);
    window.localStorage.setItem(USER_TOKEN_KEY, userJwtTokenString);
    this.router.navigate(['/dashboard']).then(
      () => this.alertService.success("Vous êtes maintenant connecté"));
  }

}
