import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, catchError, throwError, Observable } from 'rxjs';
import { ApiResponseFruit } from 'src/app/utils/interfaces';


@Injectable({
  providedIn: 'root'
})
export class FruitsService {
  private fruitMap: Map<string, any> = new Map<string, any>();
  private fruitSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.fetchFruitsData();
  }

  private fetchFruitsData(): void {
    // AS CORS DIDNT LET ME REQUEST FOR NOT HAVING THE PROTOCOL I PASSED THE JSON INTO MY DATA ON ASSETS
    // const url = 'https://www.fruityvice.com/api/fruit/all';
    const url = 'assets/data/fruits.json';

    this.http.get<ApiResponseFruit>(url).pipe(
      tap((fruit) => {

        if (fruit) {
          
          this.fruitMap.set('fruit', fruit);
          this.fruitSubject.next(fruit);
        }
      }),
      catchError((error) => {
        console.error('Error fetching fruit data:', error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  getFruit(): Observable<any> {
    return this.fruitSubject.asObservable()
  }
}