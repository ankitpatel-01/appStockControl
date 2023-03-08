import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { UtitityService } from 'src/app/shared/services/utitity.service';
import { Category } from '../../model/category.model';
import { Color } from '../../model/color.model';
import { Gst } from '../../model/gst.model';
import { CreateHsnDto, Hsn } from '../../model/hsn.model';
import { CreateQualityDto, Quality } from '../../model/quality.model';
import { CreateYarnDto, UpdateYarnDto } from '../../model/yarn-add-req.model';
import { YarnGroup } from '../../model/yarn-group.model';
import { YarnMaster } from '../../model/yarn-master.model';
import { YarnType } from '../../model/yarn-type.model';
import { YarnMasterService } from '../../services/yarn-master.service';

@Component({
  selector: 'app-yarn-master-form-container',
  templateUrl: './yarn-master-form-container.component.html',
})
export class YarnMasterFormContainerComponent implements OnInit, OnDestroy {

  yarnTypesList$: Observable<YarnType[]>;
  qualityList$: Observable<Quality[]>;
  colorList$: Observable<Color[]>;
  categoryList$: Observable<Category[]>;
  yarnGroupList$: Observable<YarnGroup[]>;
  hsnCodeList$: Observable<Hsn[]>;
  gstRateList$: Observable<Gst[]>;
  public cancel: EventEmitter<boolean>;
  public save: EventEmitter<CreateYarnDto>;
  public edit: EventEmitter<UpdateYarnDto>;


  private _yarnObj: YarnMaster;
  public get yarnObj(): YarnMaster {
    return this._yarnObj;
  }
  public set yarnObj(v: YarnMaster) {
    if (v) {
      this._yarnObj = v;
    }
  }

  //Subscription
  createYarnTypeSub: Subscription;
  createQualitySub: Subscription;
  createColorSub: Subscription;
  createCategorySub: Subscription;
  createGroupSub: Subscription;
  createHsnSub: Subscription;

  constructor(
    private _yarnMasterService: YarnMasterService,
    private _utilityService: UtitityService,
  ) {
    this.cancel = new EventEmitter<boolean>();
    this.save = new EventEmitter<CreateYarnDto>();
    this.edit = new EventEmitter<UpdateYarnDto>();
    this.yarnTypesList$ = new Observable<YarnType[]>;
    this.qualityList$ = new Observable<Quality[]>;
    this.colorList$ = new Observable<Color[]>;
    this.categoryList$ = new Observable<Category[]>;
    this.yarnGroupList$ = new Observable<YarnGroup[]>;
    this.hsnCodeList$ = new Observable<Hsn[]>;
    this.gstRateList$ = new Observable<Gst[]>;
  }

  ngOnDestroy(): void {
    this.createYarnTypeSub?.unsubscribe();
    this.createQualitySub?.unsubscribe();
    this.createColorSub?.unsubscribe();
    this.createCategorySub?.unsubscribe();
    this.createGroupSub?.unsubscribe();
    this.createHsnSub?.unsubscribe();
  }

  ngOnInit(): void {
    this._props();
  }

  _props(): void {
    this.getYarnTypes();
    this.getQuality();
    this.getAllColors();
    this.getAllCategory();
    this.getAllYarnGroup();
    this.getAllHsnCode();
    this.getAllGstRate();
  }

  //yarn type
  getYarnTypes(): void {
    this.yarnTypesList$ = this._yarnMasterService.getAllYarnTypes();
  }

  createYarnTypes(yarnType: YarnType): void {
    this.createYarnTypeSub = this._yarnMasterService.createYarnTypes(yarnType).subscribe({
      next: (res) => {
        this.getYarnTypes();
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

  //quality
  getQuality(): void {
    this.qualityList$ = this._yarnMasterService.getAllQuality();
  }


  createQuality(quality: CreateQualityDto): void {
    this.createQualitySub = this._yarnMasterService.createQuality(quality).subscribe({
      next: (res) => {
        this.getQuality();
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

  //color
  getAllColors(): void {
    this.colorList$ = this._yarnMasterService.getAllColor();
  }

  createColor(color: Color): void {
    this.createColorSub = this._yarnMasterService.createColor(color).subscribe({
      next: (res) => {
        this.getAllColors();
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  //category
  getAllCategory(): void {
    this.categoryList$ = this._yarnMasterService.getAllCategory();
  }

  createCategory(category: Category): void {
    this.createCategorySub = this._yarnMasterService.createCategory(category).subscribe({
      next: (res) => {
        this.getAllCategory();
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  //yarn group
  getAllYarnGroup(): void {
    this.yarnGroupList$ = this._yarnMasterService.getAllYarnGroup();
  }

  createYarnGroup(yarnGroup: YarnGroup): void {
    this.createCategorySub = this._yarnMasterService.createYarnGroup(yarnGroup).subscribe({
      next: (res) => {
        this.getAllYarnGroup();
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  //Hsn
  getAllHsnCode(): void {
    this.hsnCodeList$ = this._yarnMasterService.getAllHsnCode();
  }

  createHsnCode(hsnCode: CreateHsnDto): void {
    this.createHsnSub = this._yarnMasterService.createHsnCode(hsnCode).subscribe({
      next: (res) => {
        this.getAllHsnCode();
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  // gst
  getAllGstRate(): void {
    this.gstRateList$ = this._yarnMasterService.getAllGstRate();
  }

  saveClick(createYarn: CreateYarnDto) {
    this.save.emit(createYarn);
  }

  editClick(upadteYarn: UpdateYarnDto) {
    this.edit.emit(upadteYarn);
  }

  close(): void {
    this.cancel.emit(true);
  }

}
