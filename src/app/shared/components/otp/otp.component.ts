import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { otpPattern } from '../../validator/formValidator';
import { AuthService } from '../../../core/services/users/auth.service';
import IToastOption from '../../../core/models/IToastOptions';
import { ToastService } from '../../../core/services/toaster/toast.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../core/services/employees/auth-service.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;
  timer: number = 10;
  timerInterval: any;
  isTimerDisabled: boolean = false;
  isResendDisabled: boolean = true;

  @Input() showOtpModal:boolean = false;
  @Input() formType: 'user' | 'employee'  = 'user';
  @Output() cancel = new EventEmitter<void>()

  private toastService: ToastService = inject(ToastService);
  constructor(
    private fb: FormBuilder,
    private userAuthService: AuthService,
    private employeeAuthService: AuthServiceService,
    private router: Router
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, otpPattern()]],
    });
  }

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // startTimer() {
  //   console.log("enetered startTimer")
  //   this.timer = 10;
  //   this.isTimerDisabled = true;
  //   const interval = setInterval(() => {
  //     this.timer--;
  //     if (this.timer <= 0) {
  //       clearInterval(interval);
  //       this.isTimerDisabled = false;
  //     }
  //   }, 1000);
  // }

  startTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    this.timer = 30;
    this.isTimerDisabled = true;
    this.isResendDisabled = true;

    this.timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
        this.isTimerDisabled = false;
        this.isResendDisabled = false;
      }
    }, 1000);
  }


  resendOtp(){
    if (this.isResendDisabled) return;

    const email = localStorage.getItem('Email');
    if (!email) {
      const toastOption: IToastOption = {
        severity: 'danger-toast',
        summary: 'Error',
        detail: 'Email not found'
      };
      this.toastService.showToast(toastOption);
      return;
    }

    const service = this.formType === 'user' 
      ? this.userAuthService 
      : this.employeeAuthService;

    service.resendOtp(email).subscribe({
      next: (response) => {
        console.log(response,"responseqwerty")
        const toastOption: IToastOption = {
          severity: 'success-toast',
          summary: 'Success',
          detail: 'OTP has been resent to your email'
        };
        this.toastService.showToast(toastOption);
        this.startTimer();
      },
      error: (error) => {
        console.log(error,"1234567890")
        const toastOption: IToastOption = {
          severity: 'danger-toast',
          summary: 'Error',
          detail: error.error.message || 'Failed to resend OTP'
        };
        this.toastService.showToast(toastOption);
      }
    });
  }


  onSubmit(): void {
    console.log(this.otpForm.valid, 'true or false');
    if (this.otpForm.valid) {
      const otpValue = this.otpForm.value.otp;
      const email = localStorage.getItem('Email');

      if(this.formType === 'user'){
        console.log(email,"123456789012345678901234567890")
        this.userAuthService
          .verifyOtp(email as string, otpValue)
          .subscribe((response) => {
            console.log(response, 'responseeee');
            const toastOption: IToastOption = {
              severity: 'success-toast',
              summary: 'Success',
              detail: 'OTP verified successfully'
            }
  
            this.toastService.showToast(toastOption);
            localStorage.removeItem('User_id');
            localStorage.removeItem('Email');
              this.router.navigate(['/user-login']);
          },error=>{
            const toastOption: IToastOption = {
              severity: 'danger-toast', 
              summary: 'Error', 
              detail: error.error.message || 'Invalid OTP',
            }
      
            this.toastService.showToast(toastOption); 
            console.error('Error during OTP verification', error);
          });
        console.log(otpValue, email, 'otpValue');

      }else if(this.formType === 'employee'){
        console.log(email,"ABCDEFGHIJKLMNOPQRSTUVWXYZ")
        this.employeeAuthService
          .verifyOtp(email as string, otpValue)
          .subscribe((response) => {
            console.log(response, 'responseeee');
            const toastOption: IToastOption = {
              severity: 'success-toast',
              summary: 'Success',
              detail: 'OTP verified successfully'
            }
  
            this.toastService.showToast(toastOption);
            localStorage.removeItem('Employee_id');
            localStorage.removeItem('Email');
              this.router.navigate(['/employee-login']);
          },error=>{
            const toastOption: IToastOption = {
              severity: 'danger-toast', 
              summary: 'Error', 
              detail: error.error.message || 'Invalid OTP',
            }
      
            this.toastService.showToast(toastOption); 
            console.error('Error during OTP verification', error);
          });
        console.log(otpValue, email, 'otpValue');
      }

    } else {
      this.otpForm.markAllAsTouched();
      console.log('Form is invalid');
      return;
    }
  }

  onCancel(): void {
    this.cancel.emit(); 
  }

  hasError(controlName: string, errorName: string) {
    return this.otpForm.controls[controlName].hasError(errorName);
  }

  hasFormError(errorName: string) {
    return this.otpForm.hasError(errorName);
  }
}
