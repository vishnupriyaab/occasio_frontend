import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { EventResponse } from '../../models/IEventManagement';
import { PackageResponse } from '../../models/IPackageManagement';
import { IAuthAPISucessfullResponse } from '../../models/IApiSuccessResponse';

@Injectable({
  providedIn: 'root',
})
export class EventServiceService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //event
  createEvent(eventData: FormData): Observable<EventResponse> {
    return this.http.post<EventResponse>(
      `${this.baseUrl}event/addEvent`,
      eventData
    );
  }
  updateEvent(id: string, eventData: FormData): Observable<EventResponse> {
    return this.http.put<EventResponse>(
      `${this.baseUrl}event/updateEvent/${id}`,
      eventData
    );
  }
  blockEvent(id: string): Observable<EventResponse> {
    return this.http.patch<EventResponse>(
      `${this.baseUrl}event/blockEvent/${id}`,
      {}
    );
  }
  deleteEvent(id: string): Observable<EventResponse> {
    return this.http.delete<EventResponse>(
      `${this.baseUrl}event/deleteEvent/${id}`,
      {}
    );
  }
  //getEvent with S,F,P
  searchandFilterEvent(
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
    console.log(searchTerm, filterStatus, page, limit, '1234567890----');
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
    }>(`${this.baseUrl}event/searchEvent`, { params });
  }

  //getEvent
  getEvents(): Observable<EventResponse> {
    return this.http.get<EventResponse>(`${this.baseUrl}event/getEvent`, {});
  }

  //package
  getPackages(eventId: string): Observable<PackageResponse> {
    return this.http.get<PackageResponse>(
      `${this.baseUrl}event/getPackages/${eventId}`,
      {}
    );
  }
  addPackage(packageData: FormData): Observable<PackageResponse> {
    return this.http.post<PackageResponse>(
      `${this.baseUrl}event/addPackage`,
      packageData
    );
  }
  editPackage(
    packageId: string,
    packageData: FormData
  ): Observable<PackageResponse> {
    return this.http.put<PackageResponse>(
      `${this.baseUrl}event/updatePackage/${packageId}`,
      packageData
    );
  }
  blockPackage(id: string): Observable<PackageResponse> {
    return this.http.patch<PackageResponse>(
      `${this.baseUrl}event/blockPackage/${id}`,
      {}
    );
  }
  deletePackage(packageId: string): Observable<PackageResponse> {
    return this.http.delete<PackageResponse>(
      `${this.baseUrl}event/deletePackage/${packageId}`,
      {}
    );
  }

  //features
  getPackageDetails(
    packageId: string,
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
    console.log(searchTerm, filterStatus, page, limit, '1234567890----');
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
    }>(`${this.baseUrl}event/getPackageDetails/${packageId}`, { params });
  }
  blockFeature(
    featureId: string,
    packageId: string
  ): Observable<PackageResponse> {
    console.log('wehbrtyu', featureId, packageId);
    return this.http.patch<PackageResponse>(
      `${this.baseUrl}event/blockFeature/${packageId}?featureId=${featureId}`,
      {}
    );
  }
  deleteFeature(
    featureId: string,
    packageId: string
  ): Observable<PackageResponse> {
    return this.http.delete<PackageResponse>(
      `${this.baseUrl}event/deleteFeature/${packageId}?featureId=${featureId}`,
      {}
    );
  }

  addFeature(packageId: string, featureData: { name: string; amount: number }): Observable<IAuthAPISucessfullResponse> {
    console.log(packageId,featureData,"111111111111")
    return this.http.post<IAuthAPISucessfullResponse>(`${this.baseUrl}event/addFeature`, {
      packageId,
      ...featureData 
    });
  }
  
  updateFeature(featureId: string, featureData: { name: string; amount: number }): Observable<IAuthAPISucessfullResponse> {
    console.log(featureId,featureData,"22222222222222222")
    return this.http.put<IAuthAPISucessfullResponse>(`${this.baseUrl}event/updateFeature/${featureId}`, {
      ...featureData 
    });
  }
  
  
}
