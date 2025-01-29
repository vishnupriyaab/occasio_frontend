import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUserregister, LoginResponse, LogOut, User } from '../../models/userModel';
import { catchError, map, Observable, of } from 'rxjs';
import { IAuthAPISucessfullResponse } from '../../models/IApiSuccessResponse';
import { OtpResponse } from '../../models/otpModel';
import { ToastService } from '../toaster/toast.service';
import IToastOption from '../../models/IToastOptions';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient, private toastService:ToastService) {}
  
  userRegister(userData:IUserregister):Observable<IAuthAPISucessfullResponse>{
    return this.http.post<IAuthAPISucessfullResponse>(`${this.baseUrl}user/register`, userData );
  }
  login(email:string,password:string):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}user/login`, { email,password })
  }
  googleLogin(credential: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}user/google-login`, { credential });
  }
  logOut():Observable<LogOut>{
    return  this.http.post<LogOut>(`${this.baseUrl}user/logOut`,{});
  }
  forgotPassword(email:string):Observable<{message:string}>{
    return this.http.post<{message:string}>(`${this.baseUrl}user/forgotPassword`,{email})
  }
  resetPassword(newPassword:string,token:string):Observable<{message:string}>{
    return this.http.post<{message:string}>(`${this.baseUrl}user/resetPassword`,{password: newPassword,token})
  }
  verifyOtp(email:string,otp:string):Observable<OtpResponse>{
    return this.http.post<OtpResponse>(`${this.baseUrl}user/verifyOtp`, {email,otp} )
  }
  isAuthenticated():Observable<boolean>{
    return this.http.get(`${this.baseUrl}user/isAuthenticate`).pipe(map(()=>true),catchError((error)=>{
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
  getUsers():Observable<any>{
    return this.http.get(`${this.baseUrl}user/getUsers`);
  }
  searchUser(searchTerm:string):Observable<{data:any[];message:string;statusCode:number}>{
    console.log(searchTerm,"1234567890-")
    return this.http.get<{data:any[];message:string;statusCode:number}>(`${this.baseUrl}user/searchUser`,{params:{searchTerm}});
  }
  setLoggedIn(status: string){
    localStorage.setItem('isLoggedIn',status);
  }
}
