import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Package } from '../../../core/models/IPackageManagement';
import { EventServiceService } from '../../../core/services/event-management/event-service.service';
import {
  noAllSpacesValidator,
  onlyNumbersValidator,
} from '../../../shared/validator/formValidator';
import IToastOption from '../../../core/models/IToastOptions';
import { ToastService } from '../../../core/services/common/toaster/toast.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../core/services/common/sweetAlert/sweet-alert.service';
import { TableComponent } from '../../../shared/components/table/table.component';
import { PackageServiceService } from '../../../core/services/admin/packageService/package-service.service';

@Component({
  selector: 'app-package-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingComponent,
    FontAwesomeModule,
    // TableComponent
  ],
  templateUrl: './package-management.component.html',
  styleUrl: './package-management.component.css',
})
export class PackageManagementComponent {
  @Output() closeEvent: EventEmitter<void> = new EventEmitter();
  packageForm!: FormGroup;
  isLoading = false;
  isModalOpen = false;
  modalMode: 'add' | 'edit' = 'add';
  packages: Package[] = [];
  isLoadingPackages = false;
  selectedImg: File | null = null;
  selectedPackageId: string | null = null;
  currentEventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private packageAuthService: PackageServiceService,
    private toastService: ToastService,
    private router: Router,
    private sweetAlert: SweetAlertService
  ) {
    this.packageForm = this.fb.group({
      packageName: [
        '',
        [Validators.required, noAllSpacesValidator(), Validators.minLength(3)],
      ],
      startingAmnt: [
        '',
        [Validators.required, noAllSpacesValidator(), onlyNumbersValidator()],
      ],
      img: [null, [Validators.required]],
      features: this.fb.array([this.createFeature(true)]),
    });
  }
  createFeature(isRequired: boolean = false) {
    return this.fb.group({
      name: [
        '',
        isRequired ? [Validators.required, noAllSpacesValidator()] : [],
      ],
      // amount: ['', isRequired ? [Validators.required, onlyNumbersValidator()] : []]
    });
  }

  get features() {
    return this.packageForm.get('features') as FormArray;
  }

  addFeature() {
    this.features.push(this.createFeature());
  }

  removeFeature(index: number) {
    if (index === 0 && this.features.length === 1) {
      const toastOption: IToastOption = {
        severity: 'warning-toast',
        summary: 'Warning',
        detail: 'At least one feature is required',
      };
      this.toastService.showToast(toastOption);
      return;
    }
    this.features.removeAt(index);
  }

  togglePackageModal(packages: any = null) {
    console.log('Toggle modal called', this.isModalOpen);
    this.isModalOpen = !this.isModalOpen;
    if (packages) {
      console.log(packages, 'Vishnupriya');
      this.modalMode = 'edit';
      this.packageForm.patchValue({
        packageName: packages.packageName,
        startingAmnt: packages.startingAmnt,
      });
      this.selectedPackageId = packages._id;
      console.log(this.selectedPackageId, '123456789023456789');
    } else {
      this.modalMode = 'add';
      this.packageForm.reset();
      this.selectedPackageId = null;
    }
    if (!this.isModalOpen) {
      this.packageForm.reset();
      this.selectedImg = null;
    }
  }

  setEventId(eventId: string) {
    this.currentEventId = eventId;
  }

  showPackages(eventId: string) {
    this.currentEventId = eventId;
    this.isLoadingPackages = true;
    if (!eventId) {
      return;
    }

    this.packageAuthService.getPackages(eventId).subscribe({
      next: (response) => {
        this.packages = response.data;
        console.log(this.packages.length, 'res.data');
        this.isLoadingPackages = false;
      },
      error: (error) => {
        console.error('Error fetching packages:', error);
        this.isLoadingPackages = false;
      },
    });
  }

  closePackageModal(): void {
    this.closeEvent.emit();
    this.currentEventId = null;
  }

  private allowedImageTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
  ];

  onFileSelect(event: any): void {
    console.log(event, 'eventtnnttnntnttn');
    const file = event.target.files[0];

    console.log(file, 'fileeeeeeeeeeeee');

    if (file) {
      if (!this.allowedImageTypes.includes(file.type)) {
        const toastOption: IToastOption = {
          severity: 'danger-toast',
          summary: 'Error',
          detail: 'Please upload only image files (JPEG, PNG, JPG, GIF)',
        };
        this.toastService.showToast(toastOption);
        console.log('Please upload only image files (JPEG, PNG, JPG, GIF)');

        event.target.value = '';
        this.selectedImg = null;
        this.packageForm.get('img')?.setValue(null);
        this.packageForm.get('img')?.markAsTouched();
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        const toastOption: IToastOption = {
          severity: 'danger-toast',
          summary: 'Error',
          detail: 'File size should not exceed 5MB',
        };
        this.toastService.showToast(toastOption);
        console.log('File size should not exceed 5MB');
        event.target.value = '';
        this.selectedImg = null;
        this.packageForm.get('img')?.setValue(null);
        this.packageForm.get('img')?.markAsTouched();
        return;
      }

      this.selectedImg = file;
      this.packageForm.get('img')?.setValue(file);
      this.packageForm.get('img')?.markAsTouched();
    } else {
      this.selectedImg = null;
      this.packageForm.get('img')?.setValue(null);
      this.packageForm.get('img')?.markAsTouched();
    }
  }

  addPackage() {
    if (!this.packageForm.valid || !this.selectedImg) {
      Object.keys(this.packageForm.controls).forEach((key) => {
        const control = this.packageForm.get(key);
        control?.markAsTouched();
      });
      if (!this.selectedImg) {
        this.packageForm.get('img')?.markAsTouched();
      }
      const toastOption: IToastOption = {
        severity: 'danger-toast',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly',
      };
      this.toastService.showToast(toastOption);
      return;
    }

    console.log('Package submitted!');
    const formData = new FormData();
    formData.append('packageName', this.packageForm.get('packageName')?.value);
    formData.append(
      'startingAmnt',
      this.packageForm.get('startingAmnt')?.value
    );

    const features = this.features.value.filter(
      (feature: { name: string }) => feature.name.trim() !== ''
    );

    formData.append('items', JSON.stringify(features));

    if (this.selectedImg) {
      formData.append('img', this.selectedImg, this.selectedImg.name);
    }

    if (this.currentEventId) {
      console.log(this.currentEventId, 'currentEventId');
      formData.append('eventId', this.currentEventId);
    }

    console.log(formData, 'formdata');

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    //EditPackage
    if (this.selectedPackageId) {
      // this.isLoading = true;
      console.log("hey i'm vishnu");
      this.packageAuthService
        .editPackage(this.selectedPackageId, formData)
        .subscribe((response) => {
          console.log(response);
          if (response.statusCode === 200) {
            const toastOption: IToastOption = {
              severity: 'success-toast',
              summary: 'Success',
              detail: 'Event updated successfully!',
            };
            this.toastService.showToast(toastOption);
          }
          this.togglePackageModal();
          setTimeout(() => {
            if (this.currentEventId) {
              this.showPackages(this.currentEventId);
            }
          }, 1000);
          console.log('Package created successfully');
        });
    } else {
      //AddPackge
      console.log(formData);
      this.packageAuthService.addPackage(formData).subscribe(
        (response) => {
          // this.isLoading = true;
          console.log(response, 'responsseeeeeeeee');
          if (response.statusCode === 200) {
            const toastOption: IToastOption = {
              severity: 'success-toast',
              summary: 'Success',
              detail: 'Package created successfully!',
            };
            this.toastService.showToast(toastOption);
            this.togglePackageModal();
            setTimeout(() => {
              if (this.currentEventId) {
                this.showPackages(this.currentEventId);
              }
            }, 1000);
            console.log('Package created successfully');
          } else {
            const toastOption: IToastOption = {
              severity: 'danger-toast',
              summary: 'Error',
              detail: 'An unexpected error occurred while creating the event.',
            };
            this.toastService.showToast(toastOption);
            this.togglePackageModal();
            console.error('Unexpected status code:', response?.statusCode);
          }
        },
        (error) => {
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: error.error?.message || 'Failed to create event.',
          };
          this.toastService.showToast(toastOption);
          console.error('Error while creating event:', error);
        }
      );
    }
  }

  //DeletePacage
  deletePackage(packageId: string) {
    console.log(packageId, 'packageId');
    this.isLoading = true;
    this.sweetAlert
      .confirmationAlert('Are you sure?', "You won't be able to revert this!")
      .then((result) => {
        if (result.isConfirmed) {
          this.packageAuthService.deletePackage(packageId).subscribe(
            (response) => {
              console.log(response);
              this.isLoading = false;
              console.log(response, 'Event deleted successfully');
              this.sweetAlert.successAlert(
                'Deleted!',
                'Your event has been deleted.'
              );
              setTimeout(() => {
                if (this.currentEventId) {
                  this.showPackages(this.currentEventId);
                }
              }, 1000);
            },
            (error) => {
              console.error('Error deleting package:', error);
              const toastOption: IToastOption = {
                severity: 'danger-toast',
                summary: 'Error',
                detail:
                  error.error?.message ||
                  'There was a problem deleting the package.',
              };
              this.toastService.showToast(toastOption);
            }
          );
        } else {
          this.isLoading = false;
          this.sweetAlert.successAlert(
            'Cancelled',
            'Your event deletion has been cancelled.'
          );
        }
      });
  }

  //Block - Unblock
  blockStatus(packageId: string, currentStatus: boolean): void {
    this.isLoading = true;
    this.packageAuthService.blockPackage(packageId).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          const toastOption: IToastOption = {
            severity: 'success-toast',
            summary: 'Success',
            detail: `Package ${
              currentStatus ? 'unblocked' : 'blocked'
            } successfully!`,
          };
          this.toastService.showToast(toastOption);
          setTimeout(() => {
            if (this.currentEventId) {
              this.showPackages(this.currentEventId);
            }
          }, 500);
        } else {
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'Failed to update package status.',
          };
          this.toastService.showToast(toastOption);
        }
        this.isLoading = false;
      },
      (error) => {
        const toastOption: IToastOption = {
          severity: 'danger-toast',
          summary: 'Error',
          detail: error.error?.message || 'Failed to update package status.',
        };
        this.toastService.showToast(toastOption);
        this.isLoading = false;
      }
    );
  }

  moreInfo(packageId: string): void {
    this.router.navigate([ 'admin/event-management/features-moreInfo', packageId ]);
  }

  hasError(controlName: string, errorName: string) {
    return this.packageForm.controls[controlName].hasError(errorName);
  }
}
