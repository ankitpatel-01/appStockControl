import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-flyout',
  templateUrl: './flyout.component.html',
})
export class FlyoutComponent implements OnInit {
  @Input() showOverlay = false;
  ngOnInit(): void {
  }

  @ViewChild('flyoutContainer', { read: ViewContainerRef }) flyoutContainerRef: ViewContainerRef;

  protected isOpen: boolean = false;

  openFlyout() {
    this.isOpen = true;
    this.showOverlay = true;
  }

  isFlyoutOpen() {
    return this.isOpen;
  }

  closeFlyout() {
    this.isOpen = false;
    this.showOverlay = false;
    this.flyoutContainerRef.clear();
  }
}
