import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      salary: new FormControl(0, Validators.required),
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }

    const employee = {
      first_name: this.employeeForm.value.firstName,
      last_name: this.employeeForm.value.lastName,
      email: this.employeeForm.value.email,
      gender: this.employeeForm.value.gender,
      salary: this.employeeForm.value.salary,
    };

    this.employeeService.addEmployee(employee).subscribe(
      (response) => {
        console.log('Response from server:', response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error during add employee:', error);
        // Handle the error here
      }
    );
  }
}
