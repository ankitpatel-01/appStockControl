import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SIGN_UP_API } from './api.constant';
import { APIResponse } from 'src/app/shared/models/api-response.model';
import { map } from 'rxjs/internal/operators/map';
import { CompanyType } from '../../shared/models/company-type.model';
import { SignUpDTO } from '../models/new-signup.model';

@Injectable()
export class SignUpService {

    private readonly baseUrl: string = environment.baseUrl;

    constructor(private _http: HttpClient) { }

    newSignUp(signUpDTO: SignUpDTO): Observable<number> {
        return this._http.post<APIResponse<number>>(this.baseUrl + SIGN_UP_API.SIGN_UP_NEW_COMPANY, signUpDTO).pipe(map((res: APIResponse<number>) => { return res.data }));
    }
}
