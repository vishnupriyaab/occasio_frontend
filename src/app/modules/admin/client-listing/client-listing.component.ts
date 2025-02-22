import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin/authService/admin.service';
import IToastOption from '../../../core/models/IToastOptions';
import { ToastService } from '../../../core/services/common/toaster/toast.service';
import { SearchComponent } from '../../../shared/components/search/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ReTableComponent } from "../../../shared/components/re-table/re-table.component";

@Component({
  selector: 'app-client-listing',
  imports: [CommonModule, SearchComponent, PaginationComponent, ReTableComponent],
  templateUrl: './client-listing.component.html',
  styleUrl: './client-listing.component.css',
})
export class ClientListingComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent!: SearchComponent;

  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  currentFilter: string = 'all';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  constructor(
    private adminAuthService: AdminService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  onSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredUsers = [...this.users];
      this.totalItems = this.users.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.currentPage = 1;
      return;
    }
    // this.isLoading = true;
    this.adminAuthService
      .searchandFilterUser(
        searchTerm,
        this.currentFilter,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (response) => {
          console.log(response.data, 'qwertyuiopsdfghjkcvbnm,');
          this.filteredUsers = response.data.users;
          this.totalItems = response.data.totalUsers;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          console.log('finisheddddddddddddd');
        },
        error: (error) => {
          console.log(error);
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'Failed to search users',
          };
          this.toastService.showToast(toastOption);
        },
      });
  }

  fetchUsers(): void {
    // this.isLoading = true;
    this.adminAuthService
      .searchandFilterUser(
        '',
        this.currentFilter,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (response) => {
          if (response.data.users) {
            this.users = response.data.users;
            this.filteredUsers = [...this.users];
          } else {
            this.users = [];
            this.filteredUsers = [];
          }
          this.totalItems = response.data.totalUsers;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        },
        error: (error) => {
          console.log(error, 'error');
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'Failed to fetch users',
          };
          this.toastService.showToast(toastOption);
        },
      });
  }

  toggleBlockStatus(userId: string, currentStatus: boolean): void {
    this.adminAuthService.blockUsers(userId).subscribe(
      (response) => {
        console.log(response, 'sdfgioyvb');
        if (response.statusCode === 200) {
          this.users = this.users.map((user)=>{
            if(user._id === userId){
              return {...user, isBlocked: !currentStatus}
            }
            return user
          })
          this.filteredUsers = this.filteredUsers.map((user)=>{
            if(user._id === userId){
              return {...user, isBlocked: !currentStatus}
            }
            return user;
          })
          const toastOption: IToastOption = {
            severity: 'success-toast',
            summary: 'Success',
            detail: `User ${
              currentStatus ? 'unblocked' : 'blocked'
            } successfully!`,
          };
          this.toastService.showToast(toastOption);
        } else {
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'Failed to update user status.',
          };
          this.toastService.showToast(toastOption);
        }
      },
      (error) => {
        const toastOption: IToastOption = {
          severity: 'danger-toast',
          summary: 'Error',
          detail: error.error?.message || 'Failed to update user status.',
        };
        this.toastService.showToast(toastOption);
        this.fetchUsers()
      }
    );
  }

  onFilterChange(filterStatus: string):void{
    console.log(filterStatus,"filterStatus");
    this.currentFilter = filterStatus;
    this.currentPage = 1;
    this.onSearch(this.searchComponent.searchTerm);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    if(this.searchComponent.searchTerm.trim()){
      this.onSearch(this.searchComponent.searchTerm);
    }else if(this.currentFilter !== 'all'){
      this.onFilterChange(this.currentFilter);
    }else{
      this.fetchUsers();
    }
  }
}
