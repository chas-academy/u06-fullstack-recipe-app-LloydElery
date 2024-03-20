import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'http://api.edamam.com/api/recipes/v2?type=public';
  private app_key = '';
  private app_id = '';

  private httOptions = {
    headers: new HttpHeaders({
      accept: 'application/json',
      'Accept-Language': 'en',
    }),
  };
  constructor(private http: HttpClient) {}

  getRecipes(searchterm: string): Observable<any> {
    let quisineType = ''; // Get "Quisine" type
    let mealType = ''; // Get "Meal" type
    let url =
      this.baseUrl +
      '$q=' +
      searchterm +
      '&app_id=' +
      this.app_id +
      '&app_key=' +
      this.app_key +
      '&cuisineType=' +
      quisineType +
      '&mealType=' +
      mealType;
    return this.http.get<any>(url, this.httOptions);
  }
}
