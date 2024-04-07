import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public';
  private app_key = '74499ac92f2f41f8eb129213812c7a03';
  private app_id = 'e2706d13';

  private httOptions = {
    headers: new HttpHeaders({
      accept: 'application/json',
      'Accept-Language': 'en',
    }),
  };

  constructor(private http: HttpClient) {}
  // conosle dfatd från form and typing
  // Plocka isär en sträng för att skapa en sökterm

  getRecipes(
    searchterm = '',
    cuisineType = '',
    mealType = '',
    dishType = ''
  ): Observable<any> {
    let url = this.baseUrl;
    if (searchterm) {
      url +=
        '&q=' +
        searchterm +
        '&app_id=' +
        this.app_id +
        '&app_key=' +
        this.app_key;
    } else {
      url += '&app_id=' + this.app_id + '&app_key=' + this.app_key;
    }

    if (cuisineType) {
      url += '&cuisineType=' + cuisineType;
    }
    if (mealType) {
      url += '&mealType=' + mealType;
    }
    if (dishType) {
      url += '&dishType=' + dishType;
    }
    console.log(url);

    return this.http.get<any>(url, this.httOptions);
  }

  getRecipe(id?: string): Observable<any> {
    // returnera den sträng som skapas med sitt id
    // Skapa en component som tar hand om en sak
    let url =
      'https://api.edamam.com/api/recipes/v2/' +
      id +
      '?type=public' +
      '&app_id=' +
      this.app_id +
      '&app_key=' +
      this.app_key;
    return this.http.get<any>(url, this.httOptions);
  }
  // https://api.edamam.com/api/recipes/v2/2560dba5e97fd700f 9beaa8cc23e1c51?type=public&app_id=e2706d13&app_key=74499ac92f2f41f8eb129213812c7a03
}
