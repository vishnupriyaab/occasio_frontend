import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin/admin.service';
import IToastOption from '../../../core/models/IToastOptions';
import { ToastService } from '../../../core/services/toaster/toast.service';

@Component({
  selector: 'app-menu-adm-emplo',
  imports: [CommonModule],
  templateUrl: './menu-adm-emplo.component.html',
  styleUrl: './menu-adm-emplo.component.css',
})
export class MenuAdmEmploComponent {
  @Input() isDarkMode: boolean = false;
  @Input() userRole: 'admin' | 'employee' = 'admin';

  constructor(
    private router: Router,
    private adminService: AdminService,
    private toastService: ToastService
  ) {}
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
  logOut() {
    this.adminService.logOut().subscribe({
      next: (response) => {
        console.log(response);
        const toastOption: IToastOption = {
          severity: 'success-toast',
          summary: 'Success',
          detail: 'Logout successful',
        };
        this.toastService.showToast(toastOption);
        localStorage.removeItem('isLoggedIn');
        this.router.navigate(['/admin-login']);
      },
    });
  }
}
