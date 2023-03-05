import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color, CreateColorDto } from 'src/app/master/model/color.model';

@Component({
  selector: 'app-yarn-color-form-presentation',
  templateUrl: './yarn-color-form-presentation.component.html',
})
export class YarnColorFormPresentationComponent implements OnInit {

  @Input() public set color(color: Color) {
    if (color) {
      this._color = color;
      this.isEditMode = true;
    }
  }

  @Output() save: EventEmitter<CreateColorDto>
  @Output() cancel: EventEmitter<boolean>

  colorForm: FormGroup;
  public isEditMode: boolean;

  private _color: Color;
  public get color(): Color {
    return this._color;
  }

  constructor(private _fb: FormBuilder) {
    this.isEditMode = false;
    this.save = new EventEmitter<CreateColorDto>();
    this.cancel = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.colorForm = this.buildColorForm();
  }

  buildColorForm() {
    return this._fb.group({
      color_desc: [{
        value: this.color?.color_desc ? this.color.color_desc : null,
        disabled: false
      }, Validators.required],
      color_code: [{
        value: this.color?.color_code ? this.color.color_code : null,
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.colorForm['controls'];
  }

  close() {
    this.cancel.emit(true)
  }

  saveClick() {
    if (this.colorForm.valid) {
      this.save.emit(this.colorForm.value);
    }
    else {
      this.colorForm.markAllAsTouched();
    }
  }

}
