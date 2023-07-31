import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, catchError, throwError, Observable } from 'rxjs';
import { ApiResponseGetRestaurant, PizzaProds } from 'src/app/utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurantDataMap: Map<string, any> = new Map<string, any>();
  private restaurantDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.fetchRestaurantData();
  }

  private fetchRestaurantData(): void {
    const url = 'https://private-anon-4186d86960-pizzaapp.apiary-mock.com/restaurants/2';

    this.http.get<ApiResponseGetRestaurant>(url).pipe(
      tap((restaurantData) => {
        if (restaurantData) {
          this.restaurantDataMap.set('restaurant', restaurantData);
          this.restaurantDataSubject.next(restaurantData);
        }
      }),
      catchError((error) => {
        console.error('Error fetching restaurant data:', error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  getRestaurantData(): Observable<any> {
    return this.restaurantDataSubject.asObservable()
  }

  getDataProducts(): Observable<PizzaProds[]> {
    const url = 'https://private-anon-e7b6d8b3a9-pizzaapp.apiary-mock.com/restaurants/restaurantId/menu?category=Pizza';
    return this.http.get<PizzaProds[]>(url);
  }
  updateRestaurantData(updatedRestaurantData: any): void {
    // Update the user data in the map and notify subscribers.
    this.restaurantDataMap.set('restaurant', updatedRestaurantData);
    this.restaurantDataSubject.next(updatedRestaurantData);

    // Update the backend using HTTP PUT or PATCH request.
    // this.http.put('YOUR_API_ENDPOINT', updatedRestaurantData).pipe(
    //   tap(() => {
    //     console.log('User data updated on the backend.');
    //   })
    // ).subscribe();
  }
}