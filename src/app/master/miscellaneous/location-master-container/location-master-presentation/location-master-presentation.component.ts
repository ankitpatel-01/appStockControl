import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { Loader, LoaderService } from 'src/app/core/services/loader.service';
import { LocationMaster, CreateLocationMasterDto, UpdateLocationMasterDto } from 'src/app/master/model/location.model';
import { PaginationMetaData } from 'src/app/shared/models/api-response.model';
import { ConfirmDialogData } from 'src/app/shared/models/confirm-dialog-data.model';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { UtitityService } from 'src/app/shared/services/utitity.service';
import { LocationMasterFormPresentationComponent } from '../location-master-form-presentation/location-master-form-presentation.component';

@Component({
  selector: 'app-location-master-presentation',
  templateUrl: './location-master-presentation.component.html',
})
export class LocationMasterPresentationComponent implements OnInit, OnDestroy {

  /**
   * Input for location list with pagination
   */
  @Input() public set locationListRes(res: PaginateResponse<LocationMaster[]> | null) {
    if (res) {
      this._locationList = res.data;
      this.paginationMeta = res.meta as PaginationMetaData;
      this._loader.stopLoader("location_master");
    }
  }

  @Output() pageChange: EventEmitter<number>;
  @Output() removeLocationMasterId: EventEmitter<RemoveEmit>;
  @Output() createLocationMaster: EventEmitter<CreateLocationMasterDto>;
  @Output() updateLocationMaster: EventEmitter<UpdateLocationMasterDto>;
  @Output() LocationMasterSearch: EventEmitter<string>;

  public isLocationMasterLoading: boolean;
  public paginationMeta: PaginationMetaData;

  private _locationList: LocationMaster[];
  public get locationList(): LocationMaster[] {
    return this._locationList;
  }

  private _searchSubject = new Subject<string>();

  // Subscription
  private searchSubscription: Subscription;
  private LocationMasterRemoveDialogSub: Subscription;

  constructor(
    private _drawerService: DrawerService,
    private _utilityService: UtitityService,
    private _loader: LoaderService
  ) {
    this.isLocationMasterLoading = true;
    this._locationList = []
    this.pageChange = new EventEmitter<number>();
    this.removeLocationMasterId = new EventEmitter<RemoveEmit>();
    this.createLocationMaster = new EventEmitter<CreateLocationMasterDto>();
    this.updateLocationMaster = new EventEmitter<UpdateLocationMasterDto>();
    this.LocationMasterSearch = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this._props();

    this._loader.compontentLoader$.subscribe((loader: Loader) => {
      if (loader.name === "location_master" || loader.name === "all") {
        this.isLocationMasterLoading = loader.state;
      }
    })
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
    this.LocationMasterRemoveDialogSub?.unsubscribe();
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
        this.LocationMasterSearch.emit(searchStr)
      ));
  }

  /**
   * open LocationMaster form in add mode default
   * @param LocationMasterEdit : LocationMaster to open in edit mode
   */
  openLocationMasterForm(LocationMasterEdit?: LocationMaster) {
    const overlayRef = this._drawerService.createRightDrawer();
    const component = new ComponentPortal(LocationMasterFormPresentationComponent);
    const componentRef = overlayRef.attach(component);

    if (LocationMasterEdit) {
      componentRef.instance.locationMaster = LocationMasterEdit;
    }

    componentRef.instance.cancel.subscribe({
      next: () => {
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
    componentRef.instance.save.subscribe({
      next: (gst: CreateLocationMasterDto) => {
        if (LocationMasterEdit?.id) {
          const updateLocationMasterRate: UpdateLocationMasterDto = {
            id: LocationMasterEdit.id,
            ...gst
          }
          this.updateLocationMaster.emit(updateLocationMasterRate);
        } else {
          this.createLocationMaster.emit(gst)
        }
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
  }

  LocationMasterTrackBy(index: number, el: LocationMaster): number {
    return el.id as number;
  }

  /**
   * open confirm delete dialog on confirm emit id to container
   * @param LocationMaster :LocationMaster
   */
  removeLocationMasterById(LocationMaster: LocationMaster) {
    const options: ConfirmDialogData = {
      title: 'Confirm Deactive',
      message: `Are you sure you want to deactive ${LocationMaster.location_name}?`,
      cancelText: 'Cancel',
      confirmText: 'Deactive',
    };

    this._utilityService.openConfirmDialog(options);

    this.LocationMasterRemoveDialogSub = this._utilityService.confirmDialogClose().subscribe(confirmed => {
      if (confirmed) {
        this.removeLocationMasterId.emit({ id: LocationMaster.id, length: this.locationList.length });
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
