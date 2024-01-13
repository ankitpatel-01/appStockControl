import { Component, OnInit } from '@angular/core';
// --------------------------------------------------------------------------
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
// --------------------------------------------------------------------------
import { YarnMasterService } from '../../services/yarn-master.service';
import { UtitityService } from 'src/app/shared/services/utitity.service';
// --------------------------------------------------------------------------
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { CreateGstDto, Gst, UpdateGstDto } from '../../model/gst.model';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';
import { EventService } from 'src/app/shared/services/event.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-tax-master-container',
  templateUrl: './tax-master-container.component.html',
})
export class TaxMasterContainerComponent implements OnInit {

  private _currentPage: number;
  public searchString: string;
  public gstRateList$: Observable<PaginateResponse<Gst[]>>

  //Subscription
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
    this.getAllGstRateList();
  }

  /**
   * get all gst rate list
   */
  getAllGstRateList(page: number = 1, search: string = ''): void {
    this._currentPage = page;
    this.searchString = search;
    this.gstRateList$ = this._yarnMasterService.getAllGstRatePaginate(page, search);
  }

  /**
   * create new gst Rate
   * if already exist throw conflict error
   * @param gstRate : CreateGstDto
   */
  createGstRate(gstRate: CreateGstDto): void {
    this._yarnMasterService.createGstRate(gstRate)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.getAllGstRateList();
          this._event.showSuccessSnackBar("GST code created");
        },
        error: (err) => {
          this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
        }
      })
  }

  /**
   * update existing gst Rate 
   * if already exist throw conflict error
   * @param gstRate : UpdateGstDto
   */
  updateGstRate(gstRate: UpdateGstDto): void {
    this._yarnMasterService.updateGstRate(gstRate)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.getAllGstRateList(this._currentPage, this.searchString);
          this._event.showSuccessSnackBar("GST code updated");
        },
        error: (err) => {
          console.log(err)
          this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
        }
      })
  }

  /**
   * remove gst Rate by id
   * if id not exist throw not found exception
   * @param gst : RemoveEmit 
   */
  removeGstRate(gst: RemoveEmit) {
    this._yarnMasterService.removeGstRate(gst.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          gst.length == 1 ? this._currentPage = 1 : this._currentPage;
          this.getAllGstRateList(this._currentPage, this.searchString);
          this._event.showSuccessSnackBar("GST code removed");
        },
        error: (err) => {
          this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
        }
      })
  }

}
