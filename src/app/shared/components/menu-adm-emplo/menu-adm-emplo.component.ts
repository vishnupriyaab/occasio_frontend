import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-adm-emplo',
  imports: [CommonModule],
  templateUrl: './menu-adm-emplo.component.html',
  styleUrl: './menu-adm-emplo.component.css',
})
export class MenuAdmEmploComponent {
  @Input() isDarkMode: boolean = false;
  @Input() userRole: 'admin' | 'employee' = 'admin';

  constructor(private router: Router) {}
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
