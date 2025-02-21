// import { Component, OnInit } from '@angular/core';
// import { FooterComponent } from '../../../shared/components/user/footer/footer.component';
// import { UserScndNavComponent } from '../../../shared/components/user-scnd-nav/user-scnd-nav.component';
// import { AuthService } from '../../../core/services/users/auth.service';
// import { User } from '../../../core/models/userModel';
// import IToastOption from '../../../core/models/IToastOptions';
// import { ToastService } from '../../../core/services/toaster/toast.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-user-profile',
//   standalone: true,
//   imports: [FooterComponent, UserScndNavComponent, CommonModule],
//   templateUrl: './user-profile.component.html',
//   styleUrl: './user-profile.component.css',
// })
// export class UserProfileComponent implements OnInit {
//   userProfile: User | undefined;
//   editMode: boolean = false;
//   editForm!: FormGroup;
//   selectedImage: File | null = null;
//   imagePreview: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private userAuthService: AuthService,
//     private toastService: ToastService,
//     private router: Router
//   ) {
//     this.editForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       email: ['', [Validators.required, Validators.email]],
//       mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//       image: [null],
//     });
//   }

//   ngOnInit(): void {
//     this.showProfile();
//   }

//   onFileSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files?.length) {
//       this.selectedImage = input.files[0];
//       this.createImagePreview();
//     }
//   }

//   createImagePreview() {
//     if (this.selectedImage) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         this.imagePreview = e.target?.result as string;
//       };
//       reader.readAsDataURL(this.selectedImage);
//     }
//   }

//   closeImageModal() {
//     this.showImageModal = false;
//     this.selectedImage = null;
//     this.imagePreview = null;
//   }

//   updateProfileImage() {
//     if (this.selectedImage) {
//       const formData = new FormData();
//       formData.append('image', this.selectedImage);

//       this.userAuthService.updateProfileImage(formData).subscribe({
//         next: (response) => {
//           this.showProfile();
//           this.closeImageModal();
//           const toastOption: IToastOption = {
//             severity: 'success-toast',
//             summary: 'Success',
//             detail: 'Profile image updated successfully',
//           };
//           this.toastService.showToast(toastOption);
//         },
//         error: (error) => {
//           console.error(error);
//           const toastOption: IToastOption = {
//             severity: 'danger-toast',
//             summary: 'Error',
//             detail: 'Failed to update profile image',
//           };
//           this.toastService.showToast(toastOption);
//         },
//       });
//     }
//   }

//   showProfile() {
//     this.userAuthService.showProfile().subscribe({
//       next: (response) => {
//         this.userProfile = response.data;
//         this.imagePreview = this.userProfile?.imageUrl || 'assets/user.png';
//         this.editForm.patchValue({
//           name: this.userProfile?.name,
//           email: this.userProfile?.email,
//           mobile: this.userProfile?.mobile,
//         });
//       },
//       error: (error) => {
//         console.log(error);
//       },
//     });
//   }
//   logOut() {
//     this.userAuthService.logOut().subscribe({
//       next: (response) => {
//         console.log(response);
//         const toastOption: IToastOption = {
//           severity: 'success-toast',
//           summary: 'Success',
//           detail: 'Logout successful',
//         };
//         this.toastService.showToast(toastOption);
//         localStorage.removeItem('isLoggedIn');
//         this.router.navigate(['/user-login']);
//       },
//       error: (error) => {
//         console.log(error);
//         const toastOption = {
//           severity: 'danger-toast',
//           summary: 'Error',
//           detail: 'Logout failed',
//         };
//         this.toastService.showToast(toastOption);
//       },
//     });
//   }

//   // editProfile(){
//   //   this.userAuthService.editProfile().subscribe({
//   //     next: (response)=>{
//   //       console.log(response);
//   //     },error:(error)=>{
//   //       console.log(error);
//   //     }
//   //   })
//   // }
// }

import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../shared/components/user/footer/footer.component';
import { UserScndNavComponent } from '../../../shared/components/user-scnd-nav/user-scnd-nav.component';
import { AuthService } from '../../../core/services/users/auth.service';
import { User } from '../../../core/models/userModel';
import { ToastService } from '../../../core/services/common/toaster/toast.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  emailFormatValidator,
  mobileNumberValidator,
  noAllSpacesValidator,
  passwordMatchValidator,
} from '../../../shared/validator/formValidator';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    FooterComponent,
    UserScndNavComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  userProfile: User | undefined;
  editMode = false;
  editForm!: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string = 'user.png';
  showImageModal = false;
  isImgModalOpen: boolean = false;
  isProfileModalOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userAuthService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.editForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            noAllSpacesValidator(),
          ],
        ],
        email: [
          '',
          [Validators.required, noAllSpacesValidator(), emailFormatValidator()],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.loadProfile();
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

  loadProfile(): void {
    this.userAuthService.showProfile().subscribe({
      next: (response) => {
        console.log(response, '123456789');
        this.userProfile = response.data;
        this.imagePreview = this.userProfile?.imageUrl || 'user.png';
        this.editForm.patchValue({
          name: this.userProfile?.name,
          email: this.userProfile?.email,
          mobile: this.userProfile?.mobile,
        });
      },
      error: (error) => console.error(error),
    });
  }

  updateProfileImage(): void {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('img', this.selectedImage);
      console.log(formData, '12345678');
      this.userAuthService.updateProfileImage(formData).subscribe({
        next: (response) => {
          console.log(response, 'res');
          this.toastService.showToast({
            severity: 'success-toast',
            summary: 'Success',
            detail: 'Profile picture updated successfully',
          });
          this.loadProfile();
          this.isImgModalOpen = false;
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
      this.userAuthService.updateProfile(formData).subscribe({
        next: (response) => {
          console.log(response, 'responseee');
          this.toastService.showToast({
            severity: 'success-toast',
            summary: 'Success',
            detail: 'Profile updated successfully',
          });
          this.loadProfile();
          this.isProfileModalOpen = false;
        },
        error: (error) => {
          this.toastService.showToast({
            severity: 'danger-toast',
            summary: 'Error',
            detail: error.error.message || 'Failed to update profile',
          });
        },
      });
    }
  }

  logOut(): void {
    this.userAuthService.logOut().subscribe({
      next: () => {
        localStorage.removeItem('isLoggedIn');
        this.router.navigate(['/user-login']);
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

  hasError(controlName: string, errorName: string) {
    return this.editForm.controls[controlName].hasError(errorName);
  }
}
