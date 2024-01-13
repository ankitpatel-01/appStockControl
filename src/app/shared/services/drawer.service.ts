import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

@Injectable()
export class DrawerService {

  constructor(private _overlay: Overlay) { }

  createRightDrawer(): OverlayRef {
    let config = new OverlayConfig({
      hasBackdrop: true,
      height: '100%',
      positionStrategy: this._overlay.position().global().centerHorizontally().right(),
      panelClass: 'drawer-slideIn'
    });

    const overlayRef = this._overlay.create(config);

    overlayRef.backdropClick().subscribe({

      next: () => {
        overlayRef.overlayElement.classList.remove('drawer-slideIn')
        overlayRef.overlayElement.classList.add('drawer-slideOut');
        setTimeout(() => {
          overlayRef.detach()
        }, 150)
      }
    });

    return overlayRef;
  }

  createUpperSilder(): OverlayRef {
    let config = new OverlayConfig({
      hasBackdrop: true,
      height: '100%',
      positionStrategy: this._overlay.position().global().centerHorizontally().top(),
      panelClass: 'drawer-slideDown'
    });

    const overlayRef = this._overlay.create(config);

    overlayRef.backdropClick().subscribe({

      next: () => {
        overlayRef.overlayElement.classList.remove('drawer-slideDown')
        overlayRef.overlayElement.classList.add('drawer-slideUp');
        setTimeout(() => {
          overlayRef.detach()
        }, 150)
      }
    });

    return overlayRef;
  }

  closeRightDrawer(overlayRef: OverlayRef) {
    overlayRef.overlayElement.classList.remove('drawer-slideIn')
    overlayRef.overlayElement.classList.add('drawer-slideOut');
    setTimeout(() => {
      overlayRef.detach()
    }, 150)
  }

  closeUpperSilder(overlayRef: OverlayRef) {
    overlayRef.overlayElement.classList.remove('drawer-slideDown')
    overlayRef.overlayElement.classList.add('drawer-slideUp');
    setTimeout(() => {
      overlayRef.detach()
    }, 150)
  }
}
