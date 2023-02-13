import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { masterAPI } from './apiConfig/apiConfig';
//models
import { Category } from '../model/category.model';
import { Color } from '../model/color.model';
import { Quality } from '../model/quality.model';
import { YarnGroup } from '../model/yarn-group.model';
import { YarnType } from '../model/yarn-type.model';
import { Hsn } from '../model/hsn.model';
import { Gst } from '../model/gst.model';
import { YarnMaster } from '../model/yarn-master.model';
import { CreateYarnDto, UpdateYarnDto } from '../model/yarn-add-req.model';
import { APIResponse } from 'src/app/shared/models/api-response.model';
import { map } from 'rxjs/internal/operators/map';
import { PaginateResponse } from 'src/app/shared/models/response.model';

@Injectable()
export class YarnMasterService {

  baseUrl: string;

  constructor(private HttpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }


  //yarn master
  getAllYarns(page?: number, search?: string): Observable<PaginateResponse<YarnMaster[]>> {
    const params = {
      ...(page && { page }),
      ...(search && { search }),
    }
    return this.HttpClient.get<APIResponse<YarnMaster[]>>(this.baseUrl + masterAPI.YARN_MASTER_GET, { params }).pipe(map((res: APIResponse<YarnMaster[]>) => { return { data: res.data, meta: res.meta } }));
  }

  createYarn(yarn: CreateYarnDto): Observable<CreateYarnDto> {
    return this.HttpClient.post<APIResponse<CreateYarnDto>>(this.baseUrl + masterAPI.YARN_MASTER_CREATE, yarn).pipe(map((res: APIResponse<CreateYarnDto>) => res.data));
  }


  updateYarn(updatedYarn: UpdateYarnDto): Observable<UpdateYarnDto> {
    return this.HttpClient.put<APIResponse<UpdateYarnDto>>(this.baseUrl + masterAPI.YARN_MASTER_UPDATE, updatedYarn).pipe(map((res: APIResponse<UpdateYarnDto>) => res.data));
  }

  removeYarn(yarn_id: number): Observable<YarnMaster> {
    return this.HttpClient.delete<APIResponse<YarnMaster>>(this.baseUrl + masterAPI.YARN_MASTER_REMOVE + `/${yarn_id}`).pipe(map((res: APIResponse<YarnMaster>) => res.data));
  }

  //yarn type
  getAllYarnType(page?: number, search?: string): Observable<PaginateResponse<YarnType[]>> {
    const params = {
      ...(page && { page }),
      ...(search && { search }),
    }
    return this.HttpClient.get<APIResponse<YarnType[]>>(this.baseUrl + masterAPI.YARN_TYPE_GET, { params }).pipe(map((res: APIResponse<YarnType[]>) => { return { data: res.data, meta: res.meta } }));
  }

  createYarnTypes(yarnType: YarnType): Observable<YarnType> {
    return this.HttpClient.post<APIResponse<YarnType>>(this.baseUrl + masterAPI.YARN_TYPE_CREATE, yarnType).pipe(map((res: APIResponse<YarnType>) => res.data));
  }

  //quality
  getAllQuality(): Observable<Quality[]> {
    return this.HttpClient.get<APIResponse<Quality[]>>(this.baseUrl + masterAPI.QUALITY_GET).pipe(map((res: APIResponse<Quality[]>) => res.data));
  }

  createQuality(quality: Quality): Observable<Quality> {
    return this.HttpClient.post<APIResponse<Quality>>(this.baseUrl + masterAPI.QUALITY_CREATE, quality).pipe(map((res: APIResponse<Quality>) => res.data));
  }

  //color
  getAllColor(): Observable<Color[]> {
    return this.HttpClient.get<APIResponse<Color[]>>(this.baseUrl + masterAPI.COLOR_GET).pipe(map((res: APIResponse<Color[]>) => res.data));
  }

  createColor(color: Color): Observable<Color> {
    return this.HttpClient.post<APIResponse<Color>>(this.baseUrl + masterAPI.COLOR_CREATE, color).pipe(map((res: APIResponse<Color>) => res.data));
  }

  //category
  getAllCategory(): Observable<Category[]> {
    return this.HttpClient.get<APIResponse<Category[]>>(this.baseUrl + masterAPI.CATEGORY_GET).pipe(map((res: APIResponse<Category[]>) => res.data));
  }

  createCategory(category: Category): Observable<Category> {
    return this.HttpClient.post<APIResponse<Category>>(this.baseUrl + masterAPI.CATEGORY_CREATE, category).pipe(map((res: APIResponse<Category>) => res.data));
  }

  //yarn group
  getAllYarnGroup(): Observable<YarnGroup[]> {
    return this.HttpClient.get<APIResponse<YarnGroup[]>>(this.baseUrl + masterAPI.YARN_GROUP_GET).pipe(map((res: APIResponse<YarnGroup[]>) => res.data));
  }

  createYarnGroup(yarnGroup: YarnGroup): Observable<YarnGroup> {
    return this.HttpClient.post<APIResponse<YarnGroup>>(this.baseUrl + masterAPI.YARN_GROUP_CREATE, yarnGroup).pipe(map((res: APIResponse<YarnGroup>) => res.data));
  }

  //HSN
  getAllHsnCode(): Observable<Hsn[]> {
    return this.HttpClient.get<APIResponse<Hsn[]>>(this.baseUrl + masterAPI.HSN_GET).pipe(map((res: APIResponse<Hsn[]>) => res.data));
  }

  createHsnCode(hsnCode: Hsn): Observable<Hsn> {
    return this.HttpClient.post<APIResponse<Hsn>>(this.baseUrl + masterAPI.HSN_CREATE, hsnCode).pipe(map((res: APIResponse<Hsn>) => res.data));
  }

  //GST
  getAllGstRate(): Observable<Gst[]> {
    return this.HttpClient.get<APIResponse<Gst[]>>(this.baseUrl + masterAPI.GST_GET).pipe(map((res: APIResponse<Gst[]>) => res.data));
  }

  createGstRate(gstRate: Gst): Observable<Gst> {
    return this.HttpClient.post<APIResponse<Gst>>(this.baseUrl + masterAPI.GST_CREATE, gstRate).pipe(map((res: APIResponse<Gst>) => res.data));
  }

}
