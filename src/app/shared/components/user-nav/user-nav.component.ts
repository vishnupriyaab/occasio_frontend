import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../../core/services/users/auth.service';
import { ToastService } from '../../../core/services/toaster/toast.service';
import IToastOption from '../../../core/models/IToastOptions';
import { Router, RouterModule } from '@angular/router';
import { UserHeadContentComponent } from "../user-head-content/user-head-content.component";

@Component({
  selector: 'app-user-nav',
  imports: [CommonModule, RouterModule, UserHeadContentComponent],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css',
})
export class UserNavComponent {
  @Input() title: string | null = null;
  @Input() content: string | null = null;

  isLoggedIn: boolean = false;
  isDropdownOpen = false;

  private userAuthService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  constructor(){
    this.isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'));
    console.log(this.isLoggedIn);
  }
  dropDown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.userAuthService.logOut().subscribe({
      next: (response) => {
        console.log(response);
        const toastOption: IToastOption = {
          severity: 'success-toast',
          summary: 'Success',
          detail: 'Logout successful',
        };
        this.toastService.showToast(toastOption);
        localStorage.removeItem('isLoggedIn');
        this.router.navigate(['/user-login']);
      },
      error: (error) => {
        console.log(error);
        const errorToast: IToastOption = {
          severity: 'danger-toast',
          summary: 'Logout Failed',
          detail: 'Unable to logout. Please try again.'
        };
        this.toastService.showToast(errorToast);
      },
    });
  }
}
