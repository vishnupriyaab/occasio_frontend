import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-employee-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-employee-listing.component.html',
  styleUrl: './user-employee-listing.component.css'
})
export class UserEmployeeListingComponent {
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
