import { Component, OnDestroy, OnInit } from '@angular/core';
// ------------------------------------------------------------------------------------
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
// ------------------------------------------------------------------------------------
import { UtitityService } from 'src/app/shared/services/utitity.service';
import { YarnMasterService } from '../../services/yarn-master.service';
// ------------------------------------------------------------------------------------
import { Gst } from '../../model/gst.model';
import { CreateHsnDto, Hsn, UpdateHsnDto } from '../../model/hsn.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';
import { EventService } from 'src/app/shared/services/event.service';

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
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private _yarnMasterService: YarnMasterService, private _utilityService: UtitityService, private _event: EventService) {
    this.searchString = "";
  }

  ngOnInit(): void {
    this._props();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this._yarnMasterService.createHsnCode(hsn)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.getAllHsnCodeList();
          this._event.showSuccessSnackBar("HSN code created");
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
    this._yarnMasterService.updateHsnCode(hsn)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.getAllHsnCodeList(this._currentPage);
          this._event.showSuccessSnackBar("HSN code updated");
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
    this._yarnMasterService.removeHsnCode(hsn.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this._currentPage = hsn.length === 1 ? 1 : this._currentPage;
          this.getAllHsnCodeList(this._currentPage);
          this._event.showSuccessSnackBar("HSN code removed");
        },
        error: (err) => {
          this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
        }
      })
  }

}
