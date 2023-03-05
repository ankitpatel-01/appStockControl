import { Component, OnDestroy, OnInit } from '@angular/core';
// ------------------------------------------------------------------------------------
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
// ------------------------------------------------------------------------------------
import { UtitityService } from 'src/app/shared/services/utitity.service';
import { YarnMasterService } from '../../services/yarn-master.service';
// ------------------------------------------------------------------------------------
import { Gst } from '../../model/gst.model';
import { CreateHsnDto, Hsn, UpdateHsnDto } from '../../model/hsn.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';

@Component({
  selector: 'app-hsn-master-container',
  templateUrl: './hsn-master-container.component.html',
})
export class HsnMasterContainerComponent implements OnInit, OnDestroy {

  private _currentPage: number;
  public searchString: string;
  public gstRateList$: Observable<Gst[]>;
  public hsnList$: Observable<PaginateResponse<Hsn[]>>

  // Subscription
  private createHsnSub: Subscription;
  private updateHsnSub: Subscription;
  private removeHsnSub: Subscription;

  constructor(private _yarnMasterService: YarnMasterService, private _utilityService: UtitityService) {
    this.searchString = "";
  }

  ngOnInit(): void {
    this._props();
  }

  ngOnDestroy(): void {
    this.createHsnSub?.unsubscribe();
    this.updateHsnSub?.unsubscribe();
    this.removeHsnSub?.unsubscribe();
  }

  _props(): void {
    this.getAllHsnCodeList();
    this.getAllGstRateList();
  }

  /**
   * get all hsn code list with pagination formate
   * @param page : page in list view default 1
   * @param search : search param default empty
   * @param gst : if true get gst desc of hsn code default true
   */
  getAllHsnCodeList(page: number = 1, search: string = '', gst: boolean = true): void {
    this._currentPage = page;
    this.searchString = search;
    this.hsnList$ = this._yarnMasterService.getAllHsnCodePaginate(page, search, gst);
  }

  /**
   * get all gst rate list
   */
  getAllGstRateList(): void {
    this.gstRateList$ = this._yarnMasterService.getAllGstRate();
  }

  /**
   * create new hsn code
   * if already exist throw conflict error
   * @param hsn : CreateHsnDto
   */
  createHsnCode(hsn: CreateHsnDto): void {
    this.createHsnSub = this._yarnMasterService.createHsnCode(hsn).subscribe({
      next: (res) => {
        this.getAllHsnCodeList();
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  /**
   * update existing hsn code
   * if already exist throw conflict error
   * @param hsn : UpdateHsnDto
   */
  updateHsnCode(hsn: UpdateHsnDto): void {
    this.updateHsnSub = this._yarnMasterService.updateHsnCode(hsn).subscribe({
      next: (res) => {
        this.getAllHsnCodeList(this._currentPage);
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  /**
   * remove hsn code by id
   * if id not exist throw not found exception
   * @param hsn : RemoveEmit
   */
  removeHsnCode(hsn: RemoveEmit) {
    this.removeHsnSub = this._yarnMasterService.removeHsnCode(hsn.id).subscribe({
      next: (res) => {
        hsn.length === 1 ? this._currentPage -= 1 : this._currentPage;
        this.getAllHsnCodeList(this._currentPage);
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

}
