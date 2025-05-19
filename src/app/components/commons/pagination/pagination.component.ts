import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, RouterModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() pageChange = new EventEmitter<number>();

  // Méthode pour changer de page
  goToPage(page: number) {
    this.pageChange.emit(page);
  }

  // Méthode pour générer les numéros de page
  get pageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
