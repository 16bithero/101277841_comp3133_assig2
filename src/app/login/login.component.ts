import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private employeeService: EmployeeService) {}

  onSubmit() {
    this.employeeService.userLogin(this.username, this.password).subscribe(
      (response) => {
        console.log('Response from server:', response); // Log the response
        if (response.data && response.data.userLogin) {
          console.log('Logged in successfully. Message:', response.data.userLogin);
          // Handle successful login (e.g., store the token, navigate to another page)
        } else if (response.errors && response.errors.length > 0) {
          console.log('Login failed. Message:', response.errors[0].message);
          // Handle failed login
        } else {
          console.log('Login failed. Unexpected response:', response);
          // Handle other cases
        }
      },
      (error) => {
        console.error('Error during login:', error);
        // Handle errors during the login process
      }
    );
  }  
}
