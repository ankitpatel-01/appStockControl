import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// ------------------------------------------------------------------------
import { HsnTypeEnum } from 'src/app/master/constants/enums/hsn-type.enum';
import { Gst } from 'src/app/master/model/gst.model';
import { CreateHsnDto, Hsn } from 'src/app/master/model/hsn.model';

@Component({
  selector: 'app-hsn-master-form-presentation',
  templateUrl: './hsn-master-form-presentation.component.html',
})
export class HsnMasterFormPresentationComponent implements OnInit {


  @Input() public set hsn(v: Hsn) {
    if (v) {
      this._hsn = v;
      this.isEditMode = true;
    }
  }

  @Input() public set gstRateList(v: Gst[]) {
    if (v) {
      this._gstRateList = v;
    }
  }

  @Output() save: EventEmitter<CreateHsnDto>
  @Output() cancel: EventEmitter<boolean>

  public isEditMode: boolean;
  public hsnForm: FormGroup;
  HsnTypeEnum = HsnTypeEnum;

  private _hsn: Hsn;
  public get hsn(): Hsn {
    return this._hsn;
  }
  private _gstRateList: Gst[];
  public get gstRateList(): Gst[] {
    return this._gstRateList;
  }

  constructor(private _fb: FormBuilder) {
    this.isEditMode = false;
    this.save = new EventEmitter<CreateHsnDto>();
    this.cancel = new EventEmitter<boolean>();

  }

  ngOnInit(): void {
    this.hsnForm = this.buildHsnForm();
  }

  buildHsnForm() {
    return this._fb.group({
      hsn_desc: [{
        value: this.hsn?.hsn_desc ? this.hsn.hsn_desc : null,
        disabled: false
      }, Validators.required],

      hsn_code: [{
        value: this.hsn?.hsn_code ? this.hsn.hsn_code : null,
        disabled: false
      }, Validators.required],

      hsn_type: [{
        value: this.hsn?.hsn_type ? this.hsn.hsn_type : HsnTypeEnum.HSN,
        disabled: false
      }, Validators.required],

      gst: [{
        value: this.hsn?.gst?.id ? this.hsn.gst.id : null,
        disabled: false
      }, Validators.required],
    })
  }

  public get getControls() {
    return this.hsnForm['controls'];
  }

  close() {
    this.cancel.emit(true)
  }

  saveClick() {
    if (this.hsnForm.valid) {
      const formValue: CreateHsnDto = {
        hsn_code: this.getControls['hsn_code'].value,
        hsn_desc: this.getControls['hsn_desc'].value,
        hsn_type: this.getControls['hsn_type'].value,
        gst_id: this.getControls['gst'].value
      }
      this.save.emit(formValue);
    }
    else {
      this.hsnForm.markAllAsTouched();
    }
  }


}
