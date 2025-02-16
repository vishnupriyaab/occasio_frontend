import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodData, foodResponse } from '../../models/IFoodManagement';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addFood(foodData:FoodData):Observable<foodResponse>{
    return this.http.post<foodResponse>(`${this.baseUrl}food/addFood`,foodData);
  }
}
