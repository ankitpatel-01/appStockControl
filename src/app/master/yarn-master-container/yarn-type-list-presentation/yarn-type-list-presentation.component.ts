import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationMetaData } from 'src/app/shared/models/api-response.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { YarnType } from '../../model/yarn-type.model';
import { YarnTypeFormPresentationComponent } from './yarn-type-form-presentation/yarn-type-form-presentation.component';

@Component({
  selector: 'app-yarn-type-list-presentation',
  templateUrl: './yarn-type-list-presentation.component.html',
})
export class YarnTypeListPresentationComponent implements OnInit {

  @Input() public set yarnTypeRes(res: PaginateResponse<YarnType[]> | null) {
    if (res) {
      this._yarnTypeList = res.data;
      this.paginationMeta = res.meta as PaginationMetaData;
      this.isYarnTypeLoading = false;
    }
  }

  @Output() pageChange: EventEmitter<number>

  public isYarnTypeLoading: boolean;

  public paginationMeta: PaginationMetaData;

  private _yarnTypeList: YarnType[];
  public get yarnTypeList(): YarnType[] {
    return this._yarnTypeList;
  }

  constructor(private _overlay: Overlay) {
    this.pageChange = new EventEmitter<number>();
    this.isYarnTypeLoading = true;
    this._yarnTypeList = []
  }

  ngOnInit(): void {

  }

  openAddForm() {
    //config of overlay
    let config = new OverlayConfig({
      hasBackdrop: true,
      height: '100%',
      positionStrategy: this._overlay.position().global().centerHorizontally().right(),
      panelClass: 'bg-white'
    });

    const overlayRef = this._overlay.create(config);

    const component = new ComponentPortal(YarnTypeFormPresentationComponent);
    const componentRef = overlayRef.attach(component);

    overlayRef.backdropClick().subscribe({
      next: () => overlayRef.detach()
    });

    // if (yarnObj) {
    //   componentRef.instance.yarnObj = yarnObj
    // }

    componentRef.instance.cancel.subscribe({
      next: () => {
        overlayRef.detach();
      }
    })

    componentRef.instance.save.subscribe({
      next: (yarnType: YarnType) => {
        // this._createYarn.next(createYarn);
        console.log(yarnType);
        overlayRef.detach();
      }
    })

    // componentRef.instance.edit.subscribe({
    //   next: (updatedYarn: UpdateYarnDto) => {
    //     this._updateYarn.next(updatedYarn);
    //     overlayRef.detach();
    //   }
    // })
  }

  yarnTypeTrackBy(index: number, el: YarnType): number {
    return el.id as number;
  }

  gotoPage(page: number) {
    this.paginationMeta.current_page = 2;
    this.pageChange.emit(page)
  }

}
