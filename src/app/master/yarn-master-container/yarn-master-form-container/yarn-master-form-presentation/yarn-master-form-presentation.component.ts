import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { YarnMasterFormPresenterService } from '../yarn-master-form-presenter/yarn-master-form-presenter.service';
import { Category } from 'src/app/master/model/category.model';
import { Color } from 'src/app/master/model/color.model';
import { Gst } from 'src/app/master/model/gst.model';
import { CreateHsnDto, Hsn } from 'src/app/master/model/hsn.model';
import { CreateQualityDto, Quality } from 'src/app/master/model/quality.model';
import { YarnGroup } from 'src/app/master/model/yarn-group.model';
import { YarnType } from '../../../model/yarn-type.model';
import { YarnTwist, yarnTwist } from 'src/app/master/constants/yarntwist';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YarnTypeCountEnum, YarnTypeEnum } from 'src/app/master/constants/enums/yarn-type.enum';
import { DENIERCONST, LINENCONSTANT, WOOLCONSTANT } from 'src/app/master/constants/master_constants';
import { YarnGryDyeEnum } from 'src/app/master/constants/enums/yarn-gry-dye.enum';
import { CreateYarnDto, UpdateYarnDto } from 'src/app/master/model/yarn-add-req.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { YarnMaster } from 'src/app/master/model/yarn-master.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';

@Component({
  selector: 'app-yarn-master-form-presentation',
  templateUrl: './yarn-master-form-presentation.component.html',
  viewProviders: [YarnMasterFormPresenterService],
})
export class YarnMasterFormPresentationComponent implements OnInit, OnDestroy {

  @Input() public set yarn(yarn: YarnMaster | null) {
    if (yarn) {
      this._yarn = yarn;
    }
  }

  @Input() public set yarnTypeRes(res: YarnType[] | null) {
    if (res) {
      this._yarnTypeList = res;
      this.yarnTypeLoading = false;
    }
  }

  @Input() public set qualityList(qualitys: Quality[] | null) {
    if (qualitys) {
      this._qualityList = qualitys;
      this._filteredQualityList = qualitys;
      this.yarnQualityLoading = false;
      if (this.selectedYarnType) {
        this.filterQualityList(this.selectedYarnType.id as number)
      }
      if (this.yarn && this.isEditMode) {
        this.filterQualityList(this.yarn.yarn_type.id as number)
      }
    }
  }

  @Input() public set colorList(colors: Color[] | null) {
    if (colors) {
      this._colorList = colors;
      this.yarnColorLoading = false;
    }
  }

  @Input() public set categoryList(categorys: Category[] | null) {
    if (categorys) {
      this._categoryList = categorys;
      this.yarnCategoryLoading = false;
    }
  }

  @Input() public set yarnGroup(yarnGroups: YarnGroup[] | null) {
    if (yarnGroups) {
      this._yarnGroupList = yarnGroups;
      this.yarnGroupLoading = false;
    }
  }

  @Input() public set hsnCodeList(hsnlist: Hsn[] | null) {
    if (hsnlist) {
      this._hsnCodeList = hsnlist;
      this.yarnHsnLoading = false;
    }
  }

  @Input() public set gstRateList(gstRateList: Gst[] | null) {
    if (gstRateList) {
      this._gstRateList = gstRateList;
      this._yarnMasterFormPresenter.gstRateList = gstRateList;
    }
  }

  @Output() public cancel: EventEmitter<boolean>;
  @Output() public createYarn: EventEmitter<CreateYarnDto>;
  @Output() public updateYarn: EventEmitter<UpdateYarnDto>;
  @Output() public createYarnType: EventEmitter<YarnType>;
  @Output() public createQuality: EventEmitter<CreateQualityDto>;
  @Output() public createColor: EventEmitter<Color>;
  @Output() public createCategory: EventEmitter<Category>;
  @Output() public createYarnGroup: EventEmitter<YarnGroup>;
  @Output() public createHsnCode: EventEmitter<CreateHsnDto>;

  private _createYarnSub: Subscription;
  private _updateYarnSub: Subscription;
  private _createYarnTypeSub: Subscription;
  private _createQualitySub: Subscription;
  private _createColorSub: Subscription;
  private _createCategorySub: Subscription;
  private _createYarnGroupSub: Subscription;
  private _createHsnSub: Subscription;
  //form control obs subscriptions
  private _yarn_typeSub: Subscription;
  private _yarn_countSub: Subscription;
  private _yarn_plySub: Subscription;
  private _yarn_qlySub: Subscription;
  private _yarn_twistSub: Subscription;
  private _yarn_colorSub: Subscription;
  private _yarn_engCountSub: Subscription;

  private _yarn: YarnMaster;
  public get yarn(): YarnMaster {
    return this._yarn;
  }

  private _yarnTypeList: YarnType[];
  public get yarnTypeList(): YarnType[] {
    return this._yarnTypeList;
  }

  private _qualityList: Quality[];
  public get qualityList(): Quality[] {
    return this._qualityList;
  }

  private _filteredQualityList: Quality[];
  public get filteredQualityList(): Quality[] {
    return this._filteredQualityList;
  }

  private _colorList: Color[];
  public get colorList(): Color[] {
    return this._colorList;
  }

  private _categoryList: Category[];
  public get categoryList(): Category[] {
    return this._categoryList;
  }

  private _yarnGroupList: YarnGroup[];
  public get yarnGroupList(): YarnGroup[] {
    return this._yarnGroupList;
  }

  private _plyCountList: number[];
  get plyCountList(): number[] {
    return this._plyCountList;
  }

  private _twistList: YarnTwist[];
  get twistList(): YarnTwist[] {
    return this._twistList;
  }

  private _hsnCodeList: Hsn[];
  get hsnCodeList(): Hsn[] {
    return this._hsnCodeList;
  }

  private _gstRateList: Gst[];
  get gstRateList(): Gst[] {
    return this._gstRateList;
  }

  private _yarnCode: string;

  isEditMode: boolean;
  yarnForm: FormGroup;
  selectedYarnType: YarnType;
  selectedColor: Color;
  selectedQuality: Quality;
  YarnTypeCountEnum = YarnTypeCountEnum;
  YarnTypeEnum = YarnTypeEnum;
  YarnGryDyeEnum = YarnGryDyeEnum;

  yarnTypeLoading: boolean = false;
  yarnQualityLoading: boolean = false;
  yarnColorLoading: boolean = false;
  yarnCategoryLoading: boolean = false;
  yarnGroupLoading: boolean = false;
  yarnHsnLoading: boolean = false;

  constructor(
    private _yarnMasterFormPresenter: YarnMasterFormPresenterService,
    private _fb: FormBuilder,
  ) {
    this.isEditMode = false;


    this._yarnTypeList = [];
    this._qualityList = [];
    this._colorList = [];
    this._categoryList = [];
    this._yarnGroupList = [];
    this._hsnCodeList = [];
    this._gstRateList = [];
    this._plyCountList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this._twistList = yarnTwist;

    this.cancel = new EventEmitter<boolean>();
    this.createYarn = new EventEmitter<CreateYarnDto>();
    this.updateYarn = new EventEmitter<UpdateYarnDto>();
    this.createYarnType = new EventEmitter<YarnType>();
    this.createQuality = new EventEmitter<CreateQualityDto>();
    this.createColor = new EventEmitter<Color>();
    this.createCategory = new EventEmitter<Category>();
    this.createYarnGroup = new EventEmitter<YarnGroup>();
    this.createHsnCode = new EventEmitter<CreateHsnDto>();
  }

  ngOnInit(): void {
    if (this.yarn) {
      this.isEditMode = true;
    }
    this.startLoaders();
    this.yarnForm = this.isEditMode ? this.buildYarnForm(this.yarn) : this.buildYarnForm();
    this.yarnCodeObs()
    this._props();
  }

  startLoaders() {
    this.yarnTypeLoading = true;
    this.yarnQualityLoading = true;
    this.yarnColorLoading = true;
    this.yarnCategoryLoading = true;
    this.yarnGroupLoading = true;
    this.yarnHsnLoading = true;
  }

  ngOnDestroy(): void {
    this._updateYarnSub?.unsubscribe();
    this._createYarnSub?.unsubscribe();
    this._createYarnTypeSub?.unsubscribe();
    this._createQualitySub?.unsubscribe();
    this._createColorSub?.unsubscribe();
    this._createCategorySub?.unsubscribe();
    this._createYarnGroupSub?.unsubscribe();
    this._createHsnSub?.unsubscribe();
    this._yarn_typeSub?.unsubscribe();
    this._yarn_countSub?.unsubscribe();
    this._yarn_plySub?.unsubscribe();
    this._yarn_qlySub.unsubscribe()
    this._yarn_twistSub?.unsubscribe();
    this._yarn_colorSub?.unsubscribe();
    this._yarn_engCountSub?.unsubscribe();
  }

  _props(): void {

    this._createYarnSub = this._yarnMasterFormPresenter.createYarn$.subscribe({
      next: (yarn: CreateYarnDto) => {
        this.createYarn.emit(yarn)
      }
    })

    this._updateYarnSub = this._yarnMasterFormPresenter.updateYarn$.subscribe({
      next: (updatedYarn: UpdateYarnDto) => {
        this.updateYarn.emit(updatedYarn)
      }
    })

    this._createYarnTypeSub = this._yarnMasterFormPresenter.createYarnType$.subscribe({
      next: (yarnType: YarnType) => {
        this.createYarnType.emit(yarnType);
        this.yarnTypeLoading = true;
      }
    });

    this._createQualitySub = this._yarnMasterFormPresenter.createQuality$.subscribe({
      next: (quality: CreateQualityDto) => {
        this.createQuality.emit(quality);
        this.yarnQualityLoading = true;
      }
    })

    this._createColorSub = this._yarnMasterFormPresenter.createColor$.subscribe({
      next: (color: Color) => {
        this.createColor.emit(color);
        this.yarnColorLoading = true;
      }
    })

    this._createCategorySub = this._yarnMasterFormPresenter.createCategory$.subscribe({
      next: (category: Category) => {
        this.createCategory.emit(category);
        this, this.yarnCategoryLoading = true;
      }
    })

    this._createYarnGroupSub = this._yarnMasterFormPresenter.createYarnGroup$.subscribe({
      next: (yarnGroup: YarnGroup) => {
        this.createYarnGroup.emit(yarnGroup);
        this.yarnGroupLoading = true;
      }
    })

    this._createHsnSub = this._yarnMasterFormPresenter.createHsnCode$.subscribe({
      next: (hsnCode: CreateHsnDto) => {
        this.createHsnCode.emit(hsnCode);
        this.yarnHsnLoading = true;
      }
    })

  }

  /**
   * build the yarn from group
   * @returns yarn form group
   */
  buildYarnForm(yarnData?: YarnMaster): FormGroup {
    return this._fb.group({
      yarn_code: [{
        value: yarnData?.yarn_code ? yarnData?.yarn_code : null,
        disabled: true,
      }, Validators.required],
      yarn_desc: [{
        value: yarnData?.yarn_desc ? yarnData?.yarn_desc : null,
        disabled: this.isEditMode ? true : false,
      }, Validators.required],
      yarn_type: [{
        value: yarnData?.yarn_type?.id ? yarnData?.yarn_type?.id : null,
        disabled: this.isEditMode ? true : false,
      }, Validators.required],
      yarn_ply: [{
        value: yarnData?.ply ? yarnData?.ply : null,
        disabled: this.isEditMode ? true : false,
      }, Validators.required],
      yarn_count: [{
        value: yarnData?.count ? yarnData?.count : null,
        disabled: this.isEditMode ? true : false,
      }, Validators.required],
      yarn_qly: [{
        value: yarnData?.quality?.id ? yarnData?.quality?.id : null,
        disabled: this.isEditMode ? true : false,
      }, Validators.required],
      yarn_twist: [{
        value: yarnData?.twist ? yarnData?.twist : null,
        disabled: this.isEditMode ? true : false,
      }, Validators.required],
      yarn_color: [{
        value: yarnData?.color?.id ? yarnData?.color?.id : null,
        disabled: this.isEditMode ? true : false,
      }, Validators.required],
      eng_count: [{
        value: yarnData?.eng_count ? yarnData?.eng_count : null,
        disabled: yarnData?.yarn_type?.type ? this.isEngCountControlToDisable(yarnData?.yarn_type?.type as string) : false,
      }, Validators.required],
      denier: [{
        value: yarnData?.denier ? yarnData?.denier : null,
        disabled: yarnData?.yarn_type?.type ? this.isDenierControlToDisable(yarnData?.yarn_type?.type as string) : false,
      }, Validators.required],
      gry_dye: [{
        value: yarnData?.gryOrDey ? yarnData?.gryOrDey : 1,
        disabled: false,
      }, Validators.required],
      yarn_category: [{
        value: yarnData?.category?.id ? yarnData?.category?.id : null,
        disabled: false,
      }, Validators.required],
      yarn_group: [{
        value: yarnData?.group?.id ? yarnData?.group?.id : null,
        disabled: false,
      }, Validators.required],
      hsn_code: [{
        value: yarnData?.hsn?.id ? yarnData?.hsn?.id : null,
        disabled: false,
      }, Validators.required],
      yarn_rate: [{
        value: yarnData?.rate ? yarnData.rate : null,
        disabled: false,
      }, Validators.required],
    })

  }

  public get getControls() {
    return this.yarnForm['controls'];
  }

  filterQualityList(typeId: number) {
    if (typeId) {
      this._filteredQualityList = this.qualityList.filter((el) => {
        let eltype = el.type as YarnType;
        return eltype.id === typeId;
      });
    }
  }

  yarnCodeObs() {
    this._yarn_typeSub = this.getControls['yarn_type'].valueChanges.subscribe((typeId: number) => {
      this.generateYarnCode();
      this.generateYarnDesc();
      this.filterQualityList(typeId)
      this.getControls['yarn_qly'].setValue(null);
      this.calculateEngCount();
    })

    this._yarn_plySub = this.getControls['yarn_ply'].valueChanges.subscribe(() => {
      this.generateYarnCode();
      this.generateYarnDesc();
      this.calculateEngCount();
    })

    this._yarn_countSub = this.getControls['yarn_count'].valueChanges.subscribe(() => {
      this.generateYarnCode();
      this.generateYarnDesc();
      this.calculateEngCount()
    })

    this._yarn_qlySub = this.getControls['yarn_qly'].valueChanges.subscribe(() => {
      this.generateYarnCode();
      this.generateYarnDesc();
    })

    this._yarn_twistSub = this.getControls['yarn_twist'].valueChanges.subscribe(() => {
      this.generateYarnCode();
    })

    this._yarn_colorSub = this.getControls['yarn_color'].valueChanges.subscribe(() => {
      this.generateYarnCode();
      this.generateYarnDesc();
    })

    this._yarn_engCountSub = this.getControls['eng_count'].valueChanges.subscribe((egCount: number) => {
      if (egCount) {
        this.calculateDiner(egCount);
      }
      if (egCount === null) {
        this.getControls['denier'].setValue(null)
      }
    })

  }

  generateYarnCode() {
    let type = this.getControls['yarn_type']?.value ? this.getYarnType(this.getControls['yarn_type']?.value) : '';
    let ply = this.getControls['yarn_ply']?.value ? String(this.getControls['yarn_ply']?.value) : '';
    let count = this.getControls['yarn_count']?.value ? String(this.getControls['yarn_count']?.value).padStart(4, '0') : '';
    let qly = this.getControls['yarn_qly']?.value ? String(this.getControls['yarn_qly']?.value).padStart(3, '0') : '';
    let twist = this.getControls['yarn_twist']?.value ? String(this.getControls['yarn_twist']?.value) : '';
    let colorsrt = this.getControls['yarn_color']?.value ? this.getColorShortName(this.getControls['yarn_color']?.value) : '';
    this._yarnCode = type + ply + count + qly + twist + colorsrt;
    this.getControls['yarn_code'].setValue(this._yarnCode.trim());
  }

  generateYarnDesc() {
    let count = this.getControls['yarn_count']?.value ? String(this.getControls['yarn_count']?.value) : '';
    let ply = this.getControls['yarn_ply']?.value ? String(this.getControls['yarn_ply']?.value) : '';
    let qlDesc = this.getControls['yarn_qly']?.value ? this.getQualityDesc(this.getControls['yarn_qly']?.value) : '';
    let colorsrt = this.getControls['yarn_color']?.value ? this.getColorShortName(this.getControls['yarn_color']?.value) : '';

    let yarn_desc = count + `${ply ? `${count ? '\/' : ''}` + ply : ''}` + ` ${qlDesc} ` + `${colorsrt ? ' <' + colorsrt + '> ' : ''}`;

    this.getControls['yarn_desc'].setValue(yarn_desc.trim());
  }

  getYarnType(id: number): string {
    if (this.selectedYarnType && this.selectedYarnType.id === id) {
      return this.selectedYarnType?.type;
    }
    this.selectedYarnType = this._yarnTypeList.find((el: YarnType) => el.id === id) as YarnType;
    return this.selectedYarnType?.type;
  }

  getYarnTypeDesc(id: number): string {
    if (this.selectedYarnType && this.selectedYarnType?.id === id) {
      return this.selectedYarnType?.type_desc;
    }
    this.selectedYarnType = this._yarnTypeList.find((el: YarnType) => el.id === id) as YarnType;
    return this.selectedYarnType?.type_desc;
  }

  getColorShortName(id: number): string {
    if (this.selectedColor && this.selectedColor?.id === id) {
      return this.selectedColor?.color_code;
    }
    this.selectedColor = this._colorList.find((el: Color) => el.id === id) as Color;
    return this.selectedColor?.color_code;
  }

  getQualityDesc(id: number): string {
    if (this.selectedQuality && this.selectedQuality?.id === id) {
      return this.selectedQuality?.quality_desc;
    }
    this.selectedQuality = this._qualityList.find((el: Quality) => el.id === id) as Quality;
    return this.selectedQuality?.quality_desc;
  }

  calculateEngCount() {
    if (!this.getControls['yarn_count'].valid) {
      this.getControls['eng_count'].setValue(null);
      return;
    }
    if (!this.getControls['yarn_type'].valid) {
      this.getControls['yarn_type'].markAsTouched();
      return;
    }
    if (!this.getControls['yarn_ply'].valid) {
      this.getControls['yarn_ply'].markAsTouched();
      return;
    }

    const count: number = Number(this.getControls['yarn_count'].value);

    if (count === 0) {
      this.getControls['eng_count'].setValue("0");
      return;
    }
    const ply: number = Number(this.getControls['yarn_ply'].value);

    if (this.selectedYarnType) {
      switch (this.selectedYarnType.type) {
        case YarnTypeEnum.COTTON: {
          const eng_count: number = count / ply;
          this.getControls['eng_count'].setValue(parseFloat(eng_count.toFixed(4)));
          break;
        }
        case YarnTypeEnum.LINEN: {
          const eng_count: number = (count * LINENCONSTANT) / ply;
          this.getControls['eng_count'].setValue(parseFloat(eng_count.toFixed(4)));
          break;
        }
        case YarnTypeEnum.WOOL: {
          const eng_count: number = (count / ply) * WOOLCONSTANT;
          this.getControls['eng_count'].setValue(parseFloat(eng_count.toFixed(4)));
          break;
        }
        case YarnTypeEnum.BLENDYARN:
        case YarnTypeEnum.FANCY:
        case YarnTypeEnum.JUTE:
        case YarnTypeEnum.LYCRA:
        case YarnTypeEnum.NYLON:
        case YarnTypeEnum.OTHERYARN:
        case YarnTypeEnum.POYESTER:
        case YarnTypeEnum.RAYONVISOSE:
        case YarnTypeEnum.TEXTURE:
        case YarnTypeEnum.TEXTYARN:
        case YarnTypeEnum.VISCOSERAYON: {
          const eng_count: number = DENIERCONST / (count * ply);
          this.getControls['eng_count'].setValue(parseFloat(eng_count.toFixed(4)));
          this.getControls['eng_count'].disable({
            onlySelf: true,
            emitEvent: true,
          })
          break;
        }
      }
    }
  }

  calculateDiner(egCount: number) {
    if (!this.getControls['yarn_count'].valid) {
      this.getControls['denier'].setValue(null);
      return;
    }
    if (Number(egCount) === 0) {
      this.getControls['denier'].setValue("0")
      return;
    }
    if (this.selectedYarnType) {
      switch (this.selectedYarnType.type) {
        case YarnTypeEnum.COTTON:
        case YarnTypeEnum.LINEN:
        case YarnTypeEnum.WOOL: {
          const denier: number = DENIERCONST / egCount;
          this.getControls['denier'].setValue(parseFloat(denier.toFixed(4)));
          this.getControls['denier'].disable({
            onlySelf: true,
            emitEvent: true,
          });
          break;
        }
        case YarnTypeEnum.BLENDYARN:
        case YarnTypeEnum.FANCY:
        case YarnTypeEnum.JUTE:
        case YarnTypeEnum.LYCRA:
        case YarnTypeEnum.NYLON:
        case YarnTypeEnum.OTHERYARN:
        case YarnTypeEnum.POYESTER:
        case YarnTypeEnum.RAYONVISOSE:
        case YarnTypeEnum.TEXTURE:
        case YarnTypeEnum.TEXTYARN:
        case YarnTypeEnum.VISCOSERAYON: {
          const count: number = this.getControls['yarn_count'].value;
          const denier: number = count;
          this.getControls['denier'].setValue(parseFloat(Number(denier).toFixed(4)));
          break;
        }
      }
    }
  }

  isDenierControlToDisable(yarn_type: string): boolean {
    let toDisable: boolean = false;
    switch (yarn_type) {
      case (YarnTypeEnum.COTTON ||
        YarnTypeEnum.LINEN ||
        YarnTypeEnum.WOOL): {
          toDisable = true;
          break;
        }
      case (YarnTypeEnum.BLENDYARN ||
        YarnTypeEnum.FANCY ||
        YarnTypeEnum.JUTE ||
        YarnTypeEnum.LYCRA ||
        YarnTypeEnum.NYLON ||
        YarnTypeEnum.OTHERYARN ||
        YarnTypeEnum.POYESTER ||
        YarnTypeEnum.RAYONVISOSE ||
        YarnTypeEnum.TEXTURE ||
        YarnTypeEnum.TEXTYARN ||
        YarnTypeEnum.VISCOSERAYON): {
          toDisable = false;
          break;
        }
    }
    return toDisable;
  }

  isEngCountControlToDisable(yarn_type: string): boolean {
    let toDisable: boolean = false;
    switch (yarn_type) {
      case (YarnTypeEnum.COTTON ||
        YarnTypeEnum.LINEN ||
        YarnTypeEnum.WOOL): {
          toDisable = false;
          break;
        }
      case (YarnTypeEnum.BLENDYARN ||
        YarnTypeEnum.FANCY ||
        YarnTypeEnum.JUTE ||
        YarnTypeEnum.LYCRA ||
        YarnTypeEnum.NYLON ||
        YarnTypeEnum.OTHERYARN ||
        YarnTypeEnum.POYESTER ||
        YarnTypeEnum.RAYONVISOSE ||
        YarnTypeEnum.TEXTURE ||
        YarnTypeEnum.TEXTYARN ||
        YarnTypeEnum.VISCOSERAYON): {
          toDisable = true;
          break;
        }
    }
    return toDisable;
  }

  openAddNew(type: string) {
    this._yarnMasterFormPresenter.addNew(type)
  }

  saveYarn() {
    if (this.yarnForm.valid) {
      this.isEditMode ? this._yarnMasterFormPresenter.updateYarn(this.yarnForm.getRawValue(), this.yarn.id) : this._yarnMasterFormPresenter.createNewYarn(this.yarnForm.getRawValue())
    } else {
      this.yarnForm.markAllAsTouched();
    }
  }

  close() {
    // setTimeout(() => {
    this.cancel.emit(true);
    // }, 300)
  }
}
