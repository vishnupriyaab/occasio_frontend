import { Component } from '@angular/core';
import { AdminNavComponent } from '../../../shared/components/admin-nav/admin-nav.component';
import { RouterOutlet } from '@angular/router';
import { MenuAdmEmploComponent } from "../../../shared/components/menu-adm-emplo/menu-adm-emplo.component";

@Component({
  selector: 'app-admin-main',
  imports: [AdminNavComponent, RouterOutlet, MenuAdmEmploComponent],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css'
})
export class AdminMainComponent {
  isDarkMode = false
}
