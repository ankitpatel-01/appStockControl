import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogData } from 'src/app/master/model/dialog-data.model';
import { YarnGroup } from 'src/app/master/model/yarn-group.model';

@Component({
  selector: 'app-yarn-group-add-dialog',
  templateUrl: './yarn-group-add-dialog.component.html',
})
export class YarnGroupAddDialogComponent implements OnInit {

  yarnGroupFrom: FormGroup;

  constructor(public dialogRef: DialogRef<DialogData>, @Inject(DIALOG_DATA) public data: Object,
    private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.yarnGroupFrom = this.buildYarnCategoryForm();
  }

  buildYarnCategoryForm() {
    return this._fb.group({
      yarn_grp_name: [{
        value: '',
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.yarnGroupFrom['controls'];
  }

  close() {
    this.dialogRef.close()
  }

  save() {
    if (this.yarnGroupFrom.valid)
      this.dialogRef.close({ type: 'yarnGroup', isSave: true, data: this.yarnGroupFrom.value })
    else
      this.yarnGroupFrom.markAllAsTouched();
  }

}
