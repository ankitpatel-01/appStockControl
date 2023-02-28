import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { HsnMasterFormPresentationComponent } from '../hsn-master-form-presentation/hsn-master-form-presentation.component';
// ---------------------------------------------------------------------------------
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
// ---------------------------------------------------------------------------------
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { UtitityService } from 'src/app/shared/services/utitity.service';
// ---------------------------------------------------------------------------------
import { HsnTypeEnum } from 'src/app/master/constants/enums/hsn-type.enum';
import { Gst } from 'src/app/master/model/gst.model';
import { CreateHsnDto, Hsn, UpdateHsnDto } from 'src/app/master/model/hsn.model';
import { PaginationMetaData } from 'src/app/shared/models/api-response.model';
import { ConfirmDialogData } from 'src/app/shared/models/confirm-dialog-data.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';

@Component({
  selector: 'app-hsn-master-list-presentation',
  templateUrl: './hsn-master-list-presentation.component.html',
})
export class HsnMasterListPresentationComponent implements OnInit {

  /**
   * Input for hsn list with pagination
   */
  @Input() public set hsnRes(res: PaginateResponse<Hsn[]> | null) {
    if (res) {
      this._hsnList = res.data;
      this.paginationMeta = res.meta as PaginationMetaData;
      this.ishsnLoading = false;
    }
  }

  /**
   * Input for gst list without pagination
   */
  @Input() public set gstRateList(res: Gst[] | null) {
    if (res) {
      this._gstRateList = res;
    }
  }

  @Output() pageChange: EventEmitter<number>;
  @Output() removehsnId: EventEmitter<RemoveEmit>;
  @Output() createhsn: EventEmitter<CreateHsnDto>;
  @Output() updatehsn: EventEmitter<UpdateHsnDto>;
  @Output() hsnSearch: EventEmitter<string>;

  public ishsnLoading: boolean;
  public HsnTypeEnum = HsnTypeEnum;
  public paginationMeta: PaginationMetaData;

  private _hsnList: Hsn[];
  public get hsnList(): Hsn[] {
    return this._hsnList;
  }

  private _gstRateList: Gst[];
  public get gstRateList(): Gst[] {
    return this._gstRateList;
  }

  private _searchSubject = new Subject<string>();

  // Subscription
  private searchSubscription: Subscription;
  private hsnRemoveDialogSub: Subscription;

  constructor(private _drawerService: DrawerService, private _utilityService: UtitityService) {
    this.ishsnLoading = true;
    this._hsnList = [];
    this._gstRateList = [];
    this.pageChange = new EventEmitter<number>();
    this.removehsnId = new EventEmitter<RemoveEmit>();
    this.createhsn = new EventEmitter<CreateHsnDto>();
    this.updatehsn = new EventEmitter<UpdateHsnDto>();
    this.hsnSearch = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this._props();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
    this.hsnRemoveDialogSub?.unsubscribe();
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
      .subscribe((searchStr) => (this.hsnSearch.emit(searchStr)));
  }

  /**
   * open hsn form in add mode default
   * @param hsnEdit : hsn to open in edit mode
   */
  openHsnForm(hsnEdit?: Hsn) {
    const overlayRef = this._drawerService.createRightDrawer();
    const component = new ComponentPortal(HsnMasterFormPresentationComponent);
    const componentRef = overlayRef.attach(component);

    if (hsnEdit) {
      componentRef.instance.hsn = hsnEdit;
    }
    if (this.gstRateList) {
      componentRef.instance.gstRateList = this.gstRateList;
    }
    componentRef.instance.cancel.subscribe({
      next: () => {
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
    componentRef.instance.save.subscribe({
      next: (hsn: CreateHsnDto) => {
        if (hsnEdit?.id) {
          const updatedHsn: UpdateHsnDto = {
            id: hsnEdit.id,
            ...hsn,
          }
          this.updatehsn.emit(updatedHsn);
        } else {
          this.createhsn.emit(hsn);
        }
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
  }

  hsnTrackBy(index: number, el: Hsn): number {
    return el.id as number;
  }

  /**
   * open confirm delete dialog on confirm emit id to container
   * @param hsn :Hsn
   */
  removeHsnById(hsn: Hsn) {
    const options: ConfirmDialogData = {
      title: 'Confirm Deactive',
      message: `Are you sure you want to deactive ${hsn.hsn_code}?`,
      cancelText: 'Cancel',
      confirmText: 'Deactive',
    };

    this._utilityService.openConfirmDialog(options);

    this.hsnRemoveDialogSub = this._utilityService.confirmDialogClose().subscribe(confirmed => {
      if (confirmed) {
        this.removehsnId.emit({ id: hsn.id, length: this.hsnList.length });
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
