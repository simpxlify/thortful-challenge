import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, catchError, throwError, Observable } from 'rxjs';
import { ApiResponseEmployees, Employee } from 'src/app/utils/interfaces';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeDataMap: Map<string, any> = new Map<string, any>();
  private employeeDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.fetchEmployeesData();
  }

  private fetchEmployeesData(): void {
    const url = 'https://dummy.restapiexample.com/api/v1/employees';

    this.http.get<ApiResponseEmployees>(url).pipe(
      tap((employeeData) => {

        if (employeeData) {
          
          this.employeeDataMap.set('employee', employeeData);
          this.employeeDataSubject.next(employeeData);
        }
      }),
      catchError((error) => {
        console.error('Error fetching employee data:', error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  getEmployeeData(): Observable<any> {
    return this.employeeDataSubject.asObservable()
  }

  createEmployee(obj:any) {
    const url = 'https://dummy.restapiexample.com/api/v1/create';
    const data = obj

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post(url, data, { headers }).subscribe({
      next: (response: any) => {
        console.log('Request successful. Response:', response);
    
        // Assuming the response is a single employee object
        const newEmployee: Employee = this.transformToEmployee(response.data);
    
        // Get the existing employee data or initialize an empty array
        const employeesData = this.employeeDataMap.get('employee') || [];
    
        // Add the new employee to the existing data
        if (!employeesData.hasOwnProperty('data')) {
          employeesData.push(newEmployee);
        } else if (employeesData.data) {
          employeesData.data.push(newEmployee);
        }
    
        // Update the map with the new employee data
        this.employeeDataMap.set('employee', employeesData);
    
        // Notify subscribers about the updated employee data
        this.employeeDataSubject.next(employeesData);
      },
      error: (error) => {
        console.error('Request failed:', error);
      }
    });
    
  }
  transformToEmployee(data: any): Employee {
    const employee: Employee = {
      id: data.id,
      employee_name: data.name,
      employee_salary: parseFloat(data.salary),
      employee_age: parseInt(data.age),
      profile_image: ''
    };
    return employee;
  }
  updateEmployeeData(updatedEmployeeData: Employee): void {
    let url = 'https://dummy.restapiexample.com/api/v1/update/'
    if (updatedEmployeeData && updatedEmployeeData.id) {
      // If the updated data has an "id" property, it means it represents a single employee.
      const employeesData = this.employeeDataMap.get('employee') || [];
      let employeeIndex = 0;
      if(!employeesData.hasOwnProperty('data')){
        employeeIndex = employeesData.findIndex((employee: Employee) => employee.id === updatedEmployeeData.id);
        
      } else if(employeesData.data){
        employeeIndex = employeesData.data.findIndex((employee: Employee) => employee.id === updatedEmployeeData.id);
      }
      if (employeeIndex !== -1) {
        
        this.http.put(url+updatedEmployeeData.id, updatedEmployeeData).pipe(
          tap(() => {
            // If the employee is found in the map, update it.
        employeesData[employeeIndex] = updatedEmployeeData;
        this.employeeDataMap.set('employee', employeesData);
        this.employeeDataSubject.next(employeesData);
  
          })
        ).subscribe();
      } else {
        console.error(`Employee with ID ${updatedEmployeeData.id} not found in the data.`);
      }
    } else {
      console.error('Invalid data format for updating employee data.');
    }
  }
  deleteEmployeeData(employeeId: number): void {
    let url = 'https://dummy.restapiexample.com/api/v1/delete/'
   
    this.http.delete(url + employeeId).pipe(
      tap(() => {
         // Update the user data in the map and notify subscribers after deletion.
    const employeesData = this.employeeDataMap.get('employee') || [];
    let updatedEmployeeData:any
    if(!employeesData.hasOwnProperty('data')){
      updatedEmployeeData = employeesData.filter((employee: Employee) => employee.id !== employeeId);
      
    } else if(employeesData.data){
      updatedEmployeeData = employeesData.data.filter((employee: Employee) => employee.id !== employeeId);
    }
    
    this.employeeDataMap.set('employee', updatedEmployeeData);
    this.employeeDataSubject.next(updatedEmployeeData);
      })
    ).subscribe();
  }
  
}
