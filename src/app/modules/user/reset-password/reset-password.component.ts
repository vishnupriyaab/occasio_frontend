import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../core/services/common/toaster/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { passwordMatchValidator } from '../../../shared/validator/formValidator';
import { AuthService } from '../../../core/services/users/auth.service';
import IToastOption from '../../../core/models/IToastOptions';
import {jwtDecode} from 'jwt-decode'
import { AuthServiceService } from '../../../core/services/employees/authService/auth-service.service';


@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})

export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  private token!: string;
  decodedToken:any;
  private toastService: ToastService = inject(ToastService);
  private authService: AuthService = inject(AuthService);
  private employeeAuthService:AuthServiceService = inject(AuthServiceService)
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParams['token'];
    console.log('Token from query params:', this.token);

    if (this.token) {
      try {
        this.decodedToken = jwtDecode(this.token);
        console.log('Decoded Token:', this.decodedToken);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }

    this.resetPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validator: passwordMatchValidator }
    );
  }

  onSubmitConfirmPassword() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.password;
      console.log(newPassword, '111');
      console.log(this.token, "tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
  
      const authService =
        this.decodedToken.role === 'user'
          ? this.authService
          : this.employeeAuthService;
      const redirectRoute =
        this.decodedToken.role === 'user' ? '/user-login' : '/employee-login';
  
      authService.resetPassword(newPassword, this.token).subscribe(
        (response) => {
          console.log(response, 'response');
          const toastOption: IToastOption = {
            severity: 'success-toast',
            summary: 'Success',
            detail: 'Password reset successful',
          };
          this.toastService.showToast(toastOption);
          console.log('Password reset successful');
          this.router.navigate([redirectRoute]);
        },
        (err) => {
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: err.error.message || 'Password reset failed',
          };
          this.toastService.showToast(toastOption);
          console.error('Password reset failed', err);
        }
      );
    } else {
      console.log('form is invalid');
    }
  }
  

  onCancel(){

  }

  hasError(controlName: string, errorName: string) {
    return this.resetPasswordForm.controls[controlName].hasError(errorName);
  }

  hasFormError(errorName: string) {
    return this.resetPasswordForm.hasError(errorName);
  }
}
