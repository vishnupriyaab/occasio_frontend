// import { Component, Input } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { AuthService } from '../../../core/services/users/auth.service';
// import { ToastService } from '../../../core/services/toaster/toast.service';
// import {
//   emailFormatValidator,
//   noAllSpacesValidator,
// } from '../../validator/formValidator';
// import IToastOption from '../../../core/models/IToastOptions';
// import { Router, RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ForgotPasswordComponent } from '../../../modules/user/forgot-password/forgot-password.component';
// import { OtpComponent } from '../otp/otp.component';
// import { AuthServiceService } from '../../../core/services/employees/auth-service.service';
// import { AdminService } from '../../../core/services/admin/admin.service';

// @Component({
//   selector: 'app-login-form',
//   imports: [
//     RouterModule,
//     ReactiveFormsModule,
//     CommonModule,
//     OtpComponent,
//     ForgotPasswordComponent,
//   ],
//   templateUrl: './login-form.component.html',
//   styleUrl: './login-form.component.css',
// })
// export class LoginFormComponent {
//   @Input() formType: 'user' | 'employee' | 'admin' = 'user';
//   loginForm!: FormGroup;
//   showForgotPasswordModal: boolean = false;
//   showOtpModal: boolean = false;
//   constructor(
//     private fb: FormBuilder,
//     private userAuthService: AuthService,
//     private employeeAuthService: AuthServiceService,
//     private adminAuthService: AdminService,
//     private router: Router,
//     private toastService: ToastService
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: [
//         '',
//         [Validators.required, noAllSpacesValidator(), emailFormatValidator()],
//       ],
//       password: ['', [Validators.required]],
//     });
//   }

//   formOnSubmit() {
//     if (this.loginForm.valid) {
//       const { email, password } = this.loginForm.value;
//       console.log(email, 'email');
//       console.log(password, 'password');
//       if (this.formType === 'user') {
//         this.userAuthService.userLogin(email, password).subscribe(
//           (response) => {
//             console.log('responseeeee', response);
//             const toastOption: IToastOption = {
//               severity: 'success-toast',
//               summary: 'Success',
//               detail: 'login successful',
//             };

//             this.toastService.showToast(toastOption);
//             this.userAuthService.setLoggedIn('true');
//             this.router.navigate(['']);
//             console.log('userloggedddd');
//           },
//           (error) => {
//             if (
//               error.status === 403 &&
//               error.error.message ===
//                 'Account not verified. Please verify your account.'
//             ) {
//               localStorage.setItem('userId', error.error.userId);
//               const toastOption: IToastOption = {
//                 severity: 'warning-toast',
//                 summary: 'Verification Required',
//                 detail: 'Account not verified. Please verify your account.',
//               };
//               this.toastService.showToast(toastOption);
//               this.showOtpModal = true;
//             } else {
//               const toastOption: IToastOption = {
//                 severity: 'danger-toast',
//                 summary: 'Error',
//                 detail:
//                   error.status === 401
//                     ? 'Invalid password'
//                     : error.error.message || 'Error during login',
//               };

//               this.toastService.showToast(toastOption);
//             }
//             console.error('Error during login', error);
//           }
//         );
//       } else if (this.formType === 'employee') {
//         console.log('qwertyuiopertyuiop');
//         this.employeeAuthService.employeeLogin(email, password).subscribe(
//           (response) => {
//             console.log('responseeeee', response);
//             const toastOption: IToastOption = {
//               severity: 'success-toast',
//               summary: 'Success',
//               detail: 'login successful',
//             };

//             this.toastService.showToast(toastOption);
//             this.employeeAuthService.setLoggedIn('true');
//             this.router.navigate(['/employee/dashboard']);
//             console.log('employeeeloggedddd');
//           },
//           (error) => {
//             if (
//               error.status === 403 &&
//               error.error.message ===
//                 'Account not verified. Please verify your account.'
//             ) {
//               localStorage.setItem('employeeId', error.error.userId);
//               const toastOption: IToastOption = {
//                 severity: 'warning-toast',
//                 summary: 'Verification Required',
//                 detail: 'Account not verified. Please verify your account.',
//               };
//               this.toastService.showToast(toastOption);
//               this.showOtpModal = true;
//             } else {
//               const toastOption: IToastOption = {
//                 severity: 'danger-toast',
//                 summary: 'Error',
//                 detail:
//                   error.status === 401
//                     ? 'Invalid password'
//                     : error.error.message || 'Error during login',
//               };

//               this.toastService.showToast(toastOption);
//             }
//             console.error('Error during login', error);
//           }
//         );
//       } else if (this.formType === 'admin') {
//         console.log('1A2B3C4D5E6F7G8H9I');
//         this.adminAuthService.adminLogin(email, password).subscribe(
//           (response) => {
//             console.log(response, 'adminreponseeeeeeeeeeeeeee');
//             const toastOption: IToastOption = {
//               severity: 'success-toast',
//               summary: 'Success',
//               detail: 'login successful',
//             };

//             this.toastService.showToast(toastOption);
//             this.adminAuthService.setLoggedIn('true');
//             this.router.navigate(['/admin/dashboard']);
//             console.log('adminnnLoggeddd');
//           },
//           (error) => {
//             if (
//               error.status === 403 &&
//               error.error.message ===
//                 'Account not verified. Please verify your account.'
//             ) {
//               localStorage.setItem('employeeId', error.error.userId);
//               const toastOption: IToastOption = {
//                 severity: 'warning-toast',
//                 summary: 'Verification Required',
//                 detail: 'Account not verified. Please verify your account.',
//               };
//               this.toastService.showToast(toastOption);
//               this.showOtpModal = true;
//             } else {
//               let toastDetail = error.error.message || 'Error during login';

//               if (error.status === 401) {
//                 toastDetail =
//                   error.error.message === 'Invalid email'
//                     ? 'Invalid email'
//                     : 'Invalid password';
//               }

//               const toastOption: IToastOption = {
//                 severity: 'danger-toast',
//                 summary: 'Error',
//                 detail: toastDetail,
//               };
//               this.toastService.showToast(toastOption);
//             }
//             console.error('Error during login', error);
//           }
//         );
//       }
//     }
//   }

//   onCancel(): void {
//     this.showForgotPasswordModal = false;
//   }

//   showForgotPassword(): void {
//     this.showForgotPasswordModal = true;
//   }

//   onOtpCancel(): void {
//     this.showOtpModal = false;
//   }

//   hasError(controlName: string, errorName: string) {
//     return this.loginForm.controls[controlName].hasError(errorName);
//   }

//   hasFormError(errorName: string) {
//     return this.loginForm.hasError(errorName);
//   }
// }

import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/users/auth.service';
import { ToastService } from '../../../core/services/toaster/toast.service';
import {
  emailFormatValidator,
  noAllSpacesValidator,
} from '../../validator/formValidator';
import IToastOption from '../../../core/models/IToastOptions';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { OtpComponent } from '../otp/otp.component';
import { AuthServiceService } from '../../../core/services/employees/auth-service.service';
import { AdminService } from '../../../core/services/admin/admin.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    OtpComponent,
    ForgotPasswordComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Input() formType: 'user' | 'employee' | 'admin' = 'user';
  loginForm!: FormGroup;
  showForgotPasswordModal = false;
  showOtpModal = false;

  private authServices: Record<string, any>;

  constructor(
    private fb: FormBuilder,
    private userAuthService: AuthService,
    private employeeAuthService: AuthServiceService,
    private adminAuthService: AdminService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.authServices = {
      user: this.userAuthService,
      employee: this.employeeAuthService,
      admin: this.adminAuthService,
    };
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, noAllSpacesValidator(), emailFormatValidator()]],
      password: ['', [Validators.required]],
    });
  }

  formOnSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const authService = this.authServices[this.formType];

    authService?.login(email, password).subscribe(
      (response: any) => {
        console.log(response.data,"wertyuiop")
        this.handleSuccess(response);
      },
      (error: any) => {
        console.log(error,"1234567890")
        this.handleError(error)
      }
    );
  }

  private handleSuccess(response: any): void {
    const toastOption: IToastOption = {
      severity: 'success-toast',
      summary: 'Success',
      detail: 'Login successful',
    };

    this.toastService.showToast(toastOption);
    this.authServices[this.formType].setLoggedIn('true');

    const routes = {
      user: '',
      employee: '/employee/dashboard',
      admin: '/admin/dashboard',
    };
    this.router.navigate([routes[this.formType]]);
  }

  private handleError(error: any): void {
    if (
      error.status === 403 &&
      error.error.message === 'Account not verified. Please verify your account.'
    ) {
      localStorage.setItem(`${this.formType}Id`, error.error.userId);
      const toastOption: IToastOption = {
        severity: 'warning-toast',
        summary: 'Verification Required',
        detail: 'Account not verified. Please verify your account.',
      };
      this.toastService.showToast(toastOption);
      // this.showOtpModal = true;
    } else {
      const toastDetail =
        error.status === 401
          ? error.error.message === 'Invalid email'
            ? 'Invalid email'
            : 'Invalid password'
          : error.error.message || 'Error during login';

      const toastOption: IToastOption = {
        severity: 'danger-toast',
        summary: 'Error',
        detail: toastDetail,
      };
      this.toastService.showToast(toastOption);
    }
    console.error('Error during login', error);
  }

  showForgotPassword(): void {
    this.showForgotPasswordModal = true;
  }

  onCancel(): void {
    this.showForgotPasswordModal = false;
  }

  onOtpCancel(): void {
    this.showOtpModal = false;
  }

  hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
}
