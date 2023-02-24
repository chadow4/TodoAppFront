import {Injectable} from '@angular/core';
import {UserAuth} from "../Models/user.auth.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUserSession(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserSession(): UserAuth {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  public signIn(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  public signOut(): void {
    window.localStorage.clear();
    window.location.reload();
  }

  public signUp(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

}
