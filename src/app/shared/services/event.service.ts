import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class EventService {

  constructor(private _toastr: ToastrService) { }

  showSuccessSnackBar(message: string, title: string = ''): void {
    this._toastr.success(message, title, {
      closeButton: true,
      timeOut: 1200,
      easing: 'ease-in',
      easeTime: 150,
      newestOnTop: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-bottom-center',
      tapToDismiss: true
    })
  }
}
