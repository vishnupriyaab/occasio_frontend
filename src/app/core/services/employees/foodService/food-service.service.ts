import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FoodData, foodResponse } from '../../../models/IFoodManagement';
import { Observable } from 'rxjs';
import { FoodFilters } from '../../../../shared/components/search/search/search.component';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

    addFood(foodData: FoodData): Observable<foodResponse> {
      return this.http.post<foodResponse>(
        `${this.baseUrl}employee/addFood`,
        foodData
      );
    }

    updateFood(foodId: string, foodData: FoodData):Observable<foodResponse> {
        console.log(foodId,foodData,"wertyui")
        return this.http.put<foodResponse>(`${this.baseUrl}employee/editFood/${foodId}`, foodData);
      }
      
      searchAndFilterFood(
        searchTerm: string,
        filters: FoodFilters,
        page: number = 1,
        limit: number = 10
      ): Observable<{
        data: any;
        totalCount: number;
        message: string;
        statusCode: number;
      }> {
        let params: { [key: string]: string } = {
          searchTerm,
          page: page.toString(),
          limit: limit.toString(),
          status: filters.status,
          price: filters.price,
          category: filters.category,
          session: filters.session
        };
        return this.http.get<{
          data: any;
          totalCount: number;
          message: string;
          statusCode: number;
        }>(`${this.baseUrl}employee/searchFood`, { params });
      }

}
