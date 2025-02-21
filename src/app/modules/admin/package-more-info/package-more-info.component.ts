import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../../../shared/components/search/search/search.component';
import { EventServiceService } from '../../../core/services/event-management/event-service.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/common/toaster/toast.service';
import IToastOption from '../../../core/models/IToastOptions';
import { Feature, Package } from '../../../core/models/IPackageManagement';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { SweetAlertService } from '../../../core/services/common/sweetAlert/sweet-alert.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-package-more-info',
  standalone: true,
  imports: [CommonModule, SearchComponent, PaginationComponent, FormsModule],
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
  packageId: string = '';

  editFeatureModal: boolean = false;
  selectedFeatureId: string | null = null;
  featureName: string = ''; // Store feature name input
  featureAmount: number | null = null;
  isEditMode: boolean = false; // Determines if we are adding or editing

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

  openFeatureModal(feature?: Feature) {
    this.editFeatureModal = true;
    if (feature) {
      // Edit Mode
      this.isEditMode = true;
      this.selectedFeatureId = feature._id;
      this.featureName = feature.name;
      this.featureAmount = feature.amount;
    } else {
      // Add Mode
      this.isEditMode = false;
      this.selectedFeatureId = null;
      this.featureName = '';
      this.featureAmount = null;
    }
  }
  
  closeFeatureModal() {
    this.editFeatureModal = false;
    this.selectedFeatureId = null;
    this.featureName = '';
    this.featureAmount = null;
  }
  

  deleteFeature(featureId: string): void {
    this.sweetAlert
      .confirmationAlert('Are you sure?', "You won't be able to revert this!")
      .then((result) => {
        if (result.isConfirmed) {
          this.packageService
            .deleteFeature(featureId, this.packageId)
            .subscribe({
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
                    error.error?.message ||
                    'There was a problem deleting the feature.',
                };
                this.toastService.showToast(toastOption);
              },
            });
        } else {
          this.sweetAlert.successAlert(
            'Cancelled',
            'Your event deletion has been cancelled.'
          );
        }
      });
  }

  addFeature(packageId: string) {
    this.openFeatureModal();  
  }
  

  saveFeature() {
    if (!this.featureName.trim() || this.featureAmount == null || this.featureAmount <= 0) {
      this.toastService.showToast({
        severity: 'danger-toast',
        summary: 'Error',
        detail: 'Feature name cannot be empty.',
      });
      return;
    }
  
    const featureData = { name: this.featureName, amount: this.featureAmount, packageId:this.packageId };
    if (this.isEditMode && this.selectedFeatureId) {
      // Edit Feature
      this.packageService.updateFeature(this.selectedFeatureId, featureData)
        .subscribe({
          next: () => {
            this.toastService.showToast({
              severity: 'success-toast',
              summary: 'Success',
              detail: 'Feature updated successfully!',
            });
            this.fetchPackageDetails(this.packageId);
            this.closeFeatureModal();
          },
          error: (error) => {
            console.error(error);
            this.toastService.showToast({
              severity: 'danger-toast',
              summary: 'Error',
              detail: error.error?.message || 'Failed to update feature.',
            });
          },
        });
    } else {
      // Add Feature
      this.packageService.addFeature(this.packageId, featureData)
        .subscribe({
          next: () => {
            this.toastService.showToast({
              severity: 'success-toast',
              summary: 'Success',
              detail: 'Feature added successfully!',
            });
            this.fetchPackageDetails(this.packageId);
            this.closeFeatureModal();
          },
          error: (error) => {
            console.error(error);
            this.toastService.showToast({
              severity: 'danger-toast',
              summary: 'Error',
              detail: error.error?.message || 'Failed to add feature.',
            });
          },
        });
    }
  }
  
}
