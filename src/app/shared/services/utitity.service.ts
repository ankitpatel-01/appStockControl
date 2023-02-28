import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { AlertDialogData } from '../models/alert-dialog.model';
import { ConfirmDialogData } from '../models/confirm-dialog-data.model';

@Injectable()
export class UtitityService {

  confirmDialogRef: DialogRef<any, ConfirmDialogComponent>;
  alertDialogRef: DialogRef<any, AlertDialogComponent>;

  private _resetSearchControl: BehaviorSubject<boolean>;
  public resetSearchControl$: Observable<boolean>;

  constructor(private dialog: Dialog) {
    this._resetSearchControl = new BehaviorSubject<boolean>(true);
    this.resetSearchControl$ = this._resetSearchControl.asObservable();
  }

  resetSearchControl(): void {
    this._resetSearchControl.next(true);
  }

  /**
   * open Confirm Dialog pass title, message, cancel btn text and confirm btn text
   * @param options : ConfirmDialogData
   * follow confirmDialogClose() method
   */
  public openConfirmDialog(options: ConfirmDialogData) {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      },
      panelClass: 'dialog-popIn'
    });
  }

  /**
   * confirm dilog close observable
   * @returns true if confirm btn click
   */
  public confirmDialogClose(): Observable<boolean> {
    return this.confirmDialogRef.closed.pipe(take(1), map(res => {
      return res;
    }));
  }

  /**
   * open alert dialog
   * @param title : alert dialog title
   * @param message : alert mesage
   */
  public openAlertDialog(title: string, message: string) {

    const data: AlertDialogData = {
      title,
      message,
    }

    this.alertDialogRef = this.dialog.open(AlertDialogComponent, {
      data,
      panelClass: 'dialog-popIn'
    });

    this.alertDialogClose().subscribe();
  }

  /**
   * alert dilog close observable
   * @returns true if alert is confirm
   */
  public alertDialogClose(): Observable<boolean> {
    return this.alertDialogRef.closed.pipe(take(1), map(res => {
      return res;
    }));
  }
}
