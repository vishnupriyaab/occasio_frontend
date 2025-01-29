import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css',
})
export class AdminMenuComponent {
  @Input() isDarkMode: boolean = false;
  @Input() userRole: 'admin' | 'employee' = 'admin';
  
  constructor(private router: Router) {}
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
