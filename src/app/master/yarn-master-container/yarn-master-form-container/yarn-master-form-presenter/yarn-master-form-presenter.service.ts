import { Dialog } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { Category } from 'src/app/master/model/category.model';
import { Color } from 'src/app/master/model/color.model';
import { DialogData } from 'src/app/master/model/dialog-data.model';
import { Gst } from 'src/app/master/model/gst.model';
import { HsnDialogData } from 'src/app/master/model/hsn-dialog.model';
import { Hsn } from 'src/app/master/model/hsn.model';
import { YarnForm } from 'src/app/master/model/interface/yarnForm';
import { Quality } from 'src/app/master/model/quality.model';
import { CreateYarnDto, UpdateYarnDto } from 'src/app/master/model/yarn-add-req.model';
import { YarnGroup } from 'src/app/master/model/yarn-group.model';
import { YarnType } from 'src/app/master/model/yarn-type.model';
import { ColorAddDialogComponent } from '../yarn-master-form-presentation/color-add-dialog/color-add-dialog.component';
import { HsnAddDialogComponent } from '../yarn-master-form-presentation/hsn-add-dialog/hsn-add-dialog.component';
import { QualityAddDialogComponent } from '../yarn-master-form-presentation/quality-add-dialog/quality-add-dialog.component';
import { YarnCategoryAddDialogComponent } from '../yarn-master-form-presentation/yarn-category-add-dialog/yarn-category-add-dialog.component';
import { YarnGroupAddDialogComponent } from '../yarn-master-form-presentation/yarn-group-add-dialog/yarn-group-add-dialog.component';
import { YarnTypeAddDialogComponent } from '../yarn-master-form-presentation/yarn-type-add-dialog/yarn-type-add-dialog.component';

@Injectable()
export class YarnMasterFormPresenterService {


  private _createYarn: Subject<CreateYarnDto>;
  public createYarn$: Observable<CreateYarnDto>

  private _updateYarn: Subject<UpdateYarnDto>;
  public updateYarn$: Observable<UpdateYarnDto>

  private _createYarnType: Subject<YarnType>;
  public createYarnType$: Observable<YarnType>

  private _createQuality: Subject<Quality>;
  public createQuality$: Observable<Quality>;

  private _createColor: Subject<Color>;
  public createColor$: Observable<Color>;

  private _createCategory: Subject<Category>;
  public createCategory$: Observable<Category>;

  private _createYarnGroup: Subject<YarnGroup>;
  public createYarnGroup$: Observable<YarnGroup>;

  private _createHsnCode: Subject<Hsn>;
  public createHsnCode$: Observable<Hsn>;

  public yarnTypeList: YarnType[];
  public gstRateList: Gst[];


  constructor(private _dialog: Dialog) {
    this._createYarn = new Subject<CreateYarnDto>;
    this.createYarn$ = this._createYarn.asObservable();

    this._updateYarn = new Subject<UpdateYarnDto>;
    this.updateYarn$ = this._updateYarn.asObservable();

    this._createYarnType = new Subject<YarnType>;
    this.createYarnType$ = this._createYarnType.asObservable();

    this._createQuality = new Subject<Quality>;
    this.createQuality$ = this._createQuality.asObservable();

    this._createColor = new Subject<Color>;
    this.createColor$ = this._createColor.asObservable();

    this._createCategory = new Subject<Category>;
    this.createCategory$ = this._createCategory.asObservable();

    this._createYarnGroup = new Subject<YarnGroup>;
    this.createYarnGroup$ = this._createYarnGroup.asObservable();

    this._createHsnCode = new Subject<Hsn>;
    this.createHsnCode$ = this._createHsnCode.asObservable();
  }

  openAddDialog(component: ComponentType<unknown>, data: HsnDialogData | any = {}) {
    let dialogRef = this._dialog.open(component, {
      minWidth: '300px',
      data,
    });

    dialogRef.closed.subscribe({
      next: (dialogData: DialogData | any) => {
        if (dialogData?.isSave) {
          this.emitCreateobject(dialogData)
        }
      }
    });
  }

  emitCreateobject(dialogData: DialogData) {
    switch (dialogData.type) {
      case "yarnType": {
        this._createYarnType.next(dialogData.data as YarnType);
        break;
      }
      case "quality": {
        this._createQuality.next(dialogData.data as Quality);
        break;
      }
      case "color": {
        this._createColor.next(dialogData.data as Color);
        break;
      }
      case "category": {
        this._createCategory.next(dialogData.data as Category);
        break;
      }
      case "yarnGroup": {
        this._createYarnGroup.next(dialogData.data as YarnGroup);
        break;
      }
      case "hsnCode": {
        this._createHsnCode.next(dialogData.data as Hsn);
        break;
      }
    }
  }

  addNew(type: string) {
    switch (type) {
      case "yarnType": {
        this.openAddDialog(YarnTypeAddDialogComponent);
        break;
      }
      case "quality": {
        this.openAddDialog(QualityAddDialogComponent, { yarnTypeList: this.yarnTypeList });
        break;
      }
      case "color": {
        this.openAddDialog(ColorAddDialogComponent);
        break;
      }
      case "category": {
        this.openAddDialog(YarnCategoryAddDialogComponent);
        break;
      }
      case "yarnGroup": {
        this.openAddDialog(YarnGroupAddDialogComponent);
        break;
      }
      case "hsnCode": {
        this.openAddDialog(HsnAddDialogComponent, { gstList: this.gstRateList } as HsnDialogData);
        break;
      }
    }
  }

  createNewYarn(formValue: YarnForm) {
    let createYarnObj: CreateYarnDto = {
      yarn_code: formValue.yarn_code,
      yarn_desc: formValue.yarn_desc,
      twist: formValue.yarn_twist,
      gryOrGey: formValue.gry_dye,
      yarn_type_id: Number(formValue.yarn_type),
      ply: Number(formValue.yarn_ply),
      rate: Number(formValue.yarn_rate),
      count: Number(formValue.yarn_count),
      eng_count: Number(formValue.eng_count),
      denier: Number(formValue.denier),
      quality_id: Number(formValue.yarn_qly),
      color_id: Number(formValue.yarn_color),
      ctgr_id: Number(formValue.yarn_category),
      group_id: Number(formValue.yarn_group),
      hsn_id: Number(formValue.hsn_code),
    }

    this._createYarn.next(createYarnObj);
  }

  updateYarn(formValue: YarnForm, id: number) {
    let upadteYarnObj: UpdateYarnDto = {
      id,
      yarn_code: formValue.yarn_code,
      yarn_desc: formValue.yarn_desc,
      twist: formValue.yarn_twist,
      gryOrGey: formValue.gry_dye,
      yarn_type_id: Number(formValue.yarn_type),
      ply: Number(formValue.yarn_ply),
      rate: Number(formValue.yarn_rate),
      count: Number(formValue.yarn_count),
      eng_count: Number(formValue.eng_count),
      denier: Number(formValue.denier),
      quality_id: Number(formValue.yarn_qly),
      color_id: Number(formValue.yarn_color),
      ctgr_id: Number(formValue.yarn_category),
      group_id: Number(formValue.yarn_group),
      hsn_id: Number(formValue.hsn_code),
    }

    this._updateYarn.next(upadteYarnObj);
  }
}

