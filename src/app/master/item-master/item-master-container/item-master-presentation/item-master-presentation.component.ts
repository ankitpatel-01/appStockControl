import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { ItemMasterFormPresentationComponent } from '../../item-master-form-container/item-master-form-presentation/item-master-form-presentation.component';

@Component({
  selector: 'app-item-master-presentation',
  templateUrl: './item-master-presentation.component.html',
})
export class ItemMasterPresentationComponent implements OnInit {

  overlayRef: OverlayRef;
  constructor(private _drawerService: DrawerService, private location: Location,) { }

  ngOnInit(): void {
    // Subscribe to the location change events
    this.location.subscribe((event) => {
      console.log(event)
      // console.log(this.location.getState())
      if (this.overlayRef && this.overlayRef.hasAttached() && event.url != "/master/item-master") {
        const confirm = window.confirm('Are you sure you want to leave? Your changes will be lost.');
        if (!confirm) {
          // Navigate back to the current URL to cancel the navigation
          this.location.forward();

        } else {
          // Close the overlay and allow navigation
          this.overlayRef.detach();
          this.location.forward();
        }
      }
    });
  }


  openHsnForm() {
    this.overlayRef = this._drawerService.createUpperSilder();
    const component = new ComponentPortal(ItemMasterFormPresentationComponent);
    const componentRef = this.overlayRef.attach(component);

    componentRef.instance.cancel.subscribe({
      next: () => {
        this._drawerService.closeUpperSilder(this.overlayRef);
      }
    })
  }
}
