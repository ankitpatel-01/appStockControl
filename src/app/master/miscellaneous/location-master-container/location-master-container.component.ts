import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { EventService } from 'src/app/shared/services/event.service';
import { UtitityService } from 'src/app/shared/services/utitity.service';
import { CreateLocationMasterDto, LocationMaster, UpdateLocationMasterDto } from '../../model/location.model';
import { YarnMasterService } from '../../services/yarn-master.service';

@Component({
  selector: 'app-location-master-container',
  templateUrl: './location-master-container.component.html',
})
export class LocationMasterContainerComponent implements OnInit {

  private _currentPage: number;
  public searchString: string;
  public locationList$: Observable<PaginateResponse<LocationMaster[]>>

  // Subscription
  private createLocationSub: Subscription;
  private updateLocationSub: Subscription;
  private removeLocationSub: Subscription;

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
    this.createLocationSub?.unsubscribe();
    this.updateLocationSub?.unsubscribe();
    this.removeLocationSub?.unsubscribe();
  }

  _props(): void {
    this.getAllLocationList();
  }

  /**
   * get all location list with pagination formate
   * @param page : page in list view default 1
   * @param search : search param default empty
   */
  getAllLocationList(page: number = 1, search: string = ''): void {
    this._loader.startLoader('location_master');
    this._currentPage = page;
    this.searchString = search;
    this.locationList$ = this._yarnMasterService.getAllLocationPaginate(page, search);
  }

  /**
   * create new location code
   * if already exist throw conflict error
   * @param location : CreateLocationMasterDto
   */
  createLocation(location: CreateLocationMasterDto): void {
    this.createLocationSub = this._yarnMasterService.createLocation(location).subscribe({
      next: (res) => {
        this.getAllLocationList();
        this._event.showSuccessSnackBar("New Loction created successfully");
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  /**
   * update existing location code
   * if already exist throw conflict error
   * @param location : UpdateLocationMasterDto
   */
  updateLocation(location: UpdateLocationMasterDto): void {
    this.updateLocationSub = this._yarnMasterService.updateLocation(location).subscribe({
      next: (res) => {
        this.getAllLocationList(this._currentPage);
        this._event.showSuccessSnackBar("Loction updated successfully");
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  /**
   * remove location code by id
   * if id not exist throw not found exception
   * @param location : RemoveEmit
   */
  removeLocation(location: RemoveEmit) {
    this.removeLocationSub = this._yarnMasterService.removeLocation(location.id).subscribe({
      next: (res) => {
        location.length === 1 ? this._currentPage = 1 : this._currentPage;
        this.getAllLocationList(this._currentPage);
        this._event.showSuccessSnackBar("location removed");
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

}
