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

  createEvent(eventData: FormData): Observable<any> {
    console.log(eventData,"qwertyuiop[")
    return this.http.post(`${this.baseUrl}event/addEvent`, eventData);
  }
  getEvents(): Observable<any> {
    return this.http.get(`${this.baseUrl}event/getEvents`);
  }
  updateEvent(id:string, eventData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}event/updateEvent/${id}`, eventData);
  }
  blockEvent(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}event/blockEvent/${id}`, {});
  }
  deleteEvent(id: string): Observable<any> {
    console.log(id,"id in service")
    return this.http.delete(`${this.baseUrl}event/deleteEvent/${id}`, {});
  }
  getPackages(eventId: string): Observable<any> {
    // console.log(eventId,"EventId in service")
    return this.http.get(`${this.baseUrl}event/getPackages/${eventId}`, {});
  }
  addPackage(packageData:FormData):Observable<any>{
    console.log(packageData,"packageData in service.......")
    return this.http.post<IAuthAPISucessfullResponse>(`${this.baseUrl}event/addPackage`,packageData);
  }
  editPackage(packageId:string, packageData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}event/updatePackage/${packageId}`, packageData);
  }
  
  deletePackage(packageId:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}event/deletePackage/${packageId}`,{});
  }
  blockPackage(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}event/blockPackage/${id}`, {});
  }
  
}
