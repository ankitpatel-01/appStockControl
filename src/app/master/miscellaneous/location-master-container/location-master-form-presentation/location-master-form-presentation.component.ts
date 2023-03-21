import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateLocationMasterDto, LocationMaster } from 'src/app/master/model/location.model';

@Component({
  selector: 'app-location-master-form-presentation',
  templateUrl: './location-master-form-presentation.component.html',
})
export class LocationMasterFormPresentationComponent implements OnInit {

  @Input() public set locationMaster(v: LocationMaster) {
    if (v) {
      this._location = v;
      this.isEditMode = true;
    }
  }
  @Output() save: EventEmitter<CreateLocationMasterDto>
  @Output() cancel: EventEmitter<boolean>

  public isEditMode: boolean;
  public locationForm: FormGroup;

  private _location: LocationMaster;
  public get locationMaster(): LocationMaster {
    return this._location;
  }

  constructor(private _fb: FormBuilder) {
    this.isEditMode = false;
    this.save = new EventEmitter<CreateLocationMasterDto>();
    this.cancel = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.locationForm = this.buildLocationMasterForm();
  }

  buildLocationMasterForm() {
    return this._fb.group({
      location_name: [{
        value: this.locationMaster?.location_name ? this.locationMaster.location_name : null,
        disabled: false
      }, Validators.required],

      factory_name: [{
        value: this.locationMaster?.factory_name ? this.locationMaster.factory_name : null,
        disabled: false
      }, Validators.required],

      factory_city: [{
        value: this.locationMaster?.factory_city ? this.locationMaster.factory_city : null,
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.locationForm['controls'];
  }

  close() {
    this.cancel.emit(true)
  }

  saveClick() {
    if (this.locationForm.valid) {
      const formValue: CreateLocationMasterDto = {
        location_name: this.getControls['location_name'].value,
        factory_name: this.getControls['factory_name'].value,
        factory_city: this.getControls['factory_city'].value
      }
      this.save.emit(formValue);
    }
    else {
      this.locationForm.markAllAsTouched();
    }
  }
}
