import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employeeId!: number;
  employee: any = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: 0
  };

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
      this.employeeService.getEmployee(this.employeeId).subscribe((result: any) => {
        this.employee = result.data.searchEmployeeID;
      }, error => console.error(error));
    });
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.employeeId, {
      first_name: this.employee.first_name,
      last_name: this.employee.last_name,
      email: this.employee.email,
      gender: this.employee.gender,
      salary: this.employee.salary
    }).subscribe((result: any) => {
      console.log('Response from server:', result); // Log the response
      this.router.navigate(['/dashboard']); // Navigate to the employees page
    }, error => console.error(error));
  }


}
