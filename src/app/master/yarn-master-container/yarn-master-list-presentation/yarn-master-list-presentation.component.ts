import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { Loader, LoaderService } from 'src/app/core/services/loader.service';
import { PaginationMetaData } from 'src/app/shared/models/api-response.model';
import { ConfirmDialogData } from 'src/app/shared/models/confirm-dialog-data.model';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { UtitityService } from 'src/app/shared/services/utitity.service';
import { CreateYarnDto, UpdateYarnDto } from '../../model/yarn-add-req.model';
import { YarnMaster } from '../../model/yarn-master.model';
import { YarnMasterPresenterListService } from '../yarn-master-list-presenter/yarn-master-list-presenter.service';

@Component({
  selector: 'app-yarn-master-list-presentation',
  templateUrl: './yarn-master-list-presentation.component.html',
  viewProviders: [YarnMasterPresenterListService],
})
export class YarnMasterListPresentationComponent implements OnInit, OnDestroy {

  @Input() public set yarnsRes(res: PaginateResponse<YarnMaster[]> | null) {
    if (res) {
      this._yarnsList = res.data;
      this.paginationMeta = res.meta as PaginationMetaData;
      this._loader.stopLoader('yarn');
    }
  }

  @Output() public createYarn: EventEmitter<CreateYarnDto>;
  @Output() public updateYarn: EventEmitter<UpdateYarnDto>;
  @Output() public removeYarn: EventEmitter<RemoveEmit>;
  @Output() public yarnSearch: EventEmitter<string>;
  @Output() public pageChange: EventEmitter<number>;

  public searchControl: FormControl;
  public paginationMeta: PaginationMetaData;

  private _searchSubject: Subject<string>;
  private searchSubscription: Subscription;

  private _yarnsList: YarnMaster[];
  public get yarnsList(): YarnMaster[] {
    return this._yarnsList;
  }

  private _createYarnSub: Subscription;
  private _updateYarnSub: Subscription;
  isYarnListLoading: boolean = false;

  //add paginaion
  currentPage = 1;

  constructor(private _yarnMasterListPresenter: YarnMasterPresenterListService, private _utilityService: UtitityService, private _loader: LoaderService) {
    this._yarnsList = [];
    this.createYarn = new EventEmitter<CreateYarnDto>;
    this.updateYarn = new EventEmitter<UpdateYarnDto>;
    this.removeYarn = new EventEmitter<RemoveEmit>();
    this.yarnSearch = new EventEmitter<string>();
    this.pageChange = new EventEmitter<number>();
    this._searchSubject = new Subject<string>();
    this.searchControl = new FormControl<string>("");
  }

  ngOnInit(): void {
    this._props();
  }

  ngOnDestroy(): void {
    this._createYarnSub?.unsubscribe();
    this._updateYarnSub?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  _props(): void {
    this.onSearchQueryEmit();
    this._createYarnSub = this._yarnMasterListPresenter.createYarn$.subscribe({
      next: (createYarn: CreateYarnDto) => {
        this.createYarn.emit(createYarn)
      }
    })

    this._updateYarnSub = this._yarnMasterListPresenter.updateYarn$.subscribe({
      next: (upadteYarn: UpdateYarnDto) => {
        this.updateYarn.emit(upadteYarn)
      }
    })

    this._loader.compontentLoader$.subscribe((loader: Loader) => {
      if (loader.name === "yarn" || loader.name === "All") {
        this.isYarnListLoading = loader.state;
      }
    })
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
      .subscribe((searchStr) => (this.yarnSearch.emit(searchStr)));
  }

  yarnTrackBy(index: number, el: YarnMaster): number {
    return el.id;
  }

  removeYarnById(yarn: YarnMaster) {
    const options: ConfirmDialogData = {
      title: 'Confirm Deactive',
      message: `Are you sure you want to deactive ${yarn.yarn_code}?`,
      cancelText: 'Cancel',
      confirmText: 'Deactive',
    };

    this._utilityService.openConfirmDialog(options);

    this._utilityService.confirmDialogClose().subscribe(confirmed => {
      if (confirmed) {
        this.removeYarn.emit({ id: yarn.id, length: this.yarnsList.length })
      }
    });

  }

  openAddForm(yarnObj?: YarnMaster) {
    yarnObj ? this._yarnMasterListPresenter.openFormModal(yarnObj) : this._yarnMasterListPresenter.openFormModal();
  }

  gotoPage(page: number) {
    this.pageChange.emit(page);
  }

}
