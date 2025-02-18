import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { IAuthAPISucessfullResponse } from '../../models/IApiSuccessResponse';
import { LogOut } from '../../models/userModel';
import IToastOption from '../../models/IToastOptions';
import { ToastService } from '../toaster/toast.service';

@Injectable({
  providedIn: 'root',
})

export class AdminService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private toastService:ToastService) {}

  login(email: string, password: string): Observable<string> {
    console.log('qwertyu', email, password);
    return this.http.post<string>(`${this.baseUrl}admin/login`, {
      email,
      password,
    });
  }
  setLoggedIn(status: string) {
    localStorage.setItem('isLoggedIn', status);
  }
  blockUsers(userId: string):Observable<IAuthAPISucessfullResponse> {
    return this.http.patch<IAuthAPISucessfullResponse>(`${this.baseUrl}admin/blockUser/${userId}`, {});
  }
  logOut():Observable<LogOut>{
    return this.http.post<LogOut>(`${this.baseUrl}admin/logOut`,{});
  }
  searchandFilterUser(
    searchTerm: string,
    filterStatus?: string,
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
    }>(`${this.baseUrl}admin/searchUser`, { params });
  }

  blockEmployee(employeeId:string):Observable<IAuthAPISucessfullResponse>{
    console.log(employeeId,"dcfgvbhnjkm,l")
    return this.http.patch<IAuthAPISucessfullResponse>(`${this.baseUrl}admin/blockEmployee/${employeeId}`,{});
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
    }>(`${this.baseUrl}admin/searchEmployee`, { params });
  }

  isAuthenticated():Observable<boolean>{
      return this.http.get(`${this.baseUrl}admin/isAuthenticate`).pipe(map(()=>true),catchError((error)=>{
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
