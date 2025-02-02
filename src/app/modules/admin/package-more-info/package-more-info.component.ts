import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../../../shared/components/search/search/search.component';
import { EventServiceService } from '../../../core/services/event-management/event-service.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toaster/toast.service';
import IToastOption from '../../../core/models/IToastOptions';
import { Feature, Package } from '../../../core/models/IPackageManagement';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { response } from 'express';
import { SweetAlertService } from '../../../core/services/sweetAlert/sweet-alert.service';

@Component({
  selector: 'app-package-more-info',
  standalone: true,
  imports: [CommonModule, SearchComponent, PaginationComponent],
  templateUrl: './package-more-info.component.html',
  styleUrls: ['./package-more-info.component.css'],
})
export class PackageMoreInfoComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent!: SearchComponent;
  @ViewChild(PaginationComponent) paginationComponent!: PaginationComponent;

  package: Package | null = null;
  isLoading = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  searchTerm: string = '';
  filteredFeatures: Feature[] = [];
  filterStatus: string = 'all';
  private packageId: string = '';

  constructor(
    private route: ActivatedRoute,
    private packageService: EventServiceService,
    private toastService: ToastService,
    private sweetAlert: SweetAlertService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.packageId = id;
        this.fetchPackageDetails(id);
      }
    });
  }

  fetchPackageDetails(id: string) {
    this.isLoading = true;
    this.packageService
      .getPackageDetails(
        id,
        this.searchTerm,
        this.filterStatus,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (response: any) => {
          this.package = response.data;
          console.log(response.data);
          this.isLoading = false;

          if (this.package && this.package.features) {
            this.filterFeatures();
          }
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: error.error?.message || 'Failed to fetch package details.',
          };
          this.toastService.showToast(toastOption);
        },
      });
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.currentPage = 1;
    this.filterFeatures();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.filterFeatures();
  }

  filterFeatures(): void {
    if (!this.package || !this.package.features) return;

    const filteredFeatures = this.package.features.filter((feature) =>
      feature.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalItems = filteredFeatures.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.itemsPerPage,
      filteredFeatures.length
    );

    this.filteredFeatures = filteredFeatures.slice(startIndex, endIndex);
    console.log(this.filteredFeatures);
  }

  blockStatus(featureId: string, currentStatus: boolean | undefined): void {
    console.log(featureId, '56789', this.packageId, 'ertyuio', currentStatus);
    this.packageService.blockFeature(featureId, this.packageId).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          const toastOption: IToastOption = {
            severity: 'success-toast',
            summary: 'Success',
            detail: `Feature ${
              currentStatus ? 'unblocked' : 'blocked'
            } successfully!`,
          };
          this.toastService.showToast(toastOption);
          this.fetchPackageDetails(this.packageId);
        } else {
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'Failed to update event status.',
          };
          this.toastService.showToast(toastOption);
        }
      },
      error: (error) => {
        const toastOption: IToastOption = {
          severity: 'danger-toast',
          summary: 'Error',
          detail: error.error?.message || 'Failed to update event status.',
        };
        this.toastService.showToast(toastOption);
      },
    });
  }

  deleteFeature(featureId: string): void {
    console.log(this.packageId, featureId, 'packageId');
    this.sweetAlert.confirmationAlert('Are you sure?', "You won't be able to revert this!").then((result)=>{
      if(result.isConfirmed){
        this.packageService.deleteFeature(featureId, this.packageId).subscribe({
          next: (response) => {
            console.log(response, 'response');
            this.sweetAlert.successAlert(
              'Deleted!',
              'Your feature has been deleted.'
            );
            this.fetchPackageDetails(this.packageId);
          },
          error: (error) => {
            console.log(error);
            console.error('Error deleting feature:', error);
            const toastOption: IToastOption = {
              severity: 'danger-toast',
              summary: 'Error',
              detail:
                error.error?.message || 'There was a problem deleting the feature.',
            };
            this.toastService.showToast(toastOption);
          },
        });
      }else{
        this.sweetAlert.successAlert(
          'Cancelled',
          'Your event deletion has been cancelled.'
        );
      }
    })
  }
}
