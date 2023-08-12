import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-master-form-presentation',
  templateUrl: './item-master-form-presentation.component.html',
})
export class ItemMasterFormPresentationComponent implements OnInit {

  @Output() cancel: EventEmitter<boolean>
  constructor(private _router: Router) {
    this.cancel = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  close() {
    this._router.navigate(['/master/item-master'])
  }

  onFilesSelected(files: File[]) {
    // Do something with the selected files
    console.log(files);
  }

}
