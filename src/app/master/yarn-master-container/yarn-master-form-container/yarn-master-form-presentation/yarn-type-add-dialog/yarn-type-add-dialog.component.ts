import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogData } from 'src/app/master/model/dialog-data.model';
import { YarnType } from 'src/app/master/model/yarn-type.model';

@Component({
  selector: 'app-yarn-type-add-dialog',
  templateUrl: './yarn-type-add-dialog.component.html',
})
export class YarnTypeAddDialogComponent implements OnInit {

  yarnTypeFrom: FormGroup;

  constructor(public dialogRef: DialogRef<DialogData>, @Inject(DIALOG_DATA) public data: Object,
    private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.yarnTypeFrom = this.buildYarnTypeForm();
  }

  buildYarnTypeForm() {
    return this._fb.group({
      type_desc: [{
        value: '',
        disabled: false
      }, Validators.required],

      type: [{
        value: '',
        disabled: false
      }, Validators.required],

      count_type: [{
        value: '',
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.yarnTypeFrom['controls'];
  }

  close() {
    this.dialogRef.close()
  }

  save() {
    if (this.yarnTypeFrom.valid)
      this.dialogRef.close({ type: 'yarnType', isSave: true, data: this.yarnTypeFrom.value })
    else
      this.yarnTypeFrom.markAllAsTouched();
  }

}
