import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-master-form-presentation',
  templateUrl: './item-master-form-presentation.component.html',
})
export class ItemMasterFormPresentationComponent implements OnInit {

  @Output() cancel: EventEmitter<boolean>
  constructor() {
    this.cancel = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  close() {
    this.cancel.emit(true)
  }

}
