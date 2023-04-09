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

  pastelRainbowColors = [
    'hsl(0, 70%, 70%)',      // Red
    'hsl(60, 70%, 70%)',     // Yellow
    'hsl(120, 70%, 70%)',    // Green
    'hsl(180, 70%, 70%)',    // Cyan
    'hsl(240, 70%, 70%)',    // Blue
    'hsl(300, 70%, 70%)'     // Purple
  ];

  getRandomPastelRainbowColor() {
    const randomIndex = Math.floor(Math.random() * this.pastelRainbowColors.length);
    return this.pastelRainbowColors[randomIndex];
  }

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
    // Add logic to delete employee from server
  }
}
