import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
// ---------------------------------------------------------------------------------------------
import { ComponentPortal } from '@angular/cdk/portal';
import { YarnQualityFormPresentationComponent } from './yarn-quality-form-presentation/yarn-quality-form-presentation.component';
// ---------------------------------------------------------------------------------------------
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
// ---------------------------------------------------------------------------------------------
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { UtitityService } from 'src/app/shared/services/utitity.service';
// ---------------------------------------------------------------------------------------------
import { PaginationMetaData } from 'src/app/shared/models/api-response.model';
import { ConfirmDialogData } from 'src/app/shared/models/confirm-dialog-data.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { CreateQualityDto, Quality, UpdateQualityDto } from '../../model/quality.model';
import { YarnType } from '../../model/yarn-type.model';
import { FormControl } from '@angular/forms';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';

@Component({
  selector: 'app-yarn-quality-list-presentation',
  templateUrl: './yarn-quality-list-presentation.component.html',
})
export class YarnQualityListPresentationComponent implements OnInit, OnDestroy {

  @Input() public set yarnQualityRes(res: PaginateResponse<Quality[]> | null) {
    if (res) {
      this._yarnQualityList = res.data;
      this.paginationMeta = res.meta as PaginationMetaData;
      this.isYarnQualityLoading = false;
    }
  }

  @Input() public set yarnTypeList(yarnTypeList: YarnType[] | null) {
    if (yarnTypeList) {
      this._yarnTypeList = yarnTypeList;
    }
  }

  @Output() pageChange: EventEmitter<number>;
  @Output() removeQualityId: EventEmitter<RemoveEmit>;
  @Output() qualitySearch: EventEmitter<string>;
  @Output() createQuality: EventEmitter<CreateQualityDto>;
  @Output() updateQuality: EventEmitter<UpdateQualityDto>;

  public isYarnQualityLoading: boolean;
  public searchControl: FormControl;
  public paginationMeta: PaginationMetaData;

  private _searchSubject = new Subject<string>();
  private searchSubscription: Subscription;
  private _yarnQualityList: Quality[];
  public get yarnQualityList(): Quality[] {
    return this._yarnQualityList;
  }

  private _yarnTypeList: YarnType[];
  get yarnTypeList(): YarnType[] {
    return this._yarnTypeList;
  }

  constructor(private _drawerService: DrawerService, private _utilityService: UtitityService) {
    this.pageChange = new EventEmitter<number>();
    this.removeQualityId = new EventEmitter<RemoveEmit>();
    this.createQuality = new EventEmitter<CreateQualityDto>();
    this.updateQuality = new EventEmitter<UpdateQualityDto>();
    this.qualitySearch = new EventEmitter<string>();
    this.isYarnQualityLoading = true;
    this._yarnQualityList = []
    this.searchControl = new FormControl<string>("");
  }

  ngOnInit(): void {
    this._props();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  _props(): void {
    this.onSearchQueryEmit();
    this._utilityService.resetSearchControl$.subscribe(() => this.searchControl.setValue(""));
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
      .subscribe((searchStr) => (this.qualitySearch.emit(searchStr)));
  }

  openQualityForm(yarnQualityEdit?: Quality) {
    const overlayRef = this._drawerService.createRightDrawer();
    const component = new ComponentPortal(YarnQualityFormPresentationComponent);
    const componentRef = overlayRef.attach(component);

    if (yarnQualityEdit) {
      componentRef.instance.quality = yarnQualityEdit;
    }
    if (this.yarnTypeList) {
      componentRef.instance.yarnTypeList = this.yarnTypeList;
    }
    componentRef.instance.cancel.subscribe({
      next: () => {
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
    componentRef.instance.save.subscribe({
      next: (yarnQuality: CreateQualityDto) => {
        if (yarnQualityEdit?.id) {
          const updatedQuality: UpdateQualityDto = {
            id: yarnQualityEdit.id,
            ...yarnQuality
          }
          this.updateQuality.emit(updatedQuality)
        } else {
          this.createQuality.emit(yarnQuality)
        }
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
  }

  yarnQualityTrackBy(index: number, el: Quality): number {
    return el.id as number;
  }

  removeQualityById(yarnQuality: Quality) {
    const options: ConfirmDialogData = {
      title: 'Confirm Deactive',
      message: `Are you sure you want to deactive ${yarnQuality.quality_desc}?`,
      cancelText: 'Cancel',
      confirmText: 'Deactive',
    };

    this._utilityService.openConfirmDialog(options);

    this._utilityService.confirmDialogClose().subscribe(confirmed => {
      if (confirmed) {
        this.removeQualityId.emit({ id: yarnQuality.id, length: this.yarnQualityList.length });
      }
    });
  }

  gotoPage(page: number) {
    this.paginationMeta.current_page = 2;
    this.pageChange.emit(page)
  }

}
