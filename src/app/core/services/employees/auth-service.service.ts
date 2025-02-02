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
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = environment.baseUrl;
  
  constructor(private http:HttpClient, private toastService:ToastService) {}

  employeeRegister(employeeData:IEmployeeregister):Observable<IAuthAPISucessfullResponse>{
    return this.http.post<IAuthAPISucessfullResponse>(`${this.baseUrl}employee/register`, employeeData);
  }
  login(email:string,password:string):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}employee/login`, { email, password })
  }
  verifyOtp(email:string,otp:string):Observable<OtpResponse>{
    return this.http.post<OtpResponse>(`${this.baseUrl}employee/verifyEmployeeOtp`, { email, otp } )
  }
  forgotPassword(email:string):Observable<{message:string}>{
    return this.http.post<{message:string}>(`${this.baseUrl}employee/forgotPassword`,{ email })
  }
  resetPassword(newPassword:string,token:string):Observable<{message:string}>{
    return this.http.post<{message:string}>(`${this.baseUrl}employee/resetPassword`,{ password: newPassword, token})
  }
    logOut():Observable<LogOut>{
      return this.http.post<LogOut>(`${this.baseUrl}employee/logOut`,{});
    }
  setLoggedIn(status: string){
    localStorage.setItem( 'isLoggedIn', status );
  }
  isAuthenticated():Observable<boolean>{
        return this.http.get(`${this.baseUrl}employee/isAuthenticate`).pipe(map(()=>true),catchError((error)=>{
          if(error.error?.message){
            const toastOption: IToastOption = {
              severity: 'danger-toast',
              summary: 'Error',
              detail: error.error.message,
            };
            this.toastService.showToast(toastOption);
          }
          return of(false)
        }))
      }
}
