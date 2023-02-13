import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { UtitityService } from 'src/app/shared/services/utitity.service';
import { Category } from '../model/category.model';
import { Color } from '../model/color.model';
import { Quality } from '../model/quality.model';
import { CreateYarnDto, UpdateYarnDto } from '../model/yarn-add-req.model';
import { YarnGroup } from '../model/yarn-group.model';
import { YarnMaster } from '../model/yarn-master.model';
import { YarnType } from '../model/yarn-type.model';
import { YarnMasterService } from '../services/yarn-master.service';

@Component({
  selector: 'app-yarn-master-container',
  templateUrl: './yarn-master-container.component.html',
})
export class YarnMasterContainerComponent implements OnInit {

  yarnsList$: Observable<PaginateResponse<YarnMaster[]>>;
  yarnTypesList$: Observable<PaginateResponse<YarnType[]>>;
  qualityList$: Observable<Quality[]>;
  colorList$: Observable<Color[]>;
  categoryList$: Observable<Category[]>;
  yarnGroupList$: Observable<YarnGroup[]>;

  constructor(private _yarnMasterService: YarnMasterService, private _utilityService: UtitityService) {
    this.yarnsList$ = new Observable<PaginateResponse<YarnMaster[]>>
  }

  ngOnInit(): void {
    this._props();
  }

  _props(): void {
    this.getAllYarns();
    this.getYarnTypes(1);
    this.getQuality();
    this.getAllColors();
    this.getAllCategory();
    this.getAllYarnGroup();
  }

  getAllYarns(page?: number, search?: string) {
    this.yarnsList$ = this._yarnMasterService.getAllYarns(page, search);
  }

  createYarn(yarn: CreateYarnDto) {
    this._yarnMasterService.createYarn(yarn).subscribe({
      next: (res) => {
        this.getAllYarns();
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  updateYarn(updatedYarn: UpdateYarnDto) {
    this._yarnMasterService.updateYarn(updatedYarn).subscribe({
      next: (res) => {
        this.getAllYarns();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeYarn(yarn_id: number) {
    this._yarnMasterService.removeYarn(yarn_id).subscribe({
      next: (res) => {
        this.getAllYarns();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //yarn type
  getYarnTypes(page?: number, search?: string): void {
    this.yarnTypesList$ = this._yarnMasterService.getAllYarnType(page, search);
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


  createQuality(quality: Quality): void {
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

}
