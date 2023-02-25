import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YarnType } from 'src/app/master/model/yarn-type.model';

@Component({
  selector: 'app-yarn-type-form-presentation',
  templateUrl: './yarn-type-form-presentation.component.html',
})
export class YarnTypeFormPresentationComponent implements OnInit {



  @Input() public set yarnType(v: YarnType) {
    if (v) {
      this._yarnType = v;
      this.isEditMode = true;
    }
  }

  @Output() save: EventEmitter<YarnType>
  @Output() cancel: EventEmitter<boolean>

  public isEditMode: boolean;
  public yarnTypeFrom: FormGroup;

  private _yarnType: YarnType;
  public get yarnType(): YarnType {
    return this._yarnType;
  }

  constructor(private _fb: FormBuilder) {
    this.isEditMode = false;
    this.save = new EventEmitter<YarnType>();
    this.cancel = new EventEmitter<boolean>();

  }

  ngOnInit(): void {
    this.yarnTypeFrom = this.buildYarnTypeForm();
  }

  buildYarnTypeForm() {
    return this._fb.group({
      type_desc: [{
        value: this.yarnType?.type_desc ? this.yarnType?.type_desc : '',
        disabled: false
      }, Validators.required],

      type: [{
        value: this.yarnType?.type ? this.yarnType?.type : '',
        disabled: false
      }, Validators.required],

      count_type: [{
        value: this.yarnType?.count_type ? this.yarnType?.count_type : '',
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.yarnTypeFrom['controls'];
  }

  close() {
    this.cancel.emit(true)
  }

  saveClick() {
    if (this.yarnTypeFrom.valid)
      this.save.emit(this.yarnTypeFrom.value)
    else
      this.yarnTypeFrom.markAllAsTouched();
  }

}
