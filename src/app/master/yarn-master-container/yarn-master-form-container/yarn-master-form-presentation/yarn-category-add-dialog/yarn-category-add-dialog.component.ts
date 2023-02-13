import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/master/model/category.model';
import { DialogData } from 'src/app/master/model/dialog-data.model';

@Component({
  selector: 'app-yarn-category-add-dialog',
  templateUrl: './yarn-category-add-dialog.component.html',
})
export class YarnCategoryAddDialogComponent implements OnInit {

  yarnCategoryFrom: FormGroup;

  constructor(public dialogRef: DialogRef<DialogData>, @Inject(DIALOG_DATA) public data: Object,
    private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.yarnCategoryFrom = this.buildYarnCategoryForm();
  }

  buildYarnCategoryForm() {
    return this._fb.group({
      category_desc: [{
        value: '',
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.yarnCategoryFrom['controls'];
  }

  close() {
    this.dialogRef.close()
  }

  save() {
    if (this.yarnCategoryFrom.valid)
      this.dialogRef.close({ type: 'category', isSave: true, data: this.yarnCategoryFrom.value })
    else
      this.yarnCategoryFrom.markAllAsTouched();
  }

}
