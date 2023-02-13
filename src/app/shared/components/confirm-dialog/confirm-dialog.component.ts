import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ConfirmDialogData } from '../../models/confirm-dialog-data.model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: DialogRef<boolean>, @Inject(DIALOG_DATA) public data: ConfirmDialogData) { }

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
