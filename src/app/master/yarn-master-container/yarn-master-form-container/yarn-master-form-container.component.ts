import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PaginateResponse } from 'src/app/shared/models/response.model';
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
export class YarnMasterFormContainerComponent implements OnInit {

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


  constructor(private _yarnMasterService: YarnMasterService) {
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
    this._yarnMasterService.createYarnTypes(yarnType).subscribe({
      next: (res) => {
        this.getYarnTypes();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  //quality
  getQuality(): void {
    this.qualityList$ = this._yarnMasterService.getAllQuality();
  }


  createQuality(quality: CreateQualityDto): void {
    this._yarnMasterService.createQuality(quality).subscribe({
      next: (res) => {
        this.getQuality();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  //color
  getAllColors(): void {
    this.colorList$ = this._yarnMasterService.getAllColor();
  }

  createColor(color: Color): void {
    this._yarnMasterService.createColor(color).subscribe({
      next: (res) => {
        this.getAllColors();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //category
  getAllCategory(): void {
    this.categoryList$ = this._yarnMasterService.getAllCategory();
  }

  createCategory(category: Category): void {
    this._yarnMasterService.createCategory(category).subscribe({
      next: (res) => {
        this.getAllCategory();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //yarn group
  getAllYarnGroup(): void {
    this.yarnGroupList$ = this._yarnMasterService.getAllYarnGroup();
  }

  createYarnGroup(yarnGroup: YarnGroup): void {
    this._yarnMasterService.createYarnGroup(yarnGroup).subscribe({
      next: (res) => {
        this.getAllYarnGroup();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //Hsn
  getAllHsnCode(): void {
    this.hsnCodeList$ = this._yarnMasterService.getAllHsnCode();
  }

  createHsnCode(hsnCode: CreateHsnDto): void {
    this._yarnMasterService.createHsnCode(hsnCode).subscribe({
      next: (res) => {
        this.getAllHsnCode();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //gst
  getAllGstRate(): void {
    this.gstRateList$ = this._yarnMasterService.getAllGstRate();
  }

  createGstRate(gstRate: Gst): void {
    this._yarnMasterService.createGstRate(gstRate).subscribe({
      next: (res) => {
        this.getAllGstRate();
      },
      error: (err) => {
        console.log(err);
      }
    })
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
