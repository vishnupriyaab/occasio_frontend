import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchComponent } from '../../../shared/components/search/search/search.component';
import { ReTableComponent } from '../../../shared/components/re-table/re-table.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { AdminService } from '../../../core/services/admin/authService/admin.service';
import { ToastService } from '../../../core/services/common/toaster/toast.service';
import IToastOption from '../../../core/models/IToastOptions';

@Component({
  selector: 'app-employee-listing',
  imports: [SearchComponent, ReTableComponent, PaginationComponent],
  templateUrl: './employee-listing.component.html',
  styleUrl: './employee-listing.component.css',
})
export class EmployeeListingComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent!: SearchComponent;

  employees: any[] = [];
  filteredEmployees: any[] = [];
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
    this.fetchEmployee();
  }

  onSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredEmployees = [...this.employees];
      this.totalItems = this.employees.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.currentPage = 1;
      return;
    }
    this.adminAuthService
      .searchandFilterEmployee(
        searchTerm,
        this.currentFilter,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (response) => {
          console.log(response, 'response');
          this.filteredEmployees = response.data.employee;
          this.totalItems = response.data.totalEmployees;
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
  fetchEmployee(): void {
    this.adminAuthService
      .searchandFilterEmployee(
        '',
        this.currentFilter,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (response) => {
          console.log(response, 'response');
          if (response.data.employee) {
            this.employees = response.data.employee;
            this.filteredEmployees = [...this.employees];
          } else {
            this.employees = [];
            this.filteredEmployees = [];
          }
          this.totalItems = response.data.totalEmployees;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        },
        error: (error) => {
          console.log(error, 'error');
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'Failed to fetch employees',
          };
          this.toastService.showToast(toastOption);
        },
      });
  }
  onFilterChange(filterStatus: string): void {
    console.log(filterStatus, 'filterStatus');
    this.currentFilter = filterStatus;
    this.currentPage = 1;
    this.onSearch(this.searchComponent.searchTerm);
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    if (this.searchComponent.searchTerm.trim()) {
      this.onSearch(this.searchComponent.searchTerm);
    } else if (this.currentFilter !== 'all') {
      this.onFilterChange(this.currentFilter);
    } else {
      this.fetchEmployee();
    }
  }
  toggleBlockStatus(userId: string, currentStatus: boolean): void {
    this.adminAuthService.blockEmployee(userId).subscribe({
      next: (response) => {
        console.log(response, 'response');
        if (response.statusCode === 200) {
          this.employees = this.employees.map(emp => {
            if (emp._id === userId) {
              return { ...emp, isBlocked: !currentStatus };
            }
            return emp;
          });
          this.filteredEmployees = this.filteredEmployees.map(emp => {
            if (emp._id === userId) {
              return { ...emp, isBlocked: !currentStatus };
            }
            return emp;
          });
          const toastOption: IToastOption = {
            severity: 'success-toast',
            summary: 'Success',
            detail: `Employee ${
              currentStatus ? 'unblocked' : 'blocked'
            } successfully!`,
          };
          this.toastService.showToast(toastOption);
        } else {
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'Failed to update employee status.',
          };
          this.toastService.showToast(toastOption);
        }
      },
      error: (error) => {
        console.log(error);
        const toastOption: IToastOption = {
          severity: 'danger-toast',
          summary: 'Error',
          detail: error.error?.message || 'Failed to update employee status.',
        };
        this.toastService.showToast(toastOption);
        this.fetchEmployee();
      },
    });
  }
}
