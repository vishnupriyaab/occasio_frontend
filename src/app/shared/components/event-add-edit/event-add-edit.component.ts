import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toaster/toast.service';
import { EventServiceService } from '../../../core/services/event-management/event-service.service';
import { noAllSpacesValidator } from '../../validator/formValidator';
import IToastOption from '../../../core/models/IToastOptions';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-event-add-edit',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './event-add-edit.component.html',
  styleUrl: './event-add-edit.component.css',
})
export class EventAddEditComponent implements OnInit {
  @Input() isModalOpen = false;
  @Input() modalMode: 'add' | 'edit' = 'add';
  @Input() eventData: any = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() eventAdded = new EventEmitter<void>();

  eventForm!: FormGroup;
  isLoading = false;
  selectedImg: File | null = null;

  private allowedImageTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
  ];

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private eventAuthService: EventServiceService
  ) {}
  ngOnInit(): void {
    this.initForm();
    if (this.eventData && this.modalMode === 'edit') {
      this.patchFormData();
    }
  }

  private initForm(): void {
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

  private patchFormData(): void {
    this.eventForm.patchValue({
      eventName: this.eventData.eventName,
      description: this.eventData.description,
    });
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
        event.target.value = '';
        this.eventForm.patchValue({ img: null });
        this.selectedImg = null;
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
        event.target.value = '';
        this.eventForm.patchValue({ img: null });
        this.selectedImg = null;
        return;
      }

      this.selectedImg = file;
      this.eventForm.patchValue({ img: file });
      this.eventForm.get('img')?.markAsTouched();
    }
  }

  handleSubmit(): void {
    if (!this.eventForm.valid) {
      Object.keys(this.eventForm.controls).forEach((key) => {
        const control = this.eventForm.get(key);
        control?.markAsTouched();
      });

      const toastOption: IToastOption = {
        severity: 'danger-toast',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly',
      };
      this.toastService.showToast(toastOption);
      return;
    }

    const formData = new FormData();
    formData.append('eventName', this.eventForm.get('eventName')?.value);
    formData.append('description', this.eventForm.get('description')?.value);

    if (this.selectedImg) {
      formData.append('img', this.selectedImg);
    }

    this.isLoading = true;

    if (this.modalMode === 'edit' && this.eventData?._id) {
      this.updateEvent(formData);
    } else {
      this.createEvent(formData);
    }
  }

  private createEvent(formData: FormData): void {
    this.eventAuthService.createEvent(formData).subscribe({
      next: (response) => {
        if (response.statusCode === 201) {
          const toastOption: IToastOption = {
            severity: 'success-toast',
            summary: 'Success',
            detail: 'Event created successfully!',
          };
          this.toastService.showToast(toastOption);
          this.handleClose();
          this.eventAdded.emit();
        }
      },
      error: (error) => {
        const toastOption: IToastOption = {
          severity: 'danger-toast',
          summary: 'Error',
          detail: error.error?.message || 'Failed to create event.',
        };
        this.toastService.showToast(toastOption);
        this.isLoading = false;
      }
    });
  }

  private updateEvent(formData: FormData): void {
    this.eventAuthService.updateEvent(this.eventData._id, formData).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          const toastOption: IToastOption = {
            severity: 'success-toast',
            summary: 'Success',
            detail: 'Event updated successfully!',
          };
          this.toastService.showToast(toastOption);
          this.handleClose();
          this.eventAdded.emit();
        }
      },
      error: (error) => {
        const toastOption: IToastOption = {
          severity: 'danger-toast',
          summary: 'Error',
          detail: error.error?.message || 'Failed to update event.',
        };
        this.toastService.showToast(toastOption);
        this.isLoading = false;
      }
    });
  }

  handleClose(): void {
    this.eventForm.reset();
    this.selectedImg = null;
    this.closeModal.emit();
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.eventForm.controls[controlName].hasError(errorName);
  }

}
