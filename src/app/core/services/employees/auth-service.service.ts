import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthAPISucessfullResponse } from '../../models/IApiSuccessResponse';
import { IEmployeeregister, LoginResponse } from '../../models/employeeModel';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OtpResponse } from '../../models/otpModel';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = environment.baseUrl;
  
  constructor(private http:HttpClient) {}

  employeeRegister(employeeData:IEmployeeregister):Observable<IAuthAPISucessfullResponse>{
    return this.http.post<IAuthAPISucessfullResponse>(`${this.baseUrl}employee/register`, employeeData);
  }
  verifyOtp(email:string,otp:string):Observable<OtpResponse>{
      return this.http.post<OtpResponse>(`${this.baseUrl}employee/verifyEmployeeOtp`, { email, otp } )
    }
    login(email:string,password:string):Observable<LoginResponse>{
      return this.http.post<LoginResponse>(`${this.baseUrl}employee/login`, { email, password })
    }
  setLoggedIn(status: string){
      localStorage.setItem( 'isLoggedIn', status );
    }
    forgotPassword(email:string):Observable<{message:string}>{
      return this.http.post<{message:string}>(`${this.baseUrl}employee/forgotPassword`,{ email })
    }
    resetPassword(newPassword:string,token:string):Observable<{message:string}>{
      return this.http.post<{message:string}>(`${this.baseUrl}employee/resetPassword`,{ password: newPassword, token})
    }
}
