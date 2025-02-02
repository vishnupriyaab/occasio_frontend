import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


interface BlockStatusEvent {
  eventId: string;
  currentStatus: boolean;
}

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() data: any[] = [];
  @Output() packageVisibilityEvent: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() blockStatusEvent: EventEmitter<BlockStatusEvent> = new EventEmitter<BlockStatusEvent>();
  @Output() toggleModalEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteEventEvent: EventEmitter<string> = new EventEmitter<string>();

  packageVisibility(eventId: string) {
    this.packageVisibilityEvent.emit(eventId);
  }

  blockStatus(eventId: string, currentStatus: boolean) {
    this.blockStatusEvent.emit({eventId, currentStatus});
  }

  toggleModal(event: any = null) {
    this.toggleModalEvent.emit(event);
  }
  deleteEvent(eventId: string) {
    this.deleteEventEvent.emit(eventId)
  }
}
