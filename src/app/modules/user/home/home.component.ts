import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/users/auth.service';
import { ToastService } from '../../../core/services/toaster/toast.service';
import IToastOption from '../../../core/models/IToastOptions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isLoggedIn: boolean = false;
  isDropdownOpen = false;

  constructor(
    private userAuthService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
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
        this.router.navigate(['/user-login']) //particular roles
      },
      error: (error) => {},
    });
  }
}
