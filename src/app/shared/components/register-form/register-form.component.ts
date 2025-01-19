import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OtpComponent } from '../otp/otp.component';
import { ToastService } from '../../../core/services/toaster/toast.service';
import { AuthService } from '../../../core/services/users/auth.service';
import {
  alphabetsOnlyValidator,
  emailFormatValidator,
  mobileNumberValidator,
  noAllSpacesValidator,
  passwordMatchValidator,
  repeatedCharacterValidator,
  strongPasswordValidator,
} from '../../validator/formValidator';
import { AuthServiceService } from '../../../core/services/employees/auth-service.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, OtpComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  @Input() formType: 'user' | 'employee'  = 'user'; 
  registerForm!: FormGroup;
  isFormSubmited: boolean = false;
  showOtpModal: boolean = false;
  private toastService: ToastService = inject(ToastService);
  constructor(
    private fb: FormBuilder,
    private userAuthService: AuthService,
    private employeeAuthService: AuthServiceService
  ) {
    this.registerForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            alphabetsOnlyValidator(),
            noAllSpacesValidator(),
            repeatedCharacterValidator(),
          ],
        ],
        email: [
          '',
          [Validators.required, noAllSpacesValidator(), emailFormatValidator()],
        ],
        mobile: [
          '',
          [
            Validators.required,
            noAllSpacesValidator(),
            mobileNumberValidator(),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            noAllSpacesValidator(),
            strongPasswordValidator(),
          ],
        ],
        confirmPassword: ['', [Validators.required, noAllSpacesValidator()]],
      },
      { validators: passwordMatchValidator }
    );
  }

  onSubmit() {
    console.log(this.registerForm.value, 'registerForm');
    if (
      !this.registerForm.valid ||
      this.isFormSubmited ||
      this.registerForm?.value.password !==
      this.registerForm?.value.confirmPassword
    ) {
      this.registerForm.markAllAsTouched();
      console.log('Form is invalid');
      return;
    }
    this.isFormSubmited = true;

    const formData = this.registerForm.value;
    if (this.formType === 'employee') {
      this.employeeAuthService.employeeRegister(formData).subscribe(
        (response) => {
          console.log(response, 'employeeResponseee');
          if (response.statusCode === 201) {
            localStorage.setItem('Employee_id', response.data._id);
            console.log(
              localStorage.getItem('Employee_id'),
              'Stored User ID after registration'
            );
            localStorage.setItem('Email', response.data.email);
            this.showOtpModal = true;
          } else {
            this.toastService.showToast({
              severity: 'danger-toast',
              summary: 'Error',
              detail: 'Employee already exists!',
            });
          }
          this.isFormSubmited = false;
        },(err) => {
          console.error(err, 'Error while registering employee');
          this.isFormSubmited = false;
          this.toastService.showToast({
            severity: 'danger-toast',
            summary: 'Error',
            detail: err.error?.message || 'Something went wrong. Please try again!',
          });
        }
      );
    } else if (this.formType === 'user') {
      this.userAuthService.userRegister(formData).subscribe(
        (response) => {
        console.log(response, 'userResponseseseseseses')
        if (response.statusCode === 201) {
          localStorage.setItem('User_id', response.data._id)
          console.log(
            localStorage.getItem('User_id'),
            'Stored User ID after registration'
          );
          localStorage.setItem('Email', response.data.email)
          this.showOtpModal = true;
        } else {
          this.toastService.showToast({
            severity: 'danger-toast',
            summary: 'Error',
            detail: 'User already exists!',
          });
        }
        this.isFormSubmited = false;
      },(err) => {
        console.error(err, 'Error while registering user')
        this.isFormSubmited = false;
        this.toastService.showToast({
          severity: 'danger-toast',
          summary: 'Error',
          detail: err.error?.message || 'Something went wrong. Please try again!',
        });
      }
    );
    }
  }

  onOtpCancel(): void {
    this.showOtpModal = false;
  }

  hasError(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  hasFormError(errorName: string) {
    return this.registerForm.hasError(errorName)
  }
}
