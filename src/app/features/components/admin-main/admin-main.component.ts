import { Component } from '@angular/core';
import { AdminMenuComponent } from '../../../shared/components/admin-menu/admin-menu.component';
import { AdminNavComponent } from '../../../shared/components/admin-nav/admin-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-main',
  imports: [AdminMenuComponent,AdminNavComponent,RouterOutlet],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css'
})
export class AdminMainComponent {

}
