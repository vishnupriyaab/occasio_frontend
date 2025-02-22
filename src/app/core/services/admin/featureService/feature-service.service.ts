import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PackageResponse } from '../../../models/IPackageManagement';
import { IAuthAPISucessfullResponse } from '../../../models/IApiSuccessResponse';

@Injectable({
  providedIn: 'root'
})
export class FeatureServiceService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

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
      }>(`${this.baseUrl}admin/getPackageDetails/${packageId}`, { params });
    }
    blockFeature(
      featureId: string,
      packageId: string
    ): Observable<PackageResponse> {
      console.log('wehbrtyu', featureId, packageId);
      return this.http.patch<PackageResponse>(
        `${this.baseUrl}admin/blockFeature/${packageId}?featureId=${featureId}`,
        {}
      );
    }
    deleteFeature(
      featureId: string,
      packageId: string
    ): Observable<PackageResponse> {
      return this.http.delete<PackageResponse>(
        `${this.baseUrl}admin/deleteFeature/${packageId}?featureId=${featureId}`,
        {}
      );
    }
  
    addFeature(packageId: string, featureData: { name: string; amount: number }): Observable<IAuthAPISucessfullResponse> {
      console.log(packageId,featureData,"111111111111")
      return this.http.post<IAuthAPISucessfullResponse>(`${this.baseUrl}admin/addFeature`, {
        packageId,
        ...featureData 
      });
    }
    
    updateFeature(featureId: string, featureData: { name: string; amount: number }): Observable<IAuthAPISucessfullResponse> {
      console.log(featureId,featureData,"22222222222222222")
      return this.http.put<IAuthAPISucessfullResponse>(`${this.baseUrl}admin/updateFeature/${featureId}`, {
        ...featureData 
      });
    }
}
