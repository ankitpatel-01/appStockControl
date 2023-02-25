import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationMetaData } from 'src/app/shared/models/api-response.model';
import { ConfirmDialogData } from 'src/app/shared/models/confirm-dialog-data.model';
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
  @Output() removeYarnTypeId: EventEmitter<number>;
  @Output() createYarnType: EventEmitter<YarnType>;
  @Output() updateYarnType: EventEmitter<YarnType>;


  public isYarnTypeLoading: boolean;

  public paginationMeta: PaginationMetaData;

  private _yarnTypeList: YarnType[];
  public get yarnTypeList(): YarnType[] {
    return this._yarnTypeList;
  }

  constructor(private _drawerService: DrawerService, private _utilityService: UtitityService) {
    this.pageChange = new EventEmitter<number>();
    this.removeYarnTypeId = new EventEmitter<number>();
    this.createYarnType = new EventEmitter<YarnType>();
    this.updateYarnType = new EventEmitter<YarnType>();
    this.isYarnTypeLoading = true;
    this._yarnTypeList = []
  }

  ngOnInit(): void {

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
        this.removeYarnTypeId.emit(yarnType.id);
      }
    });
  }

  gotoPage(page: number) {
    this.paginationMeta.current_page = 2;
    this.pageChange.emit(page)
  }

}
