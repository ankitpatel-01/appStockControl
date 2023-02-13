import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConfirmDialogData } from 'src/app/shared/models/confirm-dialog-data.model';
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
      this.isYarnListLoading = false;
    }
  }

  @Output() public createYarn: EventEmitter<CreateYarnDto>;
  @Output() public updateYarn: EventEmitter<UpdateYarnDto>;
  @Output() public removeYarn: EventEmitter<number>;


  private _yarnsList: YarnMaster[];
  public get yarnsList(): YarnMaster[] {
    return this._yarnsList;
  }

  private _createYarnSub: Subscription;
  private _updateYarnSub: Subscription;
  isYarnListLoading: boolean = false;

  //add paginaion
  currentPage = 1;

  constructor(private _yarnMasterListPresenter: YarnMasterPresenterListService, private _utilityService: UtitityService) {
    this._yarnsList = [];
    this.createYarn = new EventEmitter<CreateYarnDto>;
    this.updateYarn = new EventEmitter<UpdateYarnDto>;
    this.removeYarn = new EventEmitter<number>;
  }

  ngOnInit(): void {
    this.isYarnListLoading = true;
    this._props();
  }

  ngOnDestroy(): void {
    this._createYarnSub.unsubscribe();
    this._updateYarnSub.unsubscribe();
  }

  _props(): void {
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
  }

  yarnTrackBy(index: number, el: YarnMaster): number {
    return el.id;
  }

  removeYarnById(id: number) {
    const options: ConfirmDialogData = {
      title: 'Confirm Deactive',
      message: 'Are you sure you want to deactive this item?',
      cancelText: 'Cancel',
      confirmText: 'Deactive',
    };

    this._utilityService.openConfirmDialog(options);

    this._utilityService.confirmDialogClose().subscribe(confirmed => {
      if (confirmed) {
        this.removeYarn.emit(id)
      }
    });

  }

  openAddForm(yarnObj?: YarnMaster) {
    yarnObj ? this._yarnMasterListPresenter.openFormModal(yarnObj) : this._yarnMasterListPresenter.openFormModal();
  }

  gotoPage(page: number) {
    this.currentPage = page;
  }

}
