import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
// ---------------------------------------------------------------------------------------------
import { ComponentPortal } from '@angular/cdk/portal';
// ---------------------------------------------------------------------------------------------
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
// ---------------------------------------------------------------------------------------------
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { UtitityService } from 'src/app/shared/services/utitity.service';
// ---------------------------------------------------------------------------------------------
import { Color, CreateColorDto, UpdateColorDto } from '../../model/color.model';
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { PaginationMetaData } from 'src/app/shared/models/api-response.model';
import { YarnColorFormPresentationComponent } from './yarn-color-form-presentation/yarn-color-form-presentation.component';
import { ConfirmDialogData } from 'src/app/shared/models/confirm-dialog-data.model';
import { FormControl } from '@angular/forms';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';

@Component({
  selector: 'app-yarn-color-list-presentation',
  templateUrl: './yarn-color-list-presentation.component.html',
})
export class YarnColorListPresentationComponent implements OnInit, OnDestroy {

  @Input() public set colorRes(res: PaginateResponse<Color[]> | null) {
    if (res) {
      this._colorList = res.data;
      this.paginationMeta = res.meta as PaginationMetaData;
      this.isColorLoading = false;
    }
  }

  @Output() pageChange: EventEmitter<number>;
  @Output() removeColorId: EventEmitter<RemoveEmit>;
  @Output() colorSearch: EventEmitter<string>;
  @Output() createColor: EventEmitter<CreateColorDto>;
  @Output() updateColor: EventEmitter<UpdateColorDto>;

  public isColorLoading: boolean;
  public searchControl: FormControl;
  public paginationMeta: PaginationMetaData;

  private _searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  private _colorList: Color[];
  public get colorList(): Color[] {
    return this._colorList;
  }

  constructor(private _drawerService: DrawerService, private _utilityService: UtitityService) {
    this.pageChange = new EventEmitter<number>();
    this.removeColorId = new EventEmitter<RemoveEmit>();
    this.createColor = new EventEmitter<CreateColorDto>();
    this.updateColor = new EventEmitter<UpdateColorDto>();
    this.colorSearch = new EventEmitter<string>();
    this.isColorLoading = true;
    this._colorList = [];
    this.searchControl = new FormControl<string>("");
  }

  ngOnInit(): void {
    this._props();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  _props(): void {
    this.onSearchQueryEmit();
    this._utilityService.resetSearchControl$.subscribe(() => this.searchControl.setValue(""));
  }

  /**
   * emit search string to search subject
   * @param event : input Event
   */
  onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this._searchSubject.next(searchQuery?.trim());
  }

  /**
   * emit search string to container with .3s debounce
   */
  onSearchQueryEmit(): void {
    this.searchSubscription = this._searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((searchStr) => (this.colorSearch.emit(searchStr)));
  }

  openColorForm(colorEdit?: Color) {
    const overlayRef = this._drawerService.createRightDrawer();
    const component = new ComponentPortal(YarnColorFormPresentationComponent);
    const componentRef = overlayRef.attach(component);

    if (colorEdit) {
      componentRef.instance.color = colorEdit;
    }

    componentRef.instance.cancel.subscribe({
      next: () => {
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
    componentRef.instance.save.subscribe({
      next: (color: CreateColorDto) => {
        if (colorEdit?.id) {
          const updatedColor: UpdateColorDto = {
            id: colorEdit.id,
            ...color
          }
          this.updateColor.emit(updatedColor)
        } else {
          this.createColor.emit(color)
        }
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
  }

  colorTrackBy(index: number, el: Color): number {
    return el.id as number;
  }

  removeColorById(color: Color) {
    const options: ConfirmDialogData = {
      title: 'Confirm Deactive',
      message: `Are you sure you want to deactive ${color.color_desc}?`,
      cancelText: 'Cancel',
      confirmText: 'Deactive',
    };

    this._utilityService.openConfirmDialog(options);

    this._utilityService.confirmDialogClose().subscribe(confirmed => {
      if (confirmed) {
        this.removeColorId.emit({ id: color.id, length: this.colorList.length });
      }
    });
  }

  gotoPage(page: number) {
    this.paginationMeta.current_page = 2;
    this.pageChange.emit(page)
  }

}
