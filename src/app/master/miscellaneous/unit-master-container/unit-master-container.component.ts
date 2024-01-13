import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { EventService } from 'src/app/shared/services/event.service';
import { UtitityService } from 'src/app/shared/services/utitity.service';
import { CreateUnitDto, Unit, UpdateUnitDto } from '../../model/unit.model';
import { YarnMasterService } from '../../services/yarn-master.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-unit-master-container',
  templateUrl: './unit-master-container.component.html',
})
export class UnitMasterContainerComponent implements OnInit {

  private _currentPage: number;
  public searchString: string;
  public unitList$: Observable<PaginateResponse<Unit[]>>

  // Subscription
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _yarnMasterService: YarnMasterService,
    private _utilityService: UtitityService,
    private _event: EventService,
    private _loader: LoaderService,
  ) {
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
    this.getAllUnitList();
  }

  /**
   * get all unit list with pagination formate
   * @param page : page in list view default 1
   * @param search : search param default empty
   */
  getAllUnitList(page: number = 1, search: string = ''): void {
    this._loader.startLoader('unit_master');
    this._currentPage = page;
    this.searchString = search;
    this.unitList$ = this._yarnMasterService.getAllUnitPaginate(page, search);
  }

  /**
   * create new unit code
   * if already exist throw conflict error
   * @param unit : CreateUnitDto
   */
  createUnit(unit: CreateUnitDto): void {
    this._yarnMasterService.createUnit(unit)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.getAllUnitList();
          this._event.showSuccessSnackBar("New Unit created successfully");
        },
        error: (err) => {
          this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
        }
      })
  }

  /**
   * update existing unit code
   * if already exist throw conflict error
   * @param unit : UpdateUnitDto
   */
  updateUnit(unit: UpdateUnitDto): void {
    this._yarnMasterService.updateUnit(unit)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.getAllUnitList(this._currentPage);
          this._event.showSuccessSnackBar("Unit updated successfully");
        },
        error: (err) => {
          this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
        }
      })
  }

  /**
   * remove unit code by id
   * if id not exist throw not found exception
   * @param unit : RemoveEmit
   */
  removeUnit(unit: RemoveEmit) {
    this._yarnMasterService.removeUnit(unit.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          unit.length === 1 ? this._currentPage = 1 : this._currentPage;
          this.getAllUnitList(this._currentPage);
          this._event.showSuccessSnackBar("unit removed");
        },
        error: (err) => {
          this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
        }
      })
  }

}
