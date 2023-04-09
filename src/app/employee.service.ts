import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseURL = 'https://101277841-comp-3133-assignment1-16bithero.vercel.app/graphql';

  constructor(private httpClient: HttpClient) {}

  // Helper method for POST requests
  private graphqlRequest(query: string, variables: any = {}): Observable<any> {
    return this.httpClient.post(this.baseURL, {
      query: query,
      variables: variables,
    });
  }

  // User login
  public userLogin(username: string, password: string): Observable<any> {
    const query = `
      query UserLogin($username: String!, $password: String!) {
        userLogin(username: $username, password: $password)
      }
    `;
    return this.graphqlRequest(query, { username, password });
  }
  
  

  // CRUD operations
  // List all employees
public getEmployees(): Observable<any> {
  const query = `
    query {
      getEmployees {
        id
        first_name
        last_name
        email
        gender
        salary
      }
    }
  `;
  return this.graphqlRequest(query);
}

// Add a new employee
public addEmployee(employee: any): Observable<any> {
  const mutation = `
    mutation AddEmployee($employee: EmployeeInput!) {
      addEmployee(employee: $employee) {
        id
        first_name
        last_name
        email
        gender
        salary
      }
    }
  `;
  return this.graphqlRequest(mutation, { employee });
}

// Get an employee by ID
public getEmployee(id: number): Observable<any> {
  const query = `
    query GetEmployee($id: ID!) {
      searchEmployeeID(id: $id) {
        id
        first_name
        last_name
        email
        gender
        salary
      }
    }
  `;
  return this.graphqlRequest(query, { id });
}

// Update an employee by ID
public updateEmployee(id: number, employee: any): Observable<any> {
  const mutation = `
    mutation UpdateEmployee($id: ID!, $employee: EmployeeInput!) {
      updateEmployee(id: $id, employee: $employee) {
        id
        first_name
        last_name
        email
        gender
        salary
      }
    }
  `;
  return this.graphqlRequest(mutation, { id, employee });
}

// Delete an employee by ID
public deleteEmployee(id: number): Observable<any> {
  const mutation = `
    mutation DeleteEmployee($id: ID!) {
      deleteEmployee(id: $id) {
        id
      }
    }
  `;
  return this.graphqlRequest(mutation, { id });
}

}
