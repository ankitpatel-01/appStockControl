import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateYarnGroupDto, YarnGroup } from 'src/app/master/model/yarn-group.model';

@Component({
  selector: 'app-yarn-group-form-presentation',
  templateUrl: './yarn-group-form-presentation.component.html',
})
export class YarnGroupFormPresentationComponent implements OnInit {

  @Input() public set yarnGroup(yarnGroup: YarnGroup) {
    if (yarnGroup) {
      this._yarnGroup = yarnGroup;
      this.isEditMode = true;
    }
  }

  @Output() save: EventEmitter<CreateYarnGroupDto>
  @Output() cancel: EventEmitter<boolean>

  yarnGroupForm: FormGroup;
  public isEditMode: boolean;

  private _yarnGroup: YarnGroup;
  public get yarnGroup(): YarnGroup {
    return this._yarnGroup;
  }

  constructor(private _fb: FormBuilder) {
    this.isEditMode = false;
    this.save = new EventEmitter<CreateYarnGroupDto>();
    this.cancel = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.yarnGroupForm = this.buildYarnGroupForm();
  }

  buildYarnGroupForm() {
    return this._fb.group({
      yarn_grp_name: [{
        value: this.yarnGroup?.yarn_grp_name ? this.yarnGroup.yarn_grp_name : null,
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.yarnGroupForm['controls'];
  }

  close() {
    this.cancel.emit(true)
  }

  saveClick() {
    if (this.yarnGroupForm.valid) {
      this.save.emit(this.yarnGroupForm.value);
    }
    else {
      this.yarnGroupForm.markAllAsTouched();
    }
  }
}
