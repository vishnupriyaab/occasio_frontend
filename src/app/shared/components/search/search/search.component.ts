import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

export interface FoodFilters {
  status: string;
  price: string;
  category: string;
  session: string;
  // searchTerm: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnDestroy {
  private searchSubject = new Subject<string>();
  @Output() searchQuery = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();
  @Input() placeholder: string = 'Search...';
  @Input() isFoodManagement: boolean = false;

  searchTerm: string = '';
  filters: FoodFilters = {
    status: 'all',
    price: 'all',
    category: 'all',
    session: 'all',
  };

  constructor() {
    this.searchSubject.pipe(debounceTime(300)).subscribe((value) => {
      this.searchQuery.emit(value);
    });
  }

  onFilterChange(filterType: keyof FoodFilters, event: Event): void {
    if (event?.target instanceof HTMLSelectElement) {
      this.filters = { ...this.filters, [filterType]: event.target.value };
      this.filterChange.emit(JSON.stringify(this.filters));
    }
  }

  onInputChange(value: any): void {
    this.searchSubject.next(value);
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }
}
