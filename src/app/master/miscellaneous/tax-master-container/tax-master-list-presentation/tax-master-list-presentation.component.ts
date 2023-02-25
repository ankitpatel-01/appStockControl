import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
// ---------------------------------------------------------------------------------
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
// ---------------------------------------------------------------------------------
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { UtitityService } from 'src/app/shared/services/utitity.service';
// ---------------------------------------------------------------------------------
import { CreateGstDto, Gst, UpdateGstDto } from 'src/app/master/model/gst.model';
import { PaginationMetaData } from 'src/app/shared/models/api-response.model';
import { ConfirmDialogData } from 'src/app/shared/models/confirm-dialog-data.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { TaxMasterFormPresentationComponent } from '../tax-master-form-presentation/tax-master-form-presentation.component';

@Component({
  selector: 'app-tax-master-list-presentation',
  templateUrl: './tax-master-list-presentation.component.html',
})
export class TaxMasterListPresentationComponent implements OnInit {

  /**
  * Input for gst rate list with pagination
  */
  @Input() public set gstRateListRes(res: PaginateResponse<Gst[]> | null) {
    if (res) {
      this._gstRateList = res.data;
      this.paginationMeta = res.meta as PaginationMetaData;
      this.isGstLoading = false;
    }
  }

  @Output() pageChange: EventEmitter<number>;
  @Output() removeGstId: EventEmitter<number>;
  @Output() createGst: EventEmitter<CreateGstDto>;
  @Output() updateGst: EventEmitter<UpdateGstDto>;
  @Output() GstSearch: EventEmitter<string>;

  public isGstLoading: boolean;
  public paginationMeta: PaginationMetaData;

  private _gstRateList: Gst[];
  public get gstRateList(): Gst[] {
    return this._gstRateList;
  }

  private _searchSubject = new Subject<string>();

  // Subscription
  private searchSubscription: Subscription;
  private GstRemoveDialogSub: Subscription;

  constructor(private _drawerService: DrawerService, private _utilityService: UtitityService) {
    this.isGstLoading = true;
    this._gstRateList = []
    this.pageChange = new EventEmitter<number>();
    this.removeGstId = new EventEmitter<number>();
    this.createGst = new EventEmitter<CreateGstDto>();
    this.updateGst = new EventEmitter<UpdateGstDto>();
    this.GstSearch = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this._props();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
    this.GstRemoveDialogSub?.unsubscribe();
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
      .subscribe((searchStr) => (this.GstSearch.emit(searchStr)));
  }

  /**
   * open Gst form in add mode default
   * @param GstEdit : Gst to open in edit mode
   */
  openGstForm(GstEdit?: Gst) {
    const overlayRef = this._drawerService.createRightDrawer();
    const component = new ComponentPortal(TaxMasterFormPresentationComponent);
    const componentRef = overlayRef.attach(component);

    if (GstEdit) {
      componentRef.instance.gstRate = GstEdit;
    }

    componentRef.instance.cancel.subscribe({
      next: () => {
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
    componentRef.instance.save.subscribe({
      next: (gst: CreateGstDto) => {
        if (GstEdit?.id) {
          const updateGstRate: UpdateGstDto = {
            id: GstEdit.id,
            ...gst
          }
          this.updateGst.emit(updateGstRate);
        } else {
          this.createGst.emit(gst)
        }
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
  }

  GstTrackBy(index: number, el: Gst): number {
    return el.id as number;
  }

  /**
   * open confirm delete dialog on confirm emit id to container
   * @param Gst :Gst
   */
  removeGstById(Gst: Gst) {
    const options: ConfirmDialogData = {
      title: 'Confirm Deactive',
      message: `Are you sure you want to deactive ${Gst.gst_desc}?`,
      cancelText: 'Cancel',
      confirmText: 'Deactive',
    };

    this._utilityService.openConfirmDialog(options);

    this.GstRemoveDialogSub = this._utilityService.confirmDialogClose().subscribe(confirmed => {
      if (confirmed) {
        this.removeGstId.emit(Gst.id);
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
