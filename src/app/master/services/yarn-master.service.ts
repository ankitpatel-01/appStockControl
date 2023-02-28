import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { masterAPI } from './apiConfig/apiConfig';
//models
import { CreateYarnGroupDto, UpdateYarnGroupDto, YarnGroup } from '../model/yarn-group.model';
import { YarnType } from '../model/yarn-type.model';
import { CreateHsnDto, Hsn, UpdateHsnDto } from '../model/hsn.model';
import { CreateGstDto, Gst, UpdateGstDto } from '../model/gst.model';
import { YarnMaster } from '../model/yarn-master.model';
import { CreateYarnDto, UpdateYarnDto } from '../model/yarn-add-req.model';
import { APIResponse } from 'src/app/shared/models/api-response.model';
import { map } from 'rxjs/internal/operators/map';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { PAGE_PER_LIMIT } from 'src/app/shared/constants/constants';
import { CreateQualityDto, Quality, UpdateQualityDto } from '../model/quality.model';
import { Color, CreateColorDto, UpdateColorDto } from '../model/color.model';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../model/category.model';

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
      limit: PAGE_PER_LIMIT,
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
  getAllYarnTypes(): Observable<YarnType[]> {
    return this.HttpClient.get<APIResponse<YarnType[]>>(this.baseUrl + masterAPI.YARN_TYPE_GET).pipe(map((res: APIResponse<YarnType[]>) => res.data));
  }

  getAllYarnTypesPaginate(page: number = 1, search: string = ""): Observable<PaginateResponse<YarnType[]>> {
    const params = {
      ...(page && { page }),
      ...(search && { search }),
      limit: PAGE_PER_LIMIT,
    }
    return this.HttpClient.get<APIResponse<YarnType[]>>(this.baseUrl + masterAPI.YARN_TYPE_GET, { params }).pipe(map((res: APIResponse<YarnType[]>) => { return { data: res.data, meta: res.meta } }));
  }

  createYarnTypes(yarnType: YarnType): Observable<YarnType> {
    return this.HttpClient.post<APIResponse<YarnType>>(this.baseUrl + masterAPI.YARN_TYPE_CREATE, yarnType).pipe(map((res: APIResponse<YarnType>) => res.data));
  }

  updateYarnTypes(yarnType: YarnType): Observable<YarnType> {
    return this.HttpClient.put<APIResponse<YarnType>>(this.baseUrl + masterAPI.YARN_TYPE_UPDATE, yarnType).pipe(map((res: APIResponse<YarnType>) => res.data));
  }

  removeYarnType(yarn_type_id: number): Observable<YarnType> {
    return this.HttpClient.delete<APIResponse<YarnType>>(this.baseUrl + masterAPI.YARN_TYPE_REMOVE + `/${yarn_type_id}`).pipe(map((res: APIResponse<YarnType>) => res.data));
  }

  //quality
  getAllQuality(): Observable<Quality[]> {
    return this.HttpClient.get<APIResponse<Quality[]>>(this.baseUrl + masterAPI.QUALITY_GET).pipe(map((res: APIResponse<Quality[]>) => res.data));
  }

  getAllQualityPaginate(page: number = 1, search: string = ""): Observable<PaginateResponse<Quality[]>> {
    const params = {
      ...(page && { page }),
      ...(search && { search }),
      limit: PAGE_PER_LIMIT,
    }
    return this.HttpClient.get<APIResponse<Quality[]>>(this.baseUrl + masterAPI.QUALITY_GET, {
      params
    }).pipe(map((res: APIResponse<Quality[]>) => { return { data: res.data, meta: res.meta } }));
  }

  createQuality(quality: CreateQualityDto): Observable<Quality> {
    return this.HttpClient.post<APIResponse<Quality>>(this.baseUrl + masterAPI.QUALITY_CREATE, quality).pipe(map((res: APIResponse<Quality>) => res.data));
  }

  updateQuality(quality: UpdateQualityDto): Observable<Quality> {
    return this.HttpClient.put<APIResponse<Quality>>(this.baseUrl + masterAPI.QUALITY_UPDATE, quality).pipe(map((res: APIResponse<Quality>) => res.data));
  }

  removeQuality(quality_id: number): Observable<Quality> {
    return this.HttpClient.delete<APIResponse<Quality>>(this.baseUrl + masterAPI.QUALITY_REMOVE + `/${quality_id}`).pipe(map((res: APIResponse<Quality>) => res.data));
  }

  //color
  getAllColor(): Observable<Color[]> {
    return this.HttpClient.get<APIResponse<Color[]>>(this.baseUrl + masterAPI.COLOR_GET).pipe(map((res: APIResponse<Color[]>) => res.data));
  }

  getAllColorPaginate(page: number = 1, search: string = ""): Observable<PaginateResponse<Color[]>> {
    const params = {
      ...(page && { page }),
      ...(search && { search }),
      limit: PAGE_PER_LIMIT,
    }
    return this.HttpClient.get<APIResponse<Color[]>>(this.baseUrl + masterAPI.COLOR_GET, {
      params
    }).pipe(map((res: APIResponse<Color[]>) => { return { data: res.data, meta: res.meta } }));
  }

  createColor(color: CreateColorDto): Observable<Color> {
    return this.HttpClient.post<APIResponse<Color>>(this.baseUrl + masterAPI.COLOR_CREATE, color).pipe(map((res: APIResponse<Color>) => res.data));
  }

  updateColor(color: UpdateColorDto): Observable<Color> {
    return this.HttpClient.put<APIResponse<Color>>(this.baseUrl + masterAPI.COLOR_UPDATE, color).pipe(map((res: APIResponse<Color>) => res.data));
  }

  removeColor(clr_id: number): Observable<Color> {
    return this.HttpClient.delete<APIResponse<Color>>(this.baseUrl + masterAPI.COLOR_REMOVE + `/${clr_id}`).pipe(map((res: APIResponse<Color>) => res.data));
  }

  //category
  getAllCategory(): Observable<Category[]> {
    return this.HttpClient.get<APIResponse<Category[]>>(this.baseUrl + masterAPI.CATEGORY_GET).pipe(map((res: APIResponse<Category[]>) => res.data));
  }

  getAllCategoryPaginate(page: number = 1, search: string = ""): Observable<PaginateResponse<Category[]>> {
    const params = {
      ...(page && { page }),
      ...(search && { search }),
      limit: PAGE_PER_LIMIT,
    }
    return this.HttpClient.get<APIResponse<Category[]>>(this.baseUrl + masterAPI.CATEGORY_GET, {
      params
    }).pipe(map((res: APIResponse<Category[]>) => { return { data: res.data, meta: res.meta } }));
  }

  createCategory(category: CreateCategoryDto): Observable<Category> {
    return this.HttpClient.post<APIResponse<Category>>(this.baseUrl + masterAPI.CATEGORY_CREATE, category).pipe(map((res: APIResponse<Category>) => res.data));
  }

  updateCategory(category: UpdateCategoryDto): Observable<Category> {
    return this.HttpClient.put<APIResponse<Category>>(this.baseUrl + masterAPI.CATEGORY_UPDATE, category).pipe(map((res: APIResponse<Category>) => res.data));
  }

  removeCategory(ctry_id: number): Observable<Category> {
    return this.HttpClient.delete<APIResponse<Category>>(this.baseUrl + masterAPI.CATEGORY_REMOVE + `/${ctry_id}`).pipe(map((res: APIResponse<Category>) => res.data));
  }

  //yarn group
  getAllYarnGroup(): Observable<YarnGroup[]> {
    return this.HttpClient.get<APIResponse<YarnGroup[]>>(this.baseUrl + masterAPI.YARN_GROUP_GET).pipe(map((res: APIResponse<YarnGroup[]>) => res.data));
  }

  getAllYarnGroupPaginate(page: number = 1, search: string = ""): Observable<PaginateResponse<YarnGroup[]>> {
    const params = {
      ...(page && { page }),
      ...(search && { search }),
      limit: PAGE_PER_LIMIT,
    }
    return this.HttpClient.get<APIResponse<YarnGroup[]>>(this.baseUrl + masterAPI.YARN_GROUP_GET, {
      params
    }).pipe(map((res: APIResponse<YarnGroup[]>) => { return { data: res.data, meta: res.meta } }));
  }

  createYarnGroup(yarnGroup: CreateYarnGroupDto): Observable<YarnGroup> {
    return this.HttpClient.post<APIResponse<YarnGroup>>(this.baseUrl + masterAPI.YARN_GROUP_CREATE, yarnGroup).pipe(map((res: APIResponse<YarnGroup>) => res.data));
  }

  updateYarnGroup(yarnGroup: UpdateYarnGroupDto): Observable<YarnGroup> {
    return this.HttpClient.put<APIResponse<YarnGroup>>(this.baseUrl + masterAPI.YARN_GROUP_UPDATE, yarnGroup).pipe(map((res: APIResponse<YarnGroup>) => res.data));
  }

  removeYarnGroup(yarn_groud_id: number): Observable<YarnGroup> {
    return this.HttpClient.delete<APIResponse<YarnGroup>>(this.baseUrl + masterAPI.YARN_GROUP_REMOVE + `/${yarn_groud_id}`).pipe(map((res: APIResponse<YarnGroup>) => res.data));
  }

  //HSN
  getAllHsnCode(): Observable<Hsn[]> {
    return this.HttpClient.get<APIResponse<Hsn[]>>(this.baseUrl + masterAPI.HSN_GET).pipe(map((res: APIResponse<Hsn[]>) => res.data));
  }

  getAllHsnCodePaginate(page?: number, search?: string, gst?: boolean): Observable<PaginateResponse<Hsn[]>> {
    const params = {
      ...(page && { page }),
      ...(search && { search }),
      ...(gst && { gst }),
      limit: PAGE_PER_LIMIT,
    }
    return this.HttpClient.get<APIResponse<Hsn[]>>(this.baseUrl + masterAPI.HSN_GET, {
      params
    }).pipe(map((res: APIResponse<Hsn[]>) => { return { data: res.data, meta: res.meta } }));
  }


  createHsnCode(hsnCode: CreateHsnDto): Observable<Hsn> {
    return this.HttpClient.post<APIResponse<Hsn>>(this.baseUrl + masterAPI.HSN_CREATE, hsnCode).pipe(map((res: APIResponse<Hsn>) => res.data));
  }

  updateHsnCode(hsnCode: UpdateHsnDto): Observable<Hsn> {
    return this.HttpClient.put<APIResponse<Hsn>>(this.baseUrl + masterAPI.HSN_UPDATE, hsnCode).pipe(map((res: APIResponse<Hsn>) => res.data));
  }

  removeHsnCode(hsn_id: number): Observable<Hsn> {
    return this.HttpClient.delete<APIResponse<Hsn>>(this.baseUrl + masterAPI.HSN_REMOVE + `/${hsn_id}`).pipe(map((res: APIResponse<Hsn>) => res.data));
  }

  //GST
  getAllGstRate(): Observable<Gst[]> {
    return this.HttpClient.get<APIResponse<Gst[]>>(this.baseUrl + masterAPI.GST_GET).pipe(map((res: APIResponse<Gst[]>) => res.data));
  }

  getAllGstRatePaginate(page?: number, search?: string): Observable<PaginateResponse<Gst[]>> {
    const params = {
      ...(page && { page }),
      ...(search && { search }),
      limit: PAGE_PER_LIMIT,
    }
    return this.HttpClient.get<APIResponse<Gst[]>>(this.baseUrl + masterAPI.GST_GET, {
      params
    }).pipe(map((res: APIResponse<Gst[]>) => { return { data: res.data, meta: res.meta } }));
  }

  createGstRate(gstRate: CreateGstDto): Observable<Gst> {
    return this.HttpClient.post<APIResponse<Gst>>(this.baseUrl + masterAPI.GST_CREATE, gstRate).pipe(map((res: APIResponse<Gst>) => res.data));
  }

  updateGstRate(gstRate: UpdateGstDto): Observable<Gst> {
    return this.HttpClient.put<APIResponse<Gst>>(this.baseUrl + masterAPI.GST_UPDATE, gstRate).pipe(map((res: APIResponse<Gst>) => res.data));
  }

  removeGstRate(gst_id: number): Observable<Gst> {
    return this.HttpClient.delete<APIResponse<Gst>>(this.baseUrl + masterAPI.GST_REMOVE + `/${gst_id}`).pipe(map((res: APIResponse<Gst>) => res.data));
  }

}
