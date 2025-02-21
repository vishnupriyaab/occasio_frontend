import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUserregister, LoginResponse, LogOut } from '../../models/userModel';
import { catchError, map, Observable, of } from 'rxjs';
import { IAuthAPISucessfullResponse } from '../../models/IApiSuccessResponse';
import { OtpResponse } from '../../models/otpModel';
import { ToastService } from '../common/toaster/toast.service';
import IToastOption from '../../models/IToastOptions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private toastService: ToastService) {}

  userRegister(
    userData: IUserregister
  ): Observable<IAuthAPISucessfullResponse> {
    return this.http.post<IAuthAPISucessfullResponse>(
      `${this.baseUrl}user/register`,
      userData
    );
  }
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}user/login`, {
      email,
      password,
    });
  }
  googleLogin(credential: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}user/google-login`, {
      credential,
    });
  }
  logOut(): Observable<LogOut> {
    return this.http.post<LogOut>(`${this.baseUrl}user/logOut`, {});
  }
  forgotPassword(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}user/forgotPassword`,
      { email }
    );
  }
  resendOtp(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}user/resendOtp`, { email });
  }
  resetPassword(
    newPassword: string,
    token: string
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}user/resetPassword`,
      { password: newPassword, token }
    );
  }
  verifyOtp(email: string, otp: string): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this.baseUrl}user/verifyOtp`, {
      email,
      otp,
    });
  }
  isAuthenticated(): Observable<boolean> {
    return this.http
      .get(`${this.baseUrl}user/isAuthenticate`, { withCredentials: true })
      .pipe(
        map(() => true),
        catchError((error) => {
          if (error.error?.message) {
            const toastOption: IToastOption = {
              severity: 'danger-toast',
              summary: 'Error',
              detail: error.error.message,
            };
            this.toastService.showToast(toastOption);
          }
          return of(false);
        })
      );
  }

  showProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}user/showProfile`, {});
  }

  updateProfile(formData: FormData):Observable<any> {
    console.log(formData,"qwertyuio")
    return this.http.put<any>(`${this.baseUrl}user/updateProfile`, formData);
  }

  updateProfileImage(formData: FormData): Observable<any> {
    console.log(formData,"qwertyuio")
    return this.http.put(`${this.baseUrl}user/profileImage`, formData);
  }

  setLoggedIn(status: string) {
    localStorage.setItem('isLoggedIn', status);
  }
}
