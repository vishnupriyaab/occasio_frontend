import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { IAuthAPISucessfullResponse } from '../../models/IApiSuccessResponse';
import { IEmployeeregister, LoginResponse } from '../../models/employeeModel';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OtpResponse } from '../../models/otpModel';
import IToastOption from '../../models/IToastOptions';
import { ToastService } from '../toaster/toast.service';
import { LogOut } from '../../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private toastService: ToastService) {}

  employeeRegister(
    employeeData: IEmployeeregister
  ): Observable<IAuthAPISucessfullResponse> {
    return this.http.post<IAuthAPISucessfullResponse>(
      `${this.baseUrl}employee/register`,
      employeeData
    );
  }
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}employee/login`, {
      email,
      password,
    });
  }
  verifyOtp(email: string, otp: string): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(
      `${this.baseUrl}employee/verifyEmployeeOtp`,
      { email, otp }
    );
  }
  forgotPassword(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}employee/forgotPassword`,
      { email }
    );
  }
  resetPassword(
    newPassword: string,
    token: string
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}employee/resetPassword`,
      { password: newPassword, token }
    );
  }
  logOut(): Observable<LogOut> {
    return this.http.post<LogOut>(`${this.baseUrl}employee/logOut`, {});
  }
  setLoggedIn(status: string) {
    localStorage.setItem('isLoggedIn', status);
  }
  isAuthenticated(): Observable<boolean> {
    return this.http.get(`${this.baseUrl}employee/isAuthenticate`).pipe(
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

  resendOtp(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/resendOtp`, { email });
  }

  searchandFilterEmployee(
    searchTerm: string,
    filterStatus: string,
    page: number = 1,
    limit: number = 10
  ): Observable<{
    data: any;
    totalCount: number;
    message: string;
    statusCode: number;
  }> {
    console.log(searchTerm, filterStatus, page, limit, '1234567890-');
    let params: { [key: string]: string } = {
      searchTerm,
      page: page.toString(),
      limit: limit.toString(),
    };
    if (filterStatus && filterStatus !== 'all') {
      params = { ...params, filterStatus };
    }
    return this.http.get<{
      data: any;
      totalCount: number;
      message: string;
      statusCode: number;
    }>(`${this.baseUrl}employee/searchEmployee`, { params });
  }
  blockEmployee(employeeId:string):Observable<IAuthAPISucessfullResponse>{
    return this.http.patch<IAuthAPISucessfullResponse>(`${this.baseUrl}employee/blockEmployee/${employeeId}`,{});
  }
}
