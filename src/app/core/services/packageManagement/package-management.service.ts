import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IAuthAPISucessfullResponse } from '../../models/IApiSuccessResponse';

@Injectable({
  providedIn: 'root'
})
export class PackageManagementService {
  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  
  
}
