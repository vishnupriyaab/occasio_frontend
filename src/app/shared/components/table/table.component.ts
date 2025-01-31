import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface TableColumn {
  header: string;
  field: string;
  type?: 'text' | 'image' | 'button' | 'actions';
  buttons?: {
    text: string;
    class: string;
    action: string;
  }[];
}

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() showIndex: boolean = true;
  @Input() emptyMessage: string = 'No data found.';
  @Output() onAction = new EventEmitter<{ action: string; item: any }>();
}
