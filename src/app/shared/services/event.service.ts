import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable()
export class EventService {

  snackbarConfig: Partial<IndividualConfig> = {
    closeButton: true,
    timeOut: 3000,
    easing: 'ease-in',
    easeTime: 150,
    newestOnTop: true,
    progressBar: true,
    progressAnimation: 'decreasing',
    positionClass: 'toast-bottom-center',
    tapToDismiss: true
  }

  toastrConfig: Partial<IndividualConfig> = {
    closeButton: true,
    timeOut: 3000,
    easing: 'ease-in',
    easeTime: 150,
    newestOnTop: true,
    progressBar: true,
    progressAnimation: 'decreasing',
    positionClass: 'toast-top-right',
    tapToDismiss: true
  }

  constructor(private _toastr: ToastrService) { }

  showSuccessSnackBar(message: string, title: string = ''): void {
    this._toastr.success(message, title, this.snackbarConfig)
  }

  showErrorSnackBar(message: string, title: string = ''): void {
    this._toastr.error(message, title, this.snackbarConfig)
  }

  showInfoSnackBar(message: string, title: string = ''): void {
    this._toastr.info(message, title, this.snackbarConfig)
  }

  showWarningSnackBar(message: string, title: string = ''): void {
    this._toastr.warning(message, title, this.snackbarConfig)
  }

  showSuccessToastr(message: string, title: string = ''): void {
    this._toastr.success(message, title, this.toastrConfig)
  }

  showErrorToastr(message: string, title: string = ''): void {
    this._toastr.error(message, title, this.toastrConfig)
  }

  showInfoToastr(message: string, title: string = ''): void {
    this._toastr.info(message, title, this.toastrConfig)
  }

  showWarningToastr(message: string, title: string = ''): void {
    this._toastr.warning(message, title, this.toastrConfig)
  }
}
