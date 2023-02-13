import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogData } from 'src/app/master/model/dialog-data.model';

@Component({
  selector: 'app-color-add-dialog',
  templateUrl: './color-add-dialog.component.html',
})
export class ColorAddDialogComponent implements OnInit {

  colorForm: FormGroup;

  constructor(public dialogRef: DialogRef<DialogData>, @Inject(DIALOG_DATA) public data: Object,
    private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.colorForm = this.buildYarnTypeForm();
  }

  buildYarnTypeForm() {
    return this._fb.group({
      color_desc: [{
        value: '',
        disabled: false
      }, Validators.required],
      color_code: [{
        value: '',
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.colorForm['controls'];
  }

  close() {
    this.dialogRef.close()
  }

  save() {
    if (this.colorForm.valid)
      this.dialogRef.close({ type: 'color', isSave: true, data: this.colorForm.value })
    else
      this.colorForm.markAllAsTouched();
  }

}
