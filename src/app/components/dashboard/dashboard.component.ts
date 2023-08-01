import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js/auto';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { FruitsService } from 'src/app/shared/services/fruits.service';
import { ApiResponseEmployees, ApiResponseFruit, Employee } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<any>();
  chart = new Array<Chart>(2);
  editable = false
  columns = [
    {
      columnDef: 'edit',
      header: '',
      cell: (element: Employee) => '',
      
    },
    {
      columnDef: 'employee_name',
      header: 'Name',
      cell: (element: Employee) => element.employee_name,
    },

    {
      columnDef: 'employee_salary',
      header: 'Salary',
      cell: (element: Employee) => element.employee_salary,
    },
    {
      columnDef: 'employee_age',
      header: 'Age',
      cell: (element: Employee) => element.employee_age,
    },
    {
      columnDef: 'delete',
      header: '',
      cell: (element: Employee) => '',
    },

  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('createEmployeeModal') createEmployeeModal!: ModalComponent;

  createEmpoyeeForm: FormGroup;

  displayedColumns = this.columns.map((c) => c.columnDef);
  constructor(private _liveAnnouncer: LiveAnnouncer, private employeeService: EmployeeService,
    public formBuilder: FormBuilder,
    private fruitsService: FruitsService){
      this.createEmpoyeeForm = this.formBuilder.group({
        name: '',
        salary: '',
        age: ''
      });
    }
  ngOnInit(): void {
    
   
  }

  ngAfterViewInit() {
    this.employeeService.getEmployeeData().subscribe({
      next: (succ: any) => {
        if(succ){
        if(!succ.hasOwnProperty('data')){
          this.dataSource.data = succ

          
        } else if(succ.data){
          this.dataSource.data = succ.data
        }
      }
        
      },
      error: (err) => {
        console.log(err);
        
      },
    })
    this.fruitsService.getFruit().subscribe({
      next: (succ: ApiResponseFruit[]) => {
        if(succ){
          this.createCharts(succ)
        }
      },
      error: (err) => {
        console.log(err);
        
      },
    })
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy(): void {
    this.resetGraphs();
  }
  resetGraphs() {
    for (let index = 0; index < this.chart.length; index++) {
      if(
      this.chart[index]
      )
      this.chart[index].stop;
      this.chart[index].unbindEvents();
      this.chart[index].destroy();
    }
   
  }
  announceSortChange(sortState: any) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
      console.log(`Sorting cleared`);
    }
  }
  onFocusOutSave(row: any, newValue: any, oldValue: any): void {
    // Check if the new value is different from the current value
    if (newValue.value !== oldValue) {
      this.employeeService.updateEmployeeData(row);
    }
  }
  deleteEmployee(row: any){
    let id = row.id
    this.employeeService.deleteEmployeeData(id);
  }
  createCharts(data: ApiResponseFruit[]) {
    let proteinFruits: number[] = [];
    let nameFruits: string[] = [];
    let carbsFruits: number[] = [];
    let caloriesFruits: number[] = [];



    for (const fruit of data) {
      proteinFruits.push(fruit.nutritions.protein);
      carbsFruits.push(fruit.nutritions.carbohydrates);
      caloriesFruits.push(fruit.nutritions.calories);
      nameFruits.push(fruit.name);
    }
    
    this.chart[0] = new Chart('barChartCalories', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: nameFruits,
        datasets: [
          {
            label: 'Calories',
            data: caloriesFruits,
            backgroundColor: 'orange',
            borderRadius: 50,
            barPercentage: 0.3,
            maxBarThickness: 7,
          },
        ],
      },
      options: {
        scales: {
          y: {
            grid: { drawTicks: false },
          },
          x: {
            grid: { display: false, drawTicks: false },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
        animation: { duration: 0 },

        // animation: {
        //     animateScale: true,
        //     animateRotate: true
        // },
        plugins: {
          tooltip: {
            padding: 1,
            displayColors: false,
            backgroundColor: 'white',
            borderWidth: 0.2,
            borderColor: 'black',
            caretSize: 0,
            bodyColor: 'black',
            footerColor: 'black',
            titleColor: 'black',
          },
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
      },
    });

    this.chart[1] = new Chart('barChartCarbs', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: nameFruits,
        datasets: [
          {
            label: 'Carbs',
            data: carbsFruits,
            backgroundColor: 'black',
            borderColor: 'orange'
          },
        ],
      },
      options: {
        scales: {
          y: {
            grid: { drawTicks: false },
          },
          x: {
            grid: { display: false, drawTicks: false },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
        animation: { duration: 0 },

        // animation: {
        //     animateScale: true,
        //     animateRotate: true
        // },
        plugins: {
          tooltip: {
            padding: 1,
            displayColors: false,
            backgroundColor: 'white',
            borderWidth: 0.2,
            borderColor: 'black',
            caretSize: 0,
            bodyColor: 'black',
            footerColor: 'black',
            titleColor: 'black',
          },
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
      },
    });

  }
  createEmployee() {
    
    this.employeeService.createEmployee(this.createEmpoyeeForm.value);
    this.createEmployeeModal.toggle();
  }
  checkIfEmpty(){
    if(!this.createEmpoyeeForm.get('age')?.value || !this.createEmpoyeeForm.get('salary')?.value || !this.createEmpoyeeForm.get('name')?.value){
      return true
    } else return false
    
  }
}
