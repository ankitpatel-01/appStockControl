import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { CreateYarnDto, UpdateYarnDto } from '../../model/yarn-add-req.model';
import { YarnMaster } from '../../model/yarn-master.model';
import { YarnMasterFormContainerComponent } from '../yarn-master-form-container/yarn-master-form-container.component';

@Injectable()
export class YarnMasterPresenterListService {

  private _createYarn: Subject<CreateYarnDto>;
  public createYarn$: Observable<CreateYarnDto>

  private _updateYarn: Subject<UpdateYarnDto>;
  public updateYarn$: Observable<UpdateYarnDto>

  constructor(private _overlay: Overlay) {
    this._createYarn = new Subject<CreateYarnDto>;
    this.createYarn$ = this._createYarn.asObservable();

    this._updateYarn = new Subject<UpdateYarnDto>;
    this.updateYarn$ = this._updateYarn.asObservable();
  }

  //open the form
  public openFormModal(yarnObj?: YarnMaster) {

    //config of overlay
    let config = new OverlayConfig({
      hasBackdrop: true,
      height: '100%',
      positionStrategy: this._overlay.position().global().centerHorizontally().right(),
    });

    const overlayRef = this._overlay.create(config);

    const component = new ComponentPortal(YarnMasterFormContainerComponent);
    const componentRef = overlayRef.attach(component);

    overlayRef.backdropClick().subscribe({
      next: () => overlayRef.detach()
    });

    if (yarnObj) {
      componentRef.instance.yarnObj = yarnObj
    }

    componentRef.instance.cancel.subscribe({
      next: () => {
        overlayRef.detach();
      }
    })

    componentRef.instance.save.subscribe({
      next: (createYarn: CreateYarnDto) => {
        this._createYarn.next(createYarn);
        overlayRef.detach();
      }
    })

    componentRef.instance.edit.subscribe({
      next: (updatedYarn: UpdateYarnDto) => {
        this._updateYarn.next(updatedYarn);
        overlayRef.detach();
      }
    })
  }
}
