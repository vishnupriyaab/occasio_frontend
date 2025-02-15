import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-re-table',
  imports: [CommonModule],
  templateUrl: './re-table.component.html',
  styleUrl: './re-table.component.css',
})
export class ReTableComponent {
  @Input() users: any[] = [];
  @Input() isClientList: boolean = true;

  @Output() toggleBlockStatus = new EventEmitter<{
    userId: string;
    status: boolean;
  }>();

  onToggleBlock(userId: string, status: boolean) {
    this.toggleBlockStatus.emit({ userId, status });
  }
}
