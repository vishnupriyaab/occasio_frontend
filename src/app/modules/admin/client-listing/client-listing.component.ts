import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/userModel';
import { AuthService } from '../../../core/services/users/auth.service';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin/admin.service';
import IToastOption from '../../../core/models/IToastOptions';
import { ToastService } from '../../../core/services/toaster/toast.service';
import { SearchComponent } from "../../../shared/components/search/search/search.component";

@Component({
  selector: 'app-client-listing',
  imports: [CommonModule, SearchComponent],
  templateUrl: './client-listing.component.html',
  styleUrl: './client-listing.component.css',
})
export class ClientListingComponent implements OnInit {
  users: any[] = [];
  filteredUsers:any[] = [];
  searchTerm:string = '';
  constructor(
    private userAuthService: AuthService,
    private adminAuthService: AdminService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  onSearch(searchTerm: string):void{
    if (!searchTerm.trim()) {
          this.filteredUsers = [...this.users];
          return;
        }
        // this.isLoading = true;
        this.userAuthService.searchUser(searchTerm).subscribe({
          next: (response) => {
            this.filteredUsers = response.data;
          },
          error: (error) => {
            console.log(error);
            const toastOption: IToastOption = {
              severity: 'danger-toast',
              summary: 'Error',
              detail: 'Failed to search users'
            };
            this.toastService.showToast(toastOption);
          },
        });
  }



  fetchUsers(): void {
    // this.isLoading = true;
    this.userAuthService.getUsers().subscribe(
      (response) => {
        console.log(response, 'dertyuio');
        this.users = response.data;
        this.filteredUsers = [...this.users];
        console.log(this.users, 'wertyuixcvbnm,');
        // this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching events:', error);
        // this.isLoading = false;
      }
    );
  }

  toggleBlockStatus(userId: string, currentStatus: boolean): void {
    this.adminAuthService.blockUsers(userId).subscribe(
      (response) => {
        console.log(response, 'sdfgioyvb');
        if (response.statusCode === 200) {
          const toastOption: IToastOption = {
            severity: 'success-toast',
            summary: 'Success',
            detail: `User ${
              currentStatus ? 'unblocked' : 'blocked'
            } successfully!`,
          };
          this.toastService.showToast(toastOption);
          this.fetchUsers();
        } else {
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'Failed to update event status.',
          };
          this.toastService.showToast(toastOption);
        }
      },
      (error) => {
        const toastOption: IToastOption = {
          severity: 'danger-toast',
          summary: 'Error',
          detail: error.error?.message || 'Failed to update event status.',
        };
        this.toastService.showToast(toastOption);
        // this.fetchUsers()
      }
    );
  }
}
