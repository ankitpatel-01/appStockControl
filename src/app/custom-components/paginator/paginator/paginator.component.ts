import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';

/**
 * A component for pagination functionality
 */
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit, OnChanges {
  /**
   * The total number of pages
   */
  @Input() totalPages: number;
  /**
   * The current page
   */
  @Input() currentPage: number;
  /**
   * Whether to show ellipses or not
   */
  @Input() ellipses = false;
  /**
   * An event emitter that is triggered when the page is changed
   */
  @Output() pageChanged = new EventEmitter<number>();

  /**
   * An array of page numbers or ellipses
   */
  pages: (number | string)[];
  /**
   * A threshold for the number of pages shown
   */
  rotationThreshold = 4;

  /**
   * Runs when the component is initialized
   */
  ngOnInit() {
    this.updatePages();
  }

  /**
   * Runs when the component's inputs change
   */
  ngOnChanges() {
    this.updatePages();
  }

  /**
   * Updates the pages array based on the current page and total pages
   */
  updatePages() {
    // Fill the pages array with the appropriate number of pages
    this.pages = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);

    // Check if the total number of pages exceeds the threshold
    if (this.totalPages > this.rotationThreshold) {
      let pageWindow = Math.floor(this.rotationThreshold / 2);
      if (this.currentPage <= pageWindow) {
        // Show the first few pages
        this.pages = this.pages.slice(0, this.rotationThreshold);
      } else if (this.currentPage > this.totalPages - pageWindow) {
        // Show the last few pages
        this.pages = this.pages.slice(this.totalPages - this.rotationThreshold);
      } else {
        // Show the pages around the current page with ellipses
        if (this.ellipses) {
          this.pages = [1, '...', ...this.pages.slice(this.currentPage - pageWindow - 1, this.currentPage + pageWindow - 1), '...', this.totalPages];
        } else {
          // Show the pages around the current page without ellipses
          this.pages = this.pages.slice(this.currentPage - pageWindow - 1, this.currentPage + pageWindow - 1);
        }
      }
    }
  }

  /**
   * Emits a pageChanged event when a page is clicked
   * @param page The page number that was clicked
   */
  goToPage(page: number | string) {
    if (page && page != '...') {
      this.pageChanged.emit(page as number);
    }
  }

  /**
   * Emits a pageChanged event for the next page
   */
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
    }
  }

  /**
   * Emits a pageChanged event for the previous page
   */
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
    }
  }
}
