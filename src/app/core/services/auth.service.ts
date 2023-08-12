import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../models/login-credentails.model';
import { Tokens } from '../models/token.model';
import { AuthAPIs } from './auth.apis';
import { APIResponse } from 'src/app/shared/models/api-response.model';
import { map } from 'rxjs/internal/operators/map';
import { CompanyBranchList } from '../models/company-branch.model';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;

  /**
  * @name keysToRemove
  * @description keys to remove from local storage
  */
  private keysToRemove: Array<string> = ["access_token", "refresh_token", "cmpbrhId"];

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
  * @name setLoggedInBranchId
  * @description sets logged in company branch Id to sessionStorage
  * @return void
  */
  public setLoggedInBranchId(cmpbranchId: number): void {
    sessionStorage.setItem("cmpbrhId", cmpbranchId.toString());
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
    * @name getLoggedInBranchId
    * @description gets logged in company branch Id from sessionStorage
    * @return access_token
    */
  public getLoggedInBranchId(): number {
    let cmpbrhId = sessionStorage.getItem("cmpbrhId") ?? '';
    if (cmpbrhId)
      return parseInt(cmpbrhId);
    return 0;
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
  * @name getCompanyBranchList
  * @description get company branches 
  * @param token:access token
  * @return Observable<CompanyBranchList[]>
  */
  public getCompanyBranchList(token: string): Observable<CompanyBranchList[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this._http.get<APIResponse<CompanyBranchList[]>>(this.baseUrl + AuthAPIs.COMPANY_BRANCH_LIST, httpOptions).pipe(map((res: APIResponse<CompanyBranchList[]>) => { return res.data }));
  }

  /**
 * @name getUserProfile
 * @description get user profile data 
 * @param token:access token
 * @return Observable<UserProfile>
 */
  public getUserProfile(token: string): Observable<UserProfile> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this._http.get<APIResponse<UserProfile>>(this.baseUrl + AuthAPIs.USER_PROFILE, httpOptions).pipe(map((res: APIResponse<UserProfile>) => { return res.data }));
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
    return this._jwtHelper.getTokenExpirationDate(token);
  }

  /**
   * @name getTokenData
   * @description get payload Data from token
   * @return token payload
   */
  getTokenData(token: string) {
    return this._jwtHelper.decodeToken(token);
  }

  /**
  * Sets the list of company branches to the session storage.
  * @param {CompanyBranchList[]} companyBranchList - An array of company branches to be stored.
  */
  setBranchListToStorage(companyBranchList: CompanyBranchList[]) {
    const encodedString = btoa(JSON.stringify(companyBranchList));
    sessionStorage.setItem('brldb', encodedString);
  }

  /**
  * Retrieves the list of company branches from the session storage.
  * @returns {CompanyBranchList[]} - An array of company branches retrieved from the session storage.
  */
  getBranchListfromStorage(): CompanyBranchList[] {
    const brldb = sessionStorage.getItem('brldb') ?? ''
    return JSON.parse(atob(brldb));
  }

  /**
  * Sets the user profile to the session storage.
  */
  setUserProfileToStorage(profile: UserProfile) {
    const encodedString = btoa(JSON.stringify(profile));
    sessionStorage.setItem('usprdb', encodedString);
  }

  /**
  * Retrieves the user profile from the session storage.
  */
  getUserProfilefromStorage(): UserProfile {
    const brldb = sessionStorage.getItem('usprdb') ?? ''
    return JSON.parse(atob(brldb));
  }

}
