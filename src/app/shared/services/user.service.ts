import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, Observable, catchError, throwError  } from 'rxjs';
import { ApiResponseProfile } from 'src/app/utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataMap: Map<string, any> = new Map<string, any>();
  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.fetchUserData();
  }

  private fetchUserData(): void {
    const url = 'https://randomuser.me/api/';

    this.http.get<ApiResponseProfile>(url).pipe(
      tap((userData) => {
        if (userData) {
          this.userDataMap.set('user', userData);
          this.userDataSubject.next(userData);
        }
      }),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  getUserData(): Observable<any> {
    return this.userDataSubject.asObservable()
  }

  get currentUserData(): ApiResponseProfile {
    return this.userDataSubject.getValue();
  }
  updateUserData(updatedUserData: any): void {
    // Update the user data in the map and notify subscribers.
    this.userDataMap.set('user', updatedUserData);
    this.userDataSubject.next(updatedUserData);

    // Update the backend using HTTP PUT or PATCH request.
    // this.http.put('YOUR_API_ENDPOINT', updatedUserData).pipe(
    //   tap(() => {
    //     console.log('User data updated on the backend.');
    //   })
    // ).subscribe();
  }
}