import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
// ---------------------------------------------------------------------------------------------
import { ComponentPortal } from '@angular/cdk/portal';
import { YarnGroupFormPresentationComponent } from './yarn-group-form-presentation/yarn-group-form-presentation.component';
// ---------------------------------------------------------------------------------------------
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
// ---------------------------------------------------------------------------------------------
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { UtitityService } from 'src/app/shared/services/utitity.service';
// ---------------------------------------------------------------------------------------------
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { PaginationMetaData } from 'src/app/shared/models/api-response.model';
import { FormControl } from '@angular/forms';
import { ConfirmDialogData } from 'src/app/shared/models/confirm-dialog-data.model';
import { CreateYarnGroupDto, UpdateYarnGroupDto, YarnGroup } from '../../model/yarn-group.model';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';
@Component({
  selector: 'app-yarn-group-list-presentation',
  templateUrl: './yarn-group-list-presentation.component.html',
})
export class YarnGroupListPresentationComponent implements OnInit, OnDestroy {

  @Input() public set yarnGroupRes(res: PaginateResponse<YarnGroup[]> | null) {
    if (res) {
      this._yarnGroupList = res.data;
      this.paginationMeta = res.meta as PaginationMetaData;
      this.isYarnGroupLoading = false;
    }
  }

  @Output() pageChange: EventEmitter<number>;
  @Output() removeYarnGroupId: EventEmitter<RemoveEmit>;
  @Output() yarnGroupSearch: EventEmitter<string>;
  @Output() createYarnGroup: EventEmitter<CreateYarnGroupDto>;
  @Output() updateYarnGroup: EventEmitter<UpdateYarnGroupDto>;

  public isYarnGroupLoading: boolean;
  public searchControl: FormControl;
  public paginationMeta: PaginationMetaData;

  private _searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  private _yarnGroupList: YarnGroup[];
  public get yarnGroupList(): YarnGroup[] {
    return this._yarnGroupList;
  }

  constructor(private _drawerService: DrawerService, private _utilityService: UtitityService) {
    this.pageChange = new EventEmitter<number>();
    this.removeYarnGroupId = new EventEmitter<RemoveEmit>();
    this.createYarnGroup = new EventEmitter<CreateYarnGroupDto>();
    this.updateYarnGroup = new EventEmitter<UpdateYarnGroupDto>();
    this.yarnGroupSearch = new EventEmitter<string>();
    this.isYarnGroupLoading = true;
    this._yarnGroupList = [];
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
      .subscribe((searchStr) => (this.yarnGroupSearch.emit(searchStr)));
  }

  openYarnGroupForm(yarnGroupEdit?: YarnGroup) {
    const overlayRef = this._drawerService.createRightDrawer();
    const component = new ComponentPortal(YarnGroupFormPresentationComponent);
    const componentRef = overlayRef.attach(component);

    if (yarnGroupEdit) {
      componentRef.instance.yarnGroup = yarnGroupEdit;
    }

    componentRef.instance.cancel.subscribe({
      next: () => {
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
    componentRef.instance.save.subscribe({
      next: (yarnGroup: CreateYarnGroupDto) => {
        if (yarnGroupEdit?.id) {
          const updatedYarnGroup: UpdateYarnGroupDto = {
            id: yarnGroupEdit.id,
            ...yarnGroup
          }
          this.updateYarnGroup.emit(updatedYarnGroup)
        } else {
          this.createYarnGroup.emit(yarnGroup)
        }
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
  }

  yarnGroupTrackBy(index: number, el: YarnGroup): number {
    return el.id as number;
  }

  removeYarnGroupById(yarnGroup: YarnGroup) {
    const options: ConfirmDialogData = {
      title: 'Confirm Deactive',
      message: `Are you sure you want to deactive ${yarnGroup.yarn_grp_name}?`,
      cancelText: 'Cancel',
      confirmText: 'Deactive',
    };

    this._utilityService.openConfirmDialog(options);

    this._utilityService.confirmDialogClose().subscribe(confirmed => {
      if (confirmed) {
        this.removeYarnGroupId.emit({ id: yarnGroup.id, length: this.yarnGroupList.length });
      }
    });
  }

  gotoPage(page: number) {
    this.paginationMeta.current_page = 2;
    this.pageChange.emit(page)
  }
}
