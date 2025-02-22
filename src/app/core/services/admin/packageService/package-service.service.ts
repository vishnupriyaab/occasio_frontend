import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PackageResponse } from '../../../models/IPackageManagement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PackageServiceService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  //package
  getPackages(eventId: string): Observable<PackageResponse> {
    return this.http.get<PackageResponse>(
      `${this.baseUrl}admin/getPackages/${eventId}`,
      {}
    );
  }
  addPackage(packageData: FormData): Observable<PackageResponse> {
    return this.http.post<PackageResponse>(
      `${this.baseUrl}admin/addPackage`,
      packageData
    );
  }
  editPackage(
    packageId: string,
    packageData: FormData
  ): Observable<PackageResponse> {
    return this.http.put<PackageResponse>(
      `${this.baseUrl}admin/updatePackage/${packageId}`,
      packageData
    );
  }
  blockPackage(id: string): Observable<PackageResponse> {
    return this.http.patch<PackageResponse>(
      `${this.baseUrl}admin/blockPackage/${id}`,
      {}
    );
  }
  deletePackage(packageId: string): Observable<PackageResponse> {
    return this.http.delete<PackageResponse>(
      `${this.baseUrl}admin/deletePackage/${packageId}`,
      {}
    );
  }
}
