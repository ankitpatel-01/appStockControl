import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../models/login-credentails.model';
import { Tokens } from '../models/token.model';
import { AuthAPIs } from './auth.apis';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;

  /**
  * @name keysToRemove
  * @description keys to remove from local storage
  */
  private keysToRemove: Array<string> = ["access_token", "refresh_token"];

  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getAccessToken() ? true : false);
  public loggedIn$: Observable<boolean> = this._loggedIn.asObservable();
  private _jwtHelper = new JwtHelperService();
  constructor(private _http: HttpClient) { }

  setLoggedInStatus(loggedIn: boolean) {
    this._loggedIn.next(loggedIn);
  }

  public get isLoggedIn(): boolean {
    return this._loggedIn.value;
  }

  /**
   * @name setAccessToken
   * @description sets access token to sessionStorage
   * @return void
   */
  public setAccessToken(access_token: string): void {
    sessionStorage.setItem("access_token", access_token);
  }

  /**
   * @name setRefreshToken
   * @description sets refresh token to sessionStorage
   * @return void
   */
  public setRefreshToken(refresh_token: string): void {
    sessionStorage.setItem("refresh_token", refresh_token);
  }

  /**
    * @name getAccessToken
    * @description gets access token from sessionStorage
    * @return access_token
    */
  public getAccessToken(): string {
    return sessionStorage.getItem("access_token") ?? '';
  }

  /**
  * @name getRefreshToken
  * @description gets refresh token from sessionStorage
  * @return refresh_token
  */
  public getRefreshToken(): string {
    return sessionStorage.getItem("refresh_token") ?? '';
  }

  /**
   * @name login
   * @description post login details 
   * @return Observable<Tokens>
   */
  public login(credentials: LoginCredentials): Observable<Tokens> {
    return this._http.post<Tokens>(this.baseUrl + AuthAPIs.LOG_IN, credentials);
  }

  /**
   * @name refresh_tokens
   * @description post refresh tokens
   * @return Observable<Tokens>
   */
  public refresh_tokens(): Observable<Tokens> {
    return this._http.post<Tokens>(this.baseUrl + AuthAPIs.REFRESH_TOKENS, null);
  }

  /**
  * @name logout
  * @description post logout 
  * @return Observable<null>
  */
  public logout(): Observable<null> {
    return this._http.post<null>(this.baseUrl + AuthAPIs.LOG_OUT, null);
  }

  /**
   * @name clearLocalStorage
   * @description remove token and other data from localStorage
   * @return void
   */
  public clearSessionStorage(): void {
    this.keysToRemove.forEach(key =>
      sessionStorage.removeItem(key)
    )
  }

  /**
   * @name isTokenExpired
   * @description Method to check if the token is expired
   * @return void
   */
  isTokenExpired(token: string): boolean {
    // Check if the token is valid
    if (!token || token.trim() === '') {
      return true;
    }
    // Check if the token is expired
    const tokenExpired = this._jwtHelper.isTokenExpired(token);
    return tokenExpired;
  }

  /**
   * @name getTokenExpirationDate
   * @description Method to get token Expiration Date
   * @return Expiration Date
   */
  getTokenExpirationDate(token: string): Date | null {
    return this._jwtHelper.getTokenExpirationDate(token)
  }

}
