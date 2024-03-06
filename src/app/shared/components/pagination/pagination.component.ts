import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() count: number = 1;
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get displayedPages(): number[] {
    const totalPages = Math.ceil(this.count / this.itemsPerPage);
    const pages = [];
    for (
      let i = Math.max(1, this.currentPage - 2);
      i <= Math.min(totalPages, this.currentPage + 2);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  }

  get lastPage(): number {
    return Math.ceil(this.count / this.itemsPerPage);
  }

  onPageChange(pageNumber: number): void {
    this.pageChange.emit(pageNumber);
  }
}
