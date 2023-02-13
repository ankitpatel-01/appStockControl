import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogData } from 'src/app/master/model/dialog-data.model';
import { YarnType } from 'src/app/master/model/yarn-type.model';

@Component({
  selector: 'app-quality-add-dialog',
  templateUrl: './quality-add-dialog.component.html',
})
export class QualityAddDialogComponent implements OnInit {

  qualityForm: FormGroup;

  private _yarnTypeList: YarnType[];
  get yarnTypeList(): YarnType[] {
    return this._yarnTypeList;
  }

  constructor(public dialogRef: DialogRef<DialogData>, @Inject(DIALOG_DATA) public data: any,
    private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this._yarnTypeList = this.data.yarnTypeList;
    this.qualityForm = this.buildQualityForm();
  }

  buildQualityForm() {
    return this._fb.group({
      quality_desc: [{
        value: '',
        disabled: false
      }, Validators.required],

      type: [{
        value: '',
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.qualityForm['controls'];
  }

  close() {
    this.dialogRef.close()
  }

  save() {
    if (this.qualityForm.valid)
      this.dialogRef.close({ type: 'quality', isSave: true, data: this.qualityForm.value })
    else
      this.qualityForm.markAllAsTouched();
  }

}
