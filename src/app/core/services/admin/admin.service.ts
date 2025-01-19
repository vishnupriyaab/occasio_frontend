import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IAuthAPISucessfullResponse } from '../../models/IApiSuccessResponse';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

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
}
