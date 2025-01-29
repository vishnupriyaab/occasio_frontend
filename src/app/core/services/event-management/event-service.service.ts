import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IAuthAPISucessfullResponse } from '../../models/IApiSuccessResponse';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  //event
  getEvents(page:number = 1, limit:number = 10): Observable<{data:any;totalCount:number;message:string;statusCode:number}> {
    return this.http.get<{data:any;totalCount:number;message:string;statusCode:number}>(`${this.baseUrl}event/getEvents`, { 
      params: { 
        page: page.toString(), 
        limit: limit.toString() 
      } 
    });
  }
  createEvent(eventData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}event/addEvent`, eventData);
  }
  updateEvent(id:string, eventData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}event/updateEvent/${id}`, eventData);
  }
  blockEvent(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}event/blockEvent/${id}`, {});
  }
  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}event/deleteEvent/${id}`, {});
  }
  searchandFilterEvent(searchTerm:string, filterStatus?:string, page:number =1, limit:number =10):Observable<{data:any;totalCount:number;message:string;statusCode:number}>{
    console.log( searchTerm, filterStatus, page, limit, "1234567890----" );
    let params:{[key:string]:string} = { searchTerm, page:page.toString(), limit: limit.toString() }
    if(filterStatus && filterStatus !== 'all'){
      params = { ...params, filterStatus };
    }
    return this.http.get<{data:any;totalCount:number;message:string;statusCode:number}>(`${this.baseUrl}event/searchEvent`,{ params });
  }

  //package
  getPackages(eventId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}event/getPackages/${eventId}`, {});
  }
  addPackage(packageData:FormData):Observable<any>{
    return this.http.post<IAuthAPISucessfullResponse>(`${this.baseUrl}event/addPackage`,packageData);
  }
  editPackage(packageId:string, packageData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}event/updatePackage/${packageId}`, packageData);
  }
  blockPackage(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}event/blockPackage/${id}`, {});
  }
  deletePackage(packageId:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}event/deletePackage/${packageId}`,{});
  }
  
}
