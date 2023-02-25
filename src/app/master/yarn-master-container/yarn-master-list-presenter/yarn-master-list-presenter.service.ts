import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { CreateYarnDto, UpdateYarnDto } from '../../model/yarn-add-req.model';
import { YarnMaster } from '../../model/yarn-master.model';
import { YarnMasterFormContainerComponent } from '../yarn-master-form-container/yarn-master-form-container.component';

@Injectable()
export class YarnMasterPresenterListService {

  private _createYarn: Subject<CreateYarnDto>;
  public createYarn$: Observable<CreateYarnDto>

  private _updateYarn: Subject<UpdateYarnDto>;
  public updateYarn$: Observable<UpdateYarnDto>

  constructor(private _drawerService: DrawerService) {
    this._createYarn = new Subject<CreateYarnDto>;
    this.createYarn$ = this._createYarn.asObservable();

    this._updateYarn = new Subject<UpdateYarnDto>;
    this.updateYarn$ = this._updateYarn.asObservable();
  }

  //open the form
  public openFormModal(yarnObj?: YarnMaster) {
    const overlayRef = this._drawerService.createRightDrawer();
    const component = new ComponentPortal(YarnMasterFormContainerComponent);
    const componentRef = overlayRef.attach(component);
    if (yarnObj) {
      componentRef.instance.yarnObj = yarnObj
    }
    componentRef.instance.cancel.subscribe({
      next: () => {
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })

    componentRef.instance.save.subscribe({
      next: (createYarn: CreateYarnDto) => {
        this._createYarn.next(createYarn);
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })

    componentRef.instance.edit.subscribe({
      next: (updatedYarn: UpdateYarnDto) => {
        this._updateYarn.next(updatedYarn);
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
  }
}
