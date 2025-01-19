import { Component } from '@angular/core';
import { AdminNavComponent } from "../../../shared/components/admin-nav/admin-nav.component";
import { RouterOutlet } from '@angular/router';
import { MenuAdmEmploComponent } from "../../../shared/components/menu-adm-emplo/menu-adm-emplo.component";
// import { AdminMenuComponent } from "../../../shared/components/admin-menu/admin-menu.component";

@Component({
  selector: 'app-employee-main',
  imports: [AdminNavComponent, RouterOutlet, MenuAdmEmploComponent],
  templateUrl: './employee-main.component.html',
  styleUrl: './employee-main.component.css'
})
export class EmployeeMainComponent {
  isDarkMode = true;
}
