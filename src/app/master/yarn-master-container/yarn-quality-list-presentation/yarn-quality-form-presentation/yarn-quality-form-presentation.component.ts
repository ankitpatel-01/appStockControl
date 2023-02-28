import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// --------------------------------------------------------------------------------
import { CreateQualityDto, Quality } from 'src/app/master/model/quality.model';
import { YarnType } from 'src/app/master/model/yarn-type.model';

@Component({
  selector: 'app-yarn-quality-form-presentation',
  templateUrl: './yarn-quality-form-presentation.component.html',
})
export class YarnQualityFormPresentationComponent implements OnInit {

  @Input() public set quality(quality: Quality) {
    if (quality) {
      this._quality = quality;
      this.isEditMode = true;
    }
  }

  @Input() public set yarnTypeList(yarnTypeList: YarnType[]) {
    if (yarnTypeList) {
      this._yarnTypeList = yarnTypeList;
    }
  }

  @Output() save: EventEmitter<CreateQualityDto>
  @Output() cancel: EventEmitter<boolean>

  public qualityForm: FormGroup;
  public isEditMode: boolean;

  private _yarnTypeList: YarnType[];
  get yarnTypeList(): YarnType[] {
    return this._yarnTypeList;
  }

  private _quality: Quality;
  public get quality(): Quality {
    return this._quality;
  }

  constructor(private _fb: FormBuilder) {
    this.isEditMode = false;
    this.save = new EventEmitter<CreateQualityDto>();
    this.cancel = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.qualityForm = this.buildQualityForm();
  }

  buildQualityForm() {
    return this._fb.group({
      quality_desc: [{
        value: this.quality?.quality_desc ? this.quality.quality_desc : null,
        disabled: false
      }, Validators.required],

      type: [{
        value: this.quality?.type?.id ? this.quality?.type?.id : null,
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.qualityForm['controls'];
  }

  close() {
    this.cancel.emit(true)
  }

  saveClick() {
    if (this.qualityForm.valid) {
      this.save.emit(this.qualityForm.value);
    }
    else {
      this.qualityForm.markAllAsTouched();
    }
  }
}
