import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyType } from '../models/company-type.model';
import { APIResponse } from '../models/api-response.model';
import { Observable } from 'rxjs/internal/Observable';
import { COMMAN_API } from './api.constant';
import { map } from 'rxjs/internal/operators/map';
import { StateMaster } from '../models/state-master.model';

@Injectable()
export class CommanApiService {


  baseUrl: string;

  constructor(private HttpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getCompanyTypeMaster(): Observable<CompanyType[]> {
    return this.HttpClient.get<APIResponse<CompanyType[]>>(this.baseUrl + COMMAN_API.COMPANY_TYPE_MASTER_GET).pipe(map((res: APIResponse<CompanyType[]>) => { return res.data }));
  }

  getStateMaster(): Observable<StateMaster[]> {
    return this.HttpClient.get<APIResponse<StateMaster[]>>(this.baseUrl + COMMAN_API.STATE_MASTER_GET).pipe(map((res: APIResponse<StateMaster[]>) => { return res.data }));
  }
}
