import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/users/auth.service';
import { ToastService } from '../../../core/services/common/toaster/toast.service';
import IToastOption from '../../../core/models/IToastOptions';

@Component({
  selector: 'app-user-scnd-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-scnd-nav.component.html',
  styleUrl: './user-scnd-nav.component.css'
})
export class UserScndNavComponent {
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
