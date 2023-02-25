import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// --------------------------------------------------------------------
import { CreateGstDto, Gst } from 'src/app/master/model/gst.model';

@Component({
  selector: 'app-tax-master-form-presentation',
  templateUrl: './tax-master-form-presentation.component.html',
})

export class TaxMasterFormPresentationComponent implements OnInit {

  @Input() public set gstRate(v: Gst) {
    if (v) {
      this._gstRate = v;
      this.isEditMode = true;
    }
  }

  @Output() save: EventEmitter<CreateGstDto>
  @Output() cancel: EventEmitter<boolean>

  public isEditMode: boolean;
  public gstRateForm: FormGroup;

  private _gstRate: Gst;
  public get gstRate(): Gst {
    return this._gstRate;
  }

  constructor(private _fb: FormBuilder) {
    this.isEditMode = false;
    this.save = new EventEmitter<CreateGstDto>();
    this.cancel = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.gstRateForm = this.buildGstRateForm();
  }

  /**
   * create gst form
   * @returns gst form group
   */
  buildGstRateForm(): FormGroup {
    return this._fb.group({
      gst_desc: [{
        value: !this.gstRate?.gst_desc ? null : this.gstRate.gst_desc,
        disabled: false
      }, Validators.required],

      gst_rate: [{
        value: !this.gstRate?.gst_rate ? null : this.gstRate.gst_rate === 0 ? 0 : this.gstRate.gst_rate,
        disabled: false
      }, Validators.required],

      igst: [{
        value: !this.gstRate?.igst ? null : this.gstRate.igst === 0 ? 0 : this.gstRate.igst,
        disabled: false
      }, Validators.required],

      sgst: [{
        value: !this.gstRate?.sgst ? null : this.gstRate.sgst === 0 ? 0 : this.gstRate.sgst,
        disabled: false
      }, Validators.required],

      cgst: [{
        value: !this.gstRate?.cgst ? null : this.gstRate.cgst === 0 ? 0 : this.gstRate.cgst,
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.gstRateForm['controls'];
  }

  close() {
    this.cancel.emit(true)
  }

  saveClick() {
    if (this.gstRateForm.valid) {
      this.save.emit(this.gstRateForm.value);
    }
    else {
      this.gstRateForm.markAllAsTouched();
    }
  }

}
