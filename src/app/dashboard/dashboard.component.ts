import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  salary: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}


  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response) => {
        console.log(response.data.getEmployees);
        this.employees = response.data.getEmployees;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  viewEmployee(id: number): void {
    console.log('View employee with ID:', id);
    // Add logic to display employee details
  }

  editEmployee(id: number): void {
    console.log('Edit employee with ID:', id);
    this.router.navigate(['/updateEmployee', id]);
  }

  deleteEmployee(id: number): void {
    console.log('Delete employee with ID:', id);
    this.employeeService.deleteEmployee(id.toString()).subscribe(
      (response) => {
        console.log(response);
        // Remove the deleted employee from the employees array
        this.employees = this.employees.filter((employee) => employee.id !== id);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  
}
