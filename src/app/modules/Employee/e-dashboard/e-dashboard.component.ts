import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../core/services/employees/auth-service.service';
import { Employee } from '../../../core/models/employeeModel';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/common/toaster/toast.service';
import { emailFormatValidator, noAllSpacesValidator, passwordMatchValidator } from '../../../shared/validator/formValidator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './e-dashboard.component.html',
  styleUrl: './e-dashboard.component.css',
})
export class EDashboardComponent implements OnInit {
  employeeProfile: Employee | undefined;
  editForm!: FormGroup;
  imagePreview: string = 'user.png';
  isProfileModalOpen: boolean = false;
  isImgModalOpen: boolean = false;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeAuthService: AuthServiceService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.editForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(3),noAllSpacesValidator(),]],
          email: ['', [Validators.required, noAllSpacesValidator(), emailFormatValidator()]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required]]
        },{validator: passwordMatchValidator});
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.employeeAuthService.showProfile().subscribe({
      next: (response) => {
        console.log(response, '123456789');
        this.employeeProfile = response.data;
        this.imagePreview = this.employeeProfile?.imageUrl || 'user.png';
        this.editForm.patchValue({
          name: this.employeeProfile?.name,
          email: this.employeeProfile?.email,
          mobile: this.employeeProfile?.mobile,
        });
      },
      error: (error) => console.error(error),
    });
  }

  isProfileModal() {
    this.isProfileModalOpen = !this.isProfileModalOpen;
  }

  imgModal() {
    this.isImgModalOpen = !this.isImgModalOpen;
  }

  previewImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      console.log(this.selectedImage, 'wertyu');
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfileImage(): void {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('img', this.selectedImage);
      console.log(formData, '12345678');
      this.employeeAuthService.updateProfileImage(formData).subscribe({
        next: (response) => {
          console.log(response, 'res');
          this.toastService.showToast({
            severity: 'success-toast',
            summary: 'Success',
            detail: 'Profile picture updated successfully',
          });
          this.loadProfile();
          this.isImgModalOpen = false;
          this.isProfileModalOpen = false;
        },
        error: (error) => {
          this.toastService.showToast({
            severity: 'danger-toast',
            summary: 'Error',
            detail: error.error.message || 'Failed to update profile picture',
          });
        },
      });
    }
  }

  updateProfile(): void {
    if (this.editForm.valid) {
      const formData = this.editForm.value;
      this.employeeAuthService.updateProfile(formData).subscribe({
        next:(response)=>{
          console.log(response,"responseee")
            this.toastService.showToast({
              severity: 'success-toast',
              summary: 'Success',
              detail: 'Profile updated successfully'
            });
            this.loadProfile();
            this.isProfileModalOpen = false;
        },error:(error) => {
          this.toastService.showToast({
            severity: 'danger-toast',
            summary: 'Error',
            detail: error.error.message || 'Failed to update profile'
          });
        }
      });
    }
  }
  logOut(): void {
    this.employeeAuthService.logOut().subscribe({
      next: () => {
        localStorage.removeItem('isLoggedIn');
        this.router.navigate(['/employee-login']);
        this.toastService.showToast({
          severity: 'success-toast',
          summary: 'Success',
          detail: 'Logged out successfully',
        });
      },
      error: (error) => {
        console.error(error);
        this.toastService.showToast({
          severity: 'danger-toast',
          summary: 'Error',
          detail: 'Logout failed',
        });
      },
    });
  }
}
