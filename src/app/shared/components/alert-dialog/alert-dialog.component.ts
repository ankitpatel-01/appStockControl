import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AlertDialogData } from '../../models/alert-dialog.model';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
})
export class AlertDialogComponent implements OnInit {

  constructor(public dialogRef: DialogRef<boolean>, @Inject(DIALOG_DATA) public data: AlertDialogData) { }

  ngOnInit(): void {
  }

  public cancel() {
    this.close(false);
  }

  public close(value: boolean) {
    this.dialogRef.close(value);
  }

  public confirm() {
    this.close(true);
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }

}
