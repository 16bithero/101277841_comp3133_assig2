import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onSubmit() {
    this.employeeService.addUser(this.username, this.email, this.password)
      .subscribe(
        response => {
          if (response.errors && response.errors.length > 0) {
            this.errorMessage = response.errors[0].message; // Set error message from server response
          } else {
            console.log(response);
            this.router.navigate(['/login']); // Navigate to login component
          }
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.errors[0].message; // Set error message from server response
        }
      );
  }
  
  
  
}
