import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeId!: number;
  employeeForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', Validators.required),
    salary: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
      this.employeeService.getEmployee(this.employeeId).subscribe((result: any) => {
        const employee = result.data.searchEmployeeID;
        this.employeeForm.patchValue({
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          gender: employee.gender,
          salary: employee.salary
        });
      }, error => console.error(error));
    });
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe((result: any) => {
      console.log('Response from server:', result); // Log the response
      this.router.navigate(['/dashboard']); // Navigate to the employees page
    }, error => console.error(error));
  }
}
