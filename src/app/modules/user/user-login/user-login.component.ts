import { Component, NgZone, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
// import { LoginFormComponent } from '../../../shared/components/common/login-form/login-form.component';
import { AuthService } from '../../../core/services/users/auth.service';
import IToastOption from '../../../core/models/IToastOptions';
import { ToastService } from '../../../core/services/toaster/toast.service';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../../../shared/components/login-form/login-form.component';

declare var google: any;
@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginFormComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(
    private userAuthService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private ngZone: NgZone
  ) {}
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '309306198906-alk49laedlhkbamt2p1a6g9g28ni98lt.apps.googleusercontent.com',
      callback: (resp: any) => {
        console.log(resp, 'responseeeee');
        this.handleLogin(resp);
      },
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'medium',
      shape: 'rectangle',
      width: 350,
    });
  }

  handleLogin(credential: any) {
    this.userAuthService.googleLogin(credential).subscribe({
      next: (response) => {
        console.log(response);
        const toastOption: IToastOption = {
          severity: 'success-toast',
          summary: 'Success',
          detail: 'Login successful',
        };
        this.toastService.showToast(toastOption);
        this.userAuthService.setLoggedIn('true');
        this.router.navigate(['']);
        console.log('user registered successfully.');
      },
      error: (error) => {
        console.log(error,"1234567890")
        this.ngZone.run(()=>{
          this.errorMessage = error.error.message || 'An error occurred during Google login';
        })
        console.log('google login failed', this.errorMessage); 
      }
  });
  }
}
