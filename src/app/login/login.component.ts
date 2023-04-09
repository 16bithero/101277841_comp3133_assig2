import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) { }

  onSubmit() {
    this.employeeService.userLogin(this.username, this.password).subscribe(
      (response) => {
        console.log('Response from server:', response);
        if (response.data && response.data.userLogin) {
          // Navigate to dashboard component
          this.router.navigate(['/dashboard']);
        } else if (response.errors && response.errors.length > 0) {
          this.error = 'Login failed. Invalid credentials';
        } else {
          this.error = 'Login failed. Invalid credentials';
        }
      },
      (error) => {
        console.error('Error during login:', error);
      }
    );
  }
}
