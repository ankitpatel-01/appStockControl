import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HsnTypeEnum } from 'src/app/master/constants/enums/hsn-type.enum';
import { DialogData } from 'src/app/master/model/dialog-data.model';
import { Gst } from 'src/app/master/model/gst.model';
import { HsnDialogData } from 'src/app/master/model/hsn-dialog.model';

@Component({
  selector: 'app-hsn-add-dialog',
  templateUrl: './hsn-add-dialog.component.html',
})
export class HsnAddDialogComponent implements OnInit {

  hsnForm: FormGroup;
  HsnTypeEnum = HsnTypeEnum;
  private _gstRateList: Gst[];
  get gstRateList(): Gst[] {
    return this._gstRateList;
  }

  constructor(
    public dialogRef: DialogRef<DialogData>, @Inject(DIALOG_DATA) public data: HsnDialogData,
    private _fb: FormBuilder
  ) {
    this._gstRateList = data?.gstList as Gst[];
  }

  ngOnInit(): void {
    this.hsnForm = this.buildHsnForm();
  }

  buildHsnForm(): FormGroup {
    return this._fb.group({
      hsn_desc: [{
        value: '',
        disabled: false
      }, Validators.required],

      hsn_code: [{
        value: null,
        disabled: false
      }, Validators.required],

      hsn_type: [{
        value: HsnTypeEnum.HSN,
        disabled: false
      }, Validators.required],

      gst: [{
        value: null,
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.hsnForm['controls'];
  }

  close() {
    this.dialogRef.close()
  }

  save() {
    if (this.hsnForm.valid)
      this.dialogRef.close({ type: 'hsnCode', isSave: true, data: this.hsnForm.value })
    else
      this.hsnForm.markAllAsTouched();
  }

}
