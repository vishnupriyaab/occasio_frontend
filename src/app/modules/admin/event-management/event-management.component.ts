import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noAllSpacesValidator } from '../../../shared/validator/formValidator';
import { ToastService } from '../../../core/services/toaster/toast.service';
import IToastOption from '../../../core/models/IToastOptions';
import { EventServiceService } from '../../../core/services/event-management/event-service.service';
import { SweetAlertService } from '../../../core/services/sweetAlert/sweet-alert.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { PackageManagementComponent } from '../package-management/package-management.component';
import { SearchComponent } from '../../../shared/components/search/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { TableComponent } from "../../../shared/components/table/table.component";

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingComponent,
    SearchComponent,
    PaginationComponent,
    PackageManagementComponent,
    TableComponent
],
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.css',
})
export class EventManagementComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent!: SearchComponent;
  @ViewChild(PackageManagementComponent)
  packageManager!: PackageManagementComponent;


  isModalOpen = false;
  isLoading = false;
  events: any[] = [];
  packages: any[] = [];
  isLoadingPackages = false;
  selectedEventId: string | null = null;
  eventForm!: FormGroup;
  selectedImg: File | null = null;
  modalMode: 'add' | 'edit' = 'add';
  selectedEvent: any = null;
  currentFilter: string = 'all';
  imagePreviewUrl: string | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  filteredEvents: any[] = [];

  private allowedImageTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
  ];

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private eventAuthService: EventServiceService,
    private sweetAlert: SweetAlertService
  ) {
    this.eventForm = this.fb.group({
      eventName: [
        '',
        [Validators.required, noAllSpacesValidator(), Validators.minLength(3)],
      ],
      description: [
        '',
        [Validators.required, noAllSpacesValidator(), Validators.minLength(10)],
      ],
      img: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchEvents();
    console.log(this.packageManager, 'qwertyuiop');
  }

  onSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredEvents = [...this.events];
      this.totalItems = this.events.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.currentPage = 1;
      return;
    }
    this.isLoading = true;
    console.log(this.currentFilter, '098765432');
    this.eventAuthService
      .searchandFilterEvent(
        searchTerm,
        this.currentFilter,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (response) => {
          console.log(response.data, 'responeeseesese');
          this.filteredEvents = response.data.events;
          this.totalItems = response.data.totalEvents;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.isLoading = false;
          console.log('finishedddddddddddd');
        },
        error: (error) => {
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'Failed to search events',
          };
          this.toastService.showToast(toastOption);
          this.isLoading = false;
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
      this.fetchEvents();
    }
  }

  removePreview(): void {
    this.imagePreviewUrl = null;
    this.selectedImg = null;
    this.eventForm.patchValue({
      img: null,
    });
    const fileInput = document.getElementById(
      'uploadImage'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  async convertUrlToFile(imageUrl: string): Promise<File> {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const filename = imageUrl.split('/').pop() || 'image.jpg';
      const file = new File([blob], filename, { type: blob.type });
      return file;
    } catch (error) {
      console.error('Error converting URL to File:', error);
      throw error;
    }
  }

  async toggleModal(event: any = null) {
    this.isModalOpen = !this.isModalOpen;
    if (event) {
      this.modalMode = 'edit';
      this.selectedEvent = event;
      this.selectedEventId = event._id;
      console.log(this.selectedEventId, '0987654321');
      this.imagePreviewUrl = event.image;
      this.eventForm.patchValue({
        eventName: event.eventName,
        description: event.description,
      });
      // this.selectedEventId = event.id;
      // console.log(this.selectedEventId, 'qwertyuiertyuiopdfghjkl;');
    } else {
      this.modalMode = 'add';
      this.eventForm.reset();
      this.selectedEventId = null;
      this.selectedEvent = null;
      this.imagePreviewUrl = null;
    }
    if (!this.isModalOpen) {
      this.eventForm.reset();
      this.selectedImg = null;
      this.imagePreviewUrl = null;
      this.selectedEvent = null;
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];

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
        this.eventForm.patchValue({
          img: null,
        });
        this.selectedImg = null;
        this.imagePreviewUrl = null;
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
        this.eventForm.patchValue({
          img: null,
        });
        this.selectedImg = null;
        this.imagePreviewUrl = null;
        return;
      }

      this.imagePreviewUrl = URL.createObjectURL(file);
      this.selectedImg = file;
      this.eventForm.patchValue({
        img: file,
      });
      this.eventForm.get('img')?.markAsTouched();
    }
  }

  addEvent(): void {
    if (!this.eventForm.valid) {
      console.log('12345678902345678');
      Object.keys(this.eventForm.controls).forEach((key) => {
        const control = this.eventForm.get(key);
        control?.markAsTouched();
      });
      console.log('Form is invalid');
      const toastOption: IToastOption = {
        severity: 'danger-toast',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly',
      };
      this.toastService.showToast(toastOption);
      return;
    }

    console.log('Event submitted!');
    const formData = new FormData();
    formData.append('eventName', this.eventForm.get('eventName')?.value);
    formData.append('description', this.eventForm.get('description')?.value);

    if (this.selectedImg) {
      formData.append('img', this.selectedImg);
    }

    console.log(formData, 'formData');
    console.log(this.selectedEventId, 'selectedEventId');

    if (this.selectedEventId) {
      //update Event
      console.log('edit');
      this.eventAuthService
        .updateEvent(this.selectedEventId, formData)
        .subscribe((res) => {
          this.isLoading = true;
          console.log(res, 'responseee------------');
          if (res.statusCode === 200) {
            const toastOption: IToastOption = {
              severity: 'success-toast',
              summary: 'Success',
              detail: 'Event updated successfully!',
            };
            this.toastService.showToast(toastOption);
          }
          this.toggleModal();
          this.fetchEvents();
        });
    } else {
      this.isLoading = true;
      this.eventAuthService.createEvent(formData).subscribe(
        (response) => {
          console.log(response, 'response');
          // this.isLoading = false;
          if (response.statusCode === 201) {
            const toastOption: IToastOption = {
              severity: 'success-toast',
              summary: 'Success',
              detail: 'Event created successfully!',
            };
            this.toastService.showToast(toastOption);
            console.log('Event created successfully');
            this.toggleModal();
            this.fetchEvents();
          } else {
            const toastOption: IToastOption = {
              severity: 'danger-toast',
              summary: 'Error',
              detail: 'An unexpected error occurred while creating the event.',
            };
            this.toastService.showToast(toastOption);
            this.toggleModal();
            console.error('Unexpected status code:', response?.statusCode);
          }
        },
        (error) => {
          console.log(error);
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: error.error?.message || 'Failed to create event.',
          };
          this.toastService.showToast(toastOption);
          this.toggleModal();
          console.error('Error while creating event:', error);
        }
      );
    }
  }

  fetchEvents(): void {
    this.isLoading = true;
    this.eventAuthService
      .searchandFilterEvent(
        '',
        this.currentFilter,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (response) => {
          if (response.data?.events) {
            this.events = response.data.events;
            this.filteredEvents = [...this.events];
          } else {
            this.events = [];
            this.filteredEvents = [];
          }
          this.totalItems = response.data.totalEvents;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching events:', error);
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'Failed to fetch events',
          };
          this.toastService.showToast(toastOption);
          this.isLoading = false;
        },
      });
  }

  blockStatus(event:{eventId: string, currentStatus: boolean}): void {
    this.isLoading = true;
    this.eventAuthService.blockEvent(event.eventId).subscribe(
      (response) => {
        console.log(response, 'resssssssssss');
        if (response.statusCode === 200) {
          const toastOption: IToastOption = {
            severity: 'success-toast',
            summary: 'Success',
            detail: `Event ${
              event.currentStatus ? 'unblocked' : 'blocked'
            } successfully!`,
          };
          this.toastService.showToast(toastOption);
          this.fetchEvents();
        } else {
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'Failed to update event status.',
          };
          this.toastService.showToast(toastOption);
        }
        this.isLoading = false;
      },
      (error) => {
        const toastOption: IToastOption = {
          severity: 'danger-toast',
          summary: 'Error',
          detail: error.error?.message || 'Failed to update event status.',
        };
        this.toastService.showToast(toastOption);
        this.isLoading = false;
      }
    );
  }

  deleteEvent(eventId: string): void {
    this.isLoading = true;
    this.sweetAlert
      .confirmationAlert('Are you sure?', "You won't be able to revert this!")
      .then((result) => {
        if (result.isConfirmed) {
          this.eventAuthService.deleteEvent(eventId).subscribe(
            (response) => {
              this.isLoading = false;
              console.log(response, 'Event deleted successfully');
              this.sweetAlert.successAlert(
                'Deleted!',
                'Your event has been deleted.'
              );
              this.fetchEvents();
            },
            (error) => {
              // this.isLoading = false;
              console.error('Error deleting event:', error);
              const toastOption: IToastOption = {
                severity: 'danger-toast',
                summary: 'Error',
                detail:
                  error.error?.message ||
                  'There was a problem deleting the event.',
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

  packageVisibility(eventId: string): void {
    console.log(this.packageManager, 'qwertyuiopo000000');
    this.selectedEventId = this.selectedEventId === eventId ? null : eventId;
    if (this.selectedEventId) {
      console.log(this.packageManager, '11111');
      this.packageManager.showPackages(eventId);
    }
  }

  closePackageModal(): void {
    this.selectedEventId = null;
  }

  hasError(controlName: string, errorName: string) {
    return this.eventForm.controls[controlName].hasError(errorName);
  }
}
