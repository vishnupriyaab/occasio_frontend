import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventResponse } from '../../../models/IEventManagement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventServiceService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  createEvent(eventData: FormData): Observable<EventResponse> {
    return this.http.post<EventResponse>( `${this.baseUrl}admin/addEvent`, eventData );
  }
  updateEvent(id: string, eventData: FormData): Observable<EventResponse> {
    return this.http.put<EventResponse>( `${this.baseUrl}admin/updateEvent/${id}`, eventData );
  }
  blockEvent(id: string): Observable<EventResponse> {
    return this.http.patch<EventResponse>( `${this.baseUrl}admin/blockEvent/${id}`, {} );
  }
  deleteEvent(id: string): Observable<EventResponse> {
    return this.http.delete<EventResponse>( `${this.baseUrl}admin/deleteEvent/${id}`, {} );
  }
  //getEvent with S,F,P
  searchandFilterEvent( searchTerm: string, filterStatus?: string, page: number = 1, limit: number = 10 ): 
  Observable<{ data: any; totalCount: number; message: string; statusCode: number; }> {
    console.log(searchTerm, filterStatus, page, limit, '1234567890----');
    let params: { [key: string]: string } = {
      searchTerm,
      page: page.toString(),
      limit: limit.toString(),
    };
    if (filterStatus && filterStatus !== 'all') {
      params = { ...params, filterStatus };
    }
    return this.http.get<{ data: any; totalCount: number; message: string; statusCode: number; }>(`${this.baseUrl}admin/searchEvent`, { params });
  }
}
