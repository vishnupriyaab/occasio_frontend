import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-head-content',
  standalone: true,
  imports: [],
  templateUrl: './user-head-content.component.html',
  styleUrl: './user-head-content.component.css',
})
export class UserHeadContentComponent {
  @Input() title: string = '';
  @Input() content: string = '';
}
