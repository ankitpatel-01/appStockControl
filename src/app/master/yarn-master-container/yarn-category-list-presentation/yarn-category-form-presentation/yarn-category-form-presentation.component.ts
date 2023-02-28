import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, CreateCategoryDto } from 'src/app/master/model/category.model';

@Component({
  selector: 'app-yarn-category-form-presentation',
  templateUrl: './yarn-category-form-presentation.component.html',
})
export class YarnCategoryFormPresentationComponent implements OnInit {

  @Input() public set category(category: Category) {
    if (category) {
      this._category = category;
      this.isEditMode = true;
    }
  }

  @Output() save: EventEmitter<CreateCategoryDto>
  @Output() cancel: EventEmitter<boolean>

  categoryForm: FormGroup;
  public isEditMode: boolean;

  private _category: Category;
  public get category(): Category {
    return this._category;
  }

  constructor(private _fb: FormBuilder) {
    this.isEditMode = false;
    this.save = new EventEmitter<CreateCategoryDto>();
    this.cancel = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.categoryForm = this.buildCategoryForm();
  }

  buildCategoryForm() {
    return this._fb.group({
      category_desc: [{
        value: this.category?.category_desc ? this.category.category_desc : null,
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.categoryForm['controls'];
  }

  close() {
    this.cancel.emit(true)
  }

  saveClick() {
    if (this.categoryForm.valid) {
      this.save.emit(this.categoryForm.value);
    }
    else {
      this.categoryForm.markAllAsTouched();
    }
  }

}
