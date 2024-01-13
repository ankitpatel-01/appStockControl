import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Unit, CreateUnitDto } from 'src/app/master/model/unit.model';

@Component({
  selector: 'app-unit-master-form-presentation',
  templateUrl: './unit-master-form-presentation.component.html',
})
export class UnitMasterFormPresentationComponent implements OnInit {

  @Input() public set unit(v: Unit) {
    if (v) {
      this._unit = v;
      this.isEditMode = true;
    }
  }
  @Output() save: EventEmitter<CreateUnitDto>
  @Output() cancel: EventEmitter<boolean>

  public isEditMode: boolean;
  public unitForm: FormGroup;

  private _unit: Unit;
  public get unit(): Unit {
    return this._unit;
  }

  constructor(private _fb: FormBuilder) {
    this.isEditMode = false;
    this.save = new EventEmitter<CreateUnitDto>();
    this.cancel = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.unitForm = this.buildUnitForm();
  }

  buildUnitForm() {
    return this._fb.group({
      unit_name: [{
        value: this.unit?.unit_name ? this.unit.unit_name : null,
        disabled: false
      }, Validators.required],

      unit_desc: [{
        value: this.unit?.unit_desc ? this.unit.unit_desc : null,
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.unitForm['controls'];
  }

  close() {
    this.cancel.emit(true)
  }

  saveClick() {
    if (this.unitForm.valid) {
      const formValue: CreateUnitDto = {
        unit_name: this.getControls['unit_name'].value,
        unit_desc: this.getControls['unit_desc'].value,
      }
      this.save.emit(formValue);
    }
    else {
      this.unitForm.markAllAsTouched();
    }
  }

}
