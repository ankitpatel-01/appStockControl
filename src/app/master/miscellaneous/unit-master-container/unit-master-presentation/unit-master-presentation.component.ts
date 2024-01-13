import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { LoaderService, Loader } from 'src/app/core/services/loader.service';
import { Unit, CreateUnitDto, UpdateUnitDto } from 'src/app/master/model/unit.model';
import { PaginationMetaData } from 'src/app/shared/models/api-response.model';
import { ConfirmDialogData } from 'src/app/shared/models/confirm-dialog-data.model';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { UtitityService } from 'src/app/shared/services/utitity.service';
import { UnitMasterFormPresentationComponent } from '../unit-master-form-presentation/unit-master-form-presentation.component';

@Component({
  selector: 'app-unit-master-presentation',
  templateUrl: './unit-master-presentation.component.html',
})
export class UnitMasterPresentationComponent implements OnInit, OnDestroy {


  /**
   * Input for gst rate list with pagination
   */
  @Input() public set unitListRes(res: PaginateResponse<Unit[]> | null) {
    if (res) {
      this._unitList = res.data;
      this.paginationMeta = res.meta as PaginationMetaData;
      this._loader.stopLoader("unit_master");
    }
  }

  @Output() pageChange: EventEmitter<number>;
  @Output() removeUnitId: EventEmitter<RemoveEmit>;
  @Output() createUnit: EventEmitter<CreateUnitDto>;
  @Output() updateUnit: EventEmitter<UpdateUnitDto>;
  @Output() UnitSearch: EventEmitter<string>;

  public isUnitLoading: boolean;
  public paginationMeta: PaginationMetaData;

  private _unitList: Unit[];
  public get unitList(): Unit[] {
    return this._unitList;
  }

  private _searchSubject = new Subject<string>();

  // Subscription
  private searchSubscription: Subscription;
  private UnitRemoveDialogSub: Subscription;

  constructor(
    private _drawerService: DrawerService,
    private _utilityService: UtitityService,
    private _loader: LoaderService
  ) {
    this.isUnitLoading = true;
    this._unitList = []
    this.pageChange = new EventEmitter<number>();
    this.removeUnitId = new EventEmitter<RemoveEmit>();
    this.createUnit = new EventEmitter<CreateUnitDto>();
    this.updateUnit = new EventEmitter<UpdateUnitDto>();
    this.UnitSearch = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this._props();

    this._loader.compontentLoader$.subscribe((loader: Loader) => {
      if (loader.name === "unit_master" || loader.name === "all") {
        this.isUnitLoading = loader.state;
      }
    })
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
    this.UnitRemoveDialogSub?.unsubscribe();
  }

  _props(): void {
    this.onSearchQueryEmit();
  }

  /**
   * emit search string to search subject
   * @param event : input Event
   */
  onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this._searchSubject.next(searchQuery?.trim());
  }

  /**
   * emit search string to container with .3s debounce
   */
  onSearchQueryEmit(): void {
    this.searchSubscription = this._searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((searchStr) => (
        this.UnitSearch.emit(searchStr)
      ));
  }

  /**
   * open Unit form in add mode default
   * @param UnitEdit : Unit to open in edit mode
   */
  openUnitForm(UnitEdit?: Unit) {
    const overlayRef = this._drawerService.createRightDrawer();
    const component = new ComponentPortal(UnitMasterFormPresentationComponent);
    const componentRef = overlayRef.attach(component);

    if (UnitEdit) {
      componentRef.instance.unit = UnitEdit;
    }

    componentRef.instance.cancel.subscribe({
      next: () => {
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
    componentRef.instance.save.subscribe({
      next: (gst: CreateUnitDto) => {
        if (UnitEdit?.id) {
          const updateUnitRate: UpdateUnitDto = {
            id: UnitEdit.id,
            ...gst
          }
          this.updateUnit.emit(updateUnitRate);
        } else {
          this.createUnit.emit(gst)
        }
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
  }

  UnitTrackBy(index: number, el: Unit): number {
    return el.id as number;
  }

  /**
   * open confirm delete dialog on confirm emit id to container
   * @param Unit :Unit
   */
  removeUnitById(Unit: Unit) {
    const options: ConfirmDialogData = {
      title: 'Confirm Deactive',
      message: `Are you sure you want to deactive ${Unit.unit_name}?`,
      cancelText: 'Cancel',
      confirmText: 'Deactive',
    };

    this._utilityService.openConfirmDialog(options);

    this.UnitRemoveDialogSub = this._utilityService.confirmDialogClose().subscribe(confirmed => {
      if (confirmed) {
        this.removeUnitId.emit({ id: Unit.id, length: this.unitList.length });
      }
    });
  }

  /**
   * emit page change event
   * @param page : number
   */
  gotoPage(page: number) {
    this.pageChange.emit(page)
  }

}
