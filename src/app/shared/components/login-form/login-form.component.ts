import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/users/auth.service';
import { ToastService } from '../../../core/services/common/toaster/toast.service';
import {
  emailFormatValidator,
  noAllSpacesValidator,
} from '../../validator/formValidator';
import IToastOption from '../../../core/models/IToastOptions';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { OtpComponent } from '../otp/otp.component';
import { AuthServiceService } from '../../../core/services/employees/authService/auth-service.service';
import { AdminService } from '../../../core/services/admin/authService/admin.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    ForgotPasswordComponent,
    OtpComponent
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
      this.showOtpModal = true;
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
