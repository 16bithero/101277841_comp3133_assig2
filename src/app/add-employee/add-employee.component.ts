import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  gender: string = '';
  salary: number = 0;

  constructor(private employeeService: EmployeeService) {}

  onSubmit() {
    const employee = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      gender: this.gender,
      salary: this.salary
    };
 
    this.employeeService.addEmployee(employee).subscribe(
      (response) => {
        console.log('Response from server:', response); // Log the response
        // Handle the success response here
      },
      (error) => {
        console.error('Error during add employee:', error);
        // Handle the error here
      }
    );
  }
}
