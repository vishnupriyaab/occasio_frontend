import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../../core/services/users/auth.service';
import { ToastService } from '../../../core/services/common/toaster/toast.service';
import IToastOption from '../../../core/models/IToastOptions';
import { Router, RouterModule } from '@angular/router';
import { UserHeadContentComponent } from '../user-head-content/user-head-content.component';
import { EventServiceService } from '../../../core/services/event-management/event-service.service';
import { EventData } from '../../../core/models/IEventManagement';

@Component({
  selector: 'app-user-nav',
  imports: [CommonModule, RouterModule, UserHeadContentComponent],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css',
})
export class UserNavComponent {
  private eventService = inject(EventServiceService);
  @Input() title: string | null = null;
  @Input() content: string | null = null;
  closeDropdownTimeout: any;
  services: any[] = [];

  isLoggedIn: boolean = false;
  isDropdownOpen = false;
  isServicesOpen = false;

  private userAuthService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  constructor() {
    this.isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'));
    console.log(this.isLoggedIn);
  }
  dropDown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  allServices() {
    this.eventService.getEvents().subscribe({
      next: (response) => {
        // console.log(response.data);
        this.services = response.data;
        // console.log(this.services,"qwertyuiop[")
        this.isServicesOpen = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  closeDropdownWithDelay() {
    this.closeDropdownTimeout = setTimeout(() => {
      this.isServicesOpen = false;
    }, 200);
  }

  cancelCloseDropdown() {
    if (this.closeDropdownTimeout) {
      clearTimeout(this.closeDropdownTimeout);
    }
  }

  selectService(serviceId: string) {
    console.log(serviceId, 'serviceId');
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
          detail: 'Unable to logout. Please try again.',
        };
        this.toastService.showToast(errorToast);
      },
    });
  }
}
