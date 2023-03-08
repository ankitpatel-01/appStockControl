import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { EventService } from 'src/app/shared/services/event.service';
import { UtitityService } from 'src/app/shared/services/utitity.service';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../model/category.model';
import { Color, CreateColorDto, UpdateColorDto } from '../model/color.model';
import { CreateQualityDto, Quality, UpdateQualityDto } from '../model/quality.model';
import { CreateYarnDto, UpdateYarnDto } from '../model/yarn-add-req.model';
import { CreateYarnGroupDto, UpdateYarnGroupDto, YarnGroup } from '../model/yarn-group.model';
import { YarnMaster } from '../model/yarn-master.model';
import { YarnType } from '../model/yarn-type.model';
import { YarnMasterService } from '../services/yarn-master.service';

@Component({
  selector: 'app-yarn-master-container',
  templateUrl: './yarn-master-container.component.html',
})
export class YarnMasterContainerComponent implements OnInit, OnDestroy {
  private _currentPage: number;
  public searchString: string;
  yarnsList$: Observable<PaginateResponse<YarnMaster[]>>;
  yarnTypesListPaginated$: Observable<PaginateResponse<YarnType[]>>;
  yarnTypesList$: Observable<YarnType[]>;
  qualityListPaginated$: Observable<PaginateResponse<Quality[]>>;
  colorListPaginated$: Observable<PaginateResponse<Color[]>>;
  categoryListPaginated$: Observable<PaginateResponse<Category[]>>;
  yarnGroupListPaginated$: Observable<PaginateResponse<YarnGroup[]>>;

  //Subscriptions
  createYarnSub: Subscription;
  updateYarnSub: Subscription;
  removedYarnSub: Subscription;
  createYarnTypeSub: Subscription;
  updateYarnTypeSub: Subscription;
  removedYarnTypeSub: Subscription;
  createYarnQualitySub: Subscription;
  updateYarnQualitySub: Subscription;
  removedYarnQualitySub: Subscription;
  createYarnColorSub: Subscription;
  updateYarnColorSub: Subscription;
  removedYarnColorSub: Subscription;
  createYarnCategorySub: Subscription;
  updateYarnCategorySub: Subscription;
  removedYarnCategorySub: Subscription;
  createYarnGroupSub: Subscription;
  updateYarnGroupSub: Subscription;
  removedYarnGroupSub: Subscription;

  constructor(
    private _yarnMasterService: YarnMasterService,
    private _utilityService: UtitityService,
    private _loader: LoaderService,
    private _event: EventService
  ) {
    this.searchString = "";
    this.yarnsList$ = new Observable<PaginateResponse<YarnMaster[]>>();
    this.yarnTypesListPaginated$ = new Observable<PaginateResponse<YarnType[]>>();
    this.qualityListPaginated$ = new Observable<PaginateResponse<Quality[]>>();
    this.yarnTypesList$ = new Observable<YarnType[]>();
    this.colorListPaginated$ = new Observable<PaginateResponse<Color[]>>();
    this.categoryListPaginated$ = new Observable<PaginateResponse<Category[]>>();
    this.yarnGroupListPaginated$ = new Observable<PaginateResponse<YarnGroup[]>>();
  }

  ngOnDestroy(): void {
    this.createYarnSub?.unsubscribe();
    this.updateYarnSub?.unsubscribe();
    this.removedYarnSub?.unsubscribe();
    this.createYarnTypeSub?.unsubscribe();
    this.updateYarnTypeSub?.unsubscribe();
    this.removedYarnTypeSub?.unsubscribe();
    this.createYarnQualitySub?.unsubscribe();
    this.updateYarnQualitySub?.unsubscribe();
    this.removedYarnQualitySub?.unsubscribe();
    this.createYarnColorSub?.unsubscribe();
    this.updateYarnColorSub?.unsubscribe();
    this.removedYarnColorSub?.unsubscribe();
    this.createYarnCategorySub?.unsubscribe();
    this.updateYarnCategorySub?.unsubscribe();
    this.removedYarnCategorySub?.unsubscribe();
    this.createYarnGroupSub?.unsubscribe();
    this.updateYarnGroupSub?.unsubscribe();
    this.removedYarnGroupSub?.unsubscribe();
  }

  ngOnInit(): void {
    this._props();
  }

  _props(): void { }

  onTabChange(tabIndex: number) {
    if (tabIndex === 0) {
      this.getAllYarnPaginate(1);
      this._utilityService.resetSearchControl();
    }
    if (tabIndex === 1) {
      this.getYarnTypesPaginate(1);
      this._utilityService.resetSearchControl();
    }
    if (tabIndex === 2) {
      this.getQualityPaginate(1);
      this.getAllYarnTypes();
      this._utilityService.resetSearchControl();
    }
    if (tabIndex === 3) {
      this.getAllColorsPaginate();
      this._utilityService.resetSearchControl();
    }
    if (tabIndex === 4) {
      this.getCategoryPaginate();
      this._utilityService.resetSearchControl();
    }
    if (tabIndex === 5) {
      this.getAllYarnGroupPaginate();
      this._utilityService.resetSearchControl();
    }
  }

  getAllYarnPaginate(page: number = 1, search: string = "") {
    this._loader.startLoader('yarn');
    this._currentPage = page;
    this.searchString = search;
    this.yarnsList$ = this._yarnMasterService.getAllYarnsPaginate(page, search);
  }

  createYarn(yarn: CreateYarnDto) {
    this._loader.startLoader('yarn');
    this.createYarnSub = this._yarnMasterService.createYarn(yarn).subscribe({
      next: (res) => {
        this.getAllYarnPaginate(1);
        this._event.showSuccessSnackBar("yarn created sucessfully");
      },
      error: (err) => {
        this._loader.stopLoader('yarn');
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  updateYarn(updatedYarn: UpdateYarnDto) {
    this._loader.startLoader('yarn');
    this.updateYarnSub = this._yarnMasterService.updateYarn(updatedYarn).subscribe({
      next: (res) => {
        this.getAllYarnPaginate(this._currentPage);
        this._event.showSuccessSnackBar("yarn updated sucessfully");
      },
      error: (err) => {
        this._loader.stopLoader('yarn');
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  removeYarn(yarn: RemoveEmit) {
    this._loader.startLoader('yarn');
    this.removedYarnSub = this._yarnMasterService.removeYarn(yarn.id).subscribe({
      next: (res) => {
        yarn.length === 1 ? this._currentPage = 1 : this._currentPage;
        this.getAllYarnPaginate(this._currentPage);
        this._event.showSuccessSnackBar("yarn removed sucessfully");
      },
      error: (err) => {
        this._loader.stopLoader('yarn');
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  //yarn type
  getYarnTypesPaginate(page: number = 1, search: string = ""): void {
    this._loader.startLoader('yarnTypeList');
    this._currentPage = page;
    this.searchString = search;
    this.yarnTypesListPaginated$ = this._yarnMasterService.getAllYarnTypesPaginate(page, search);
  }

  removeYarnType(yarnType: RemoveEmit): void {
    this._loader.startLoader('yarnTypeList');
    this.removedYarnTypeSub = this._yarnMasterService.removeYarnType(yarnType.id).subscribe({
      next: (res) => {
        yarnType.length === 1 ? this._currentPage = 1 : this._currentPage;
        this.getYarnTypesPaginate(this._currentPage);
        this._event.showSuccessSnackBar("yarn type removed sucessfully");
      },
      error: (err) => {
        this._loader.stopLoader('yarnTypeList')
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

  createYarnTypes(yarnType: YarnType): void {
    this._loader.startLoader('yarnTypeList');
    this.createYarnTypeSub = this._yarnMasterService.createYarnTypes(yarnType).subscribe({
      next: (res) => {
        this.getYarnTypesPaginate(1);
        this._event.showSuccessSnackBar("yarn type created sucessfully");
      },
      error: (err) => {
        this._loader.stopLoader('yarnTypeList')
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

  updateYarnTypes(yarnType: YarnType): void {
    this._loader.startLoader('yarnTypeList');
    this.updateYarnTypeSub = this._yarnMasterService.updateYarnTypes(yarnType).subscribe({
      next: (res) => {
        this.getYarnTypesPaginate(this._currentPage);
        this._event.showSuccessSnackBar("yarn type updated sucessfully");
      },
      error: (err) => {
        this._loader.stopLoader('yarnTypeList')
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

  //quality
  getQualityPaginate(page: number = 1, search: string = ""): void {
    this._loader.startLoader('qulityList');
    this._currentPage = page;
    this.searchString = search;
    this.qualityListPaginated$ = this._yarnMasterService.getAllQualityPaginate(page, search);
  }

  getAllYarnTypes(): void {
    this.yarnTypesList$ = this._yarnMasterService.getAllYarnTypes()
  }

  createQuality(quality: CreateQualityDto): void {
    this._loader.startLoader('qulityList');
    this.createYarnQualitySub = this._yarnMasterService.createQuality(quality).subscribe({
      next: (res) => {
        this.getQualityPaginate(1);
        this._event.showSuccessSnackBar("yarn quality created sucessfully");
      },
      error: (err) => {
        this._loader.stopLoader('qulityList');
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

  updateQuality(quality: UpdateQualityDto): void {
    this._loader.startLoader('qulityList');
    this.updateYarnQualitySub = this._yarnMasterService.updateQuality(quality).subscribe({
      next: (res) => {
        this.getQualityPaginate(this._currentPage);
        this._event.showSuccessSnackBar("yarn quality updated sucessfully");
      },
      error: (err) => {
        this._loader.stopLoader('qulityList');
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

  removeQuality(quality: RemoveEmit): void {
    this._loader.startLoader('qulityList');
    this.removedYarnQualitySub = this._yarnMasterService.removeQuality(quality.id).subscribe({
      next: (res) => {
        quality.length === 1 ? this._currentPage = 1 : this._currentPage;
        this.getQualityPaginate(this._currentPage);
        this._event.showSuccessSnackBar("yarn quality removed sucessfully");
      },
      error: (err) => {
        this._loader.stopLoader('qulityList');
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

  //color
  getAllColorsPaginate(page: number = 1, search: string = ""): void {
    this._currentPage = page;
    this.searchString = search;
    this.colorListPaginated$ = this._yarnMasterService.getAllColorPaginate(page, search);
  }

  createColor(color: CreateColorDto): void {
    this.createYarnColorSub = this._yarnMasterService.createColor(color).subscribe({
      next: (res) => {
        this.getAllColorsPaginate(1);
        this._event.showSuccessSnackBar("yarn color created sucessfully");
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  updateColor(color: UpdateColorDto): void {
    this.createYarnColorSub = this._yarnMasterService.updateColor(color).subscribe({
      next: (res) => {
        this.getAllColorsPaginate(this._currentPage);
        this._event.showSuccessSnackBar("yarn color updated sucessfully");
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

  removeColor(color: RemoveEmit): void {
    this.removedYarnColorSub = this._yarnMasterService.removeColor(color.id).subscribe({
      next: (res) => {
        color.length === 1 ? this._currentPage = 1 : this._currentPage;
        this.getAllColorsPaginate(this._currentPage);
        this._event.showSuccessSnackBar("yarn color removed sucessfully");
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

  //category
  getCategoryPaginate(page: number = 1, search: string = ""): void {
    this._currentPage = page;
    this.searchString = search;
    this.categoryListPaginated$ = this._yarnMasterService.getAllCategoryPaginate(page, search);
  }

  createCategory(category: CreateCategoryDto): void {
    this.createYarnCategorySub = this._yarnMasterService.createCategory(category).subscribe({
      next: (res) => {
        this.getCategoryPaginate();
        this._event.showSuccessSnackBar("yarn category created sucessfully");
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  updateCategory(category: UpdateCategoryDto): void {
    this.updateYarnCategorySub = this._yarnMasterService.updateCategory(category).subscribe({
      next: (res) => {
        this.getCategoryPaginate(this._currentPage);
        this._event.showSuccessSnackBar("yarn category updated sucessfully");
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

  removeCategory(category: RemoveEmit): void {
    this.removedYarnCategorySub = this._yarnMasterService.removeCategory(category.id).subscribe({
      next: (res) => {
        category.length === 1 ? this._currentPage = 1 : this._currentPage;
        this.getCategoryPaginate(this._currentPage);
        this._event.showSuccessSnackBar("yarn category removed sucessfully");
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

  //yarn group
  getAllYarnGroupPaginate(page: number = 1, search: string = ""): void {
    this._currentPage = page;
    this.searchString = search;
    this.yarnGroupListPaginated$ = this._yarnMasterService.getAllYarnGroupPaginate(page, search);
  }

  createYarnGroup(yarnGroup: CreateYarnGroupDto): void {
    this.createYarnGroupSub = this._yarnMasterService.createYarnGroup(yarnGroup).subscribe({
      next: (res) => {
        this.getAllYarnGroupPaginate();
        this._event.showSuccessSnackBar("yarn group created sucessfully");
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    })
  }

  updateYarnGroup(yarnGroup: UpdateYarnGroupDto): void {
    this.updateYarnGroupSub = this._yarnMasterService.updateYarnGroup(yarnGroup).subscribe({
      next: (res) => {
        this.getAllYarnGroupPaginate(this._currentPage);
        this._event.showSuccessSnackBar("yarn group updated sucessfully");
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

  removeYarnGroup(yarnGroup: RemoveEmit): void {
    this.removedYarnColorSub = this._yarnMasterService.removeYarnGroup(yarnGroup.id).subscribe({
      next: (res) => {
        yarnGroup.length === 1 ? this._currentPage = 1 : this._currentPage;
        this.getAllYarnGroupPaginate(this._currentPage);
        this._event.showSuccessSnackBar("yarn group removed sucessfully");
      },
      error: (err) => {
        this._utilityService.openAlertDialog(err?.error?.error, err?.error?.message);
      }
    });
  }

}
