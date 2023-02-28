import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { PaginationMetaData } from 'src/app/shared/models/api-response.model';
import { ConfirmDialogData } from 'src/app/shared/models/confirm-dialog-data.model';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { UtitityService } from 'src/app/shared/services/utitity.service';
import { YarnType } from '../../model/yarn-type.model';
import { YarnTypeFormPresentationComponent } from './yarn-type-form-presentation/yarn-type-form-presentation.component';

@Component({
  selector: 'app-yarn-type-list-presentation',
  templateUrl: './yarn-type-list-presentation.component.html',
})
export class YarnTypeListPresentationComponent implements OnInit {

  @Input() public set yarnTypeRes(res: PaginateResponse<YarnType[]> | null) {
    if (res) {
      this._yarnTypeList = res.data;
      this.paginationMeta = res.meta as PaginationMetaData;
      this.isYarnTypeLoading = false;
    }
  }

  @Output() pageChange: EventEmitter<number>;
  @Output() removeYarnTypeId: EventEmitter<RemoveEmit>;
  @Output() createYarnType: EventEmitter<YarnType>;
  @Output() updateYarnType: EventEmitter<YarnType>;
  @Output() yarnTypeSearch: EventEmitter<string>;


  public isYarnTypeLoading: boolean;
  public searchControl: FormControl;
  public paginationMeta: PaginationMetaData;

  private _searchSubject: Subject<string>;
  private searchSubscription: Subscription;

  private _yarnTypeList: YarnType[];
  public get yarnTypeList(): YarnType[] {
    return this._yarnTypeList;
  }

  constructor(private _drawerService: DrawerService, private _utilityService: UtitityService) {
    this.pageChange = new EventEmitter<number>();
    this.removeYarnTypeId = new EventEmitter<RemoveEmit>();
    this.createYarnType = new EventEmitter<YarnType>();
    this.updateYarnType = new EventEmitter<YarnType>();
    this.yarnTypeSearch = new EventEmitter<string>();
    this.isYarnTypeLoading = true;
    this._yarnTypeList = [];
    this._searchSubject = new Subject<string>();
    this.searchControl = new FormControl<string>("");
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this._props();
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
      .subscribe((searchStr) => (this.yarnTypeSearch.emit(searchStr)));
  }

  openYarnTypeForm(yarnTypeEdit?: YarnType) {
    const overlayRef = this._drawerService.createRightDrawer();
    const component = new ComponentPortal(YarnTypeFormPresentationComponent);
    const componentRef = overlayRef.attach(component);

    if (yarnTypeEdit) {
      componentRef.instance.yarnType = yarnTypeEdit;
    }
    componentRef.instance.cancel.subscribe({
      next: () => {
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
    componentRef.instance.save.subscribe({
      next: (yarnType: YarnType) => {
        if (yarnTypeEdit?.id) {
          yarnType.id = yarnTypeEdit.id;
          this.updateYarnType.emit(yarnType)
        } else {
          this.createYarnType.emit(yarnType)
        }
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
  }

  yarnTypeTrackBy(index: number, el: YarnType): number {
    return el.id as number;
  }

  removeYarnTypeById(yarnType: YarnType) {
    const options: ConfirmDialogData = {
      title: 'Confirm Deactive',
      message: `Are you sure you want to deactive ${yarnType.type_desc}?`,
      cancelText: 'Cancel',
      confirmText: 'Deactive',
    };

    this._utilityService.openConfirmDialog(options);

    this._utilityService.confirmDialogClose().subscribe(confirmed => {
      if (confirmed) {
        this.removeYarnTypeId.emit({ id: yarnType.id, length: this.yarnTypeList.length });
      }
    });
  }

  gotoPage(page: number) {
    this.paginationMeta.current_page = 2;
    this.pageChange.emit(page)
  }

}
