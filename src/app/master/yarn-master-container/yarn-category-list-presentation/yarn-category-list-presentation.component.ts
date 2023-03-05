import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
// ---------------------------------------------------------------------------------------------
import { ComponentPortal } from '@angular/cdk/portal';
import { YarnCategoryFormPresentationComponent } from './yarn-category-form-presentation/yarn-category-form-presentation.component';
// ---------------------------------------------------------------------------------------------
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
// ---------------------------------------------------------------------------------------------
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { UtitityService } from 'src/app/shared/services/utitity.service';
// ---------------------------------------------------------------------------------------------
import { PaginateResponse } from 'src/app/shared/models/response.model';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../../model/category.model';
import { PaginationMetaData } from 'src/app/shared/models/api-response.model';
import { FormControl } from '@angular/forms';
import { ConfirmDialogData } from 'src/app/shared/models/confirm-dialog-data.model';
import { RemoveEmit } from 'src/app/shared/models/remove-emitter.model';

@Component({
  selector: 'app-yarn-category-list-presentation',
  templateUrl: './yarn-category-list-presentation.component.html',
})
export class YarnCategoryListPresentationComponent implements OnInit, OnDestroy {

  @Input() public set categoryRes(res: PaginateResponse<Category[]> | null) {
    if (res) {
      this._categoryList = res.data;
      this.paginationMeta = res.meta as PaginationMetaData;
      this.isCategoryLoading = false;
    }
  }

  @Output() pageChange: EventEmitter<number>;
  @Output() removeCategoryId: EventEmitter<RemoveEmit>;
  @Output() categorySearch: EventEmitter<string>;
  @Output() createCategory: EventEmitter<CreateCategoryDto>;
  @Output() updateCategory: EventEmitter<UpdateCategoryDto>;

  public isCategoryLoading: boolean;
  public searchControl: FormControl;
  public paginationMeta: PaginationMetaData;

  private _searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  private _categoryList: Category[];
  public get categoryList(): Category[] {
    return this._categoryList;
  }

  constructor(private _drawerService: DrawerService, private _utilityService: UtitityService) {
    this.pageChange = new EventEmitter<number>();
    this.removeCategoryId = new EventEmitter<RemoveEmit>();
    this.createCategory = new EventEmitter<CreateCategoryDto>();
    this.updateCategory = new EventEmitter<UpdateCategoryDto>();
    this.categorySearch = new EventEmitter<string>();
    this.isCategoryLoading = true;
    this._categoryList = [];
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
      .subscribe((searchStr) => (this.categorySearch.emit(searchStr)));
  }

  openCategoryForm(categoryEdit?: Category) {
    const overlayRef = this._drawerService.createRightDrawer();
    const component = new ComponentPortal(YarnCategoryFormPresentationComponent);
    const componentRef = overlayRef.attach(component);

    if (categoryEdit) {
      componentRef.instance.category = categoryEdit;
    }

    componentRef.instance.cancel.subscribe({
      next: () => {
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
    componentRef.instance.save.subscribe({
      next: (category: CreateCategoryDto) => {
        if (categoryEdit?.id) {
          const updatedCategory: UpdateCategoryDto = {
            id: categoryEdit.id,
            ...category
          }
          this.updateCategory.emit(updatedCategory)
        } else {
          this.createCategory.emit(category)
        }
        this._drawerService.closeRightDrawer(overlayRef);
      }
    })
  }

  categoryTrackBy(index: number, el: Category): number {
    return el.id as number;
  }

  removeCategoryById(category: Category) {
    const options: ConfirmDialogData = {
      title: 'Confirm Deactive',
      message: `Are you sure you want to deactive ${category.category_desc}?`,
      cancelText: 'Cancel',
      confirmText: 'Deactive',
    };

    this._utilityService.openConfirmDialog(options);

    this._utilityService.confirmDialogClose().subscribe(confirmed => {
      if (confirmed) {
        this.removeCategoryId.emit({ id: category.id, length: this.categoryList.length });
      }
    });
  }

  gotoPage(page: number) {
    this.paginationMeta.current_page = 2;
    this.pageChange.emit(page)
  }

}
