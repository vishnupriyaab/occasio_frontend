import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  emailFormatValidator,
  noAllSpacesValidator,
} from '../../validator/formValidator';
import { AuthService } from '../../../core/services/users/auth.service';
import { ToastService } from '../../../core/services/common/toaster/toast.service';
import IToastOption from '../../../core/models/IToastOptions';
import { AuthServiceService } from '../../../core/services/employees/authService/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  @Input() formType: 'user' | 'employee' | 'admin' = 'user';
  @Input() showForgotPasswordModal: boolean = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() otpTrigger = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private userAuthService: AuthService,
    private employeeAuthService: AuthServiceService,
    private toastService: ToastService
  ){}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [Validators.required, noAllSpacesValidator(), emailFormatValidator()],
      ],
    })
  }

  onSubmitForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      console.log(this.forgotPasswordForm.value);
      const { email } = this.forgotPasswordForm.value;
      console.log(email, 'emaillll');
      const authService =
        this.formType === 'employee'
          ? this.employeeAuthService
          : this.userAuthService;

      authService.forgotPassword(email).subscribe(
        (response) => {
          console.log('responseeeeses', response);
          const toastOption: IToastOption = {
            severity: 'warning-toast',
            summary: 'Waring',
            detail: 'Password reset link sent to your email',
          };

          this.toastService.showToast(toastOption);
          console.log('Password reset link sent to your email');
          this.showForgotPasswordModal = false;
          this.cancel.emit();
        },
        (error) => {
          const toastOption: IToastOption = {
            severity: 'danger-toast',
            summary: 'Error',
            detail: error.error?.message || 'Error sending reset link',
          };

          this.toastService.showToast(toastOption);
        }
      );
    }
  }
  
  onCancel() {
    this.showForgotPasswordModal = false;
    this.cancel.emit();
  }
  hasError(controlName: string, errorName: string) {
    return this.forgotPasswordForm.controls[controlName].hasError(errorName);
  }

  hasFormError(errorName: string) {
    return this.forgotPasswordForm.hasError(errorName);
  }
}
