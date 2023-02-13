import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() totalPages: number;
  @Input() currentPage: number;
  @Input() ellipses: boolean = false;
  @Output() pageChanged = new EventEmitter<number>();
  pages: (number | string)[];
  rotationThreshold = 4;

  ngOnInit() {
    this.updatePages();
  }

  ngOnChanges() {
    this.updatePages();
  }

  updatePages() {
    this.pages = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);

    if (this.totalPages > this.rotationThreshold) {
      let pageWindow = Math.floor(this.rotationThreshold / 2);
      if (this.currentPage <= pageWindow) {
        this.pages = this.pages.slice(0, this.rotationThreshold);
      } else if (this.currentPage > this.totalPages - pageWindow) {
        this.pages = this.pages.slice(this.totalPages - this.rotationThreshold);
      } else {
        if (this.ellipses) {
          this.pages = [1, '...', ...this.pages.slice(this.currentPage - pageWindow - 1, this.currentPage + pageWindow - 1), '...', this.totalPages];
        } else {
          this.pages = this.pages.slice(this.currentPage - pageWindow - 1, this.currentPage + pageWindow - 1);
        }
      }
    }
  }

  goToPage(page: number | string) {
    if (page && page != '...') {
      this.pageChanged.emit(page as number);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
    }
  }

}
