import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
      mutation AddEmployee($first_name: String!, $last_name: String!, $email: String!, $gender: String!, $salary: Float!) {
        addEmployee(first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
          id
          first_name
          last_name
          email
          gender
          salary
        }
      }
    `;
    return this.graphqlRequest(mutation, employee);
  }

  public addUser(username: string, email: string, password: string): Observable<any> {
    const mutation = `
      mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
          username
          email
          password
        }
      }
    `;
    return this.graphqlRequest(mutation, { username, email, password });
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
    mutation UpdateEmployee($id: String!, $first_name: String!, $last_name: String!, $email: String!, $gender: String!, $salary: Float!) {
      updateEmployee(id: $id, first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
        id
        first_name
        last_name
        email
        gender
        salary
      }
    }
  `;
  return this.graphqlRequest(mutation, { id, ...employee });
}


  // Delete an employee by ID
  public deleteEmployee(id: string): Observable<any> {
    const mutation = `
      mutation deleteEmployee($id: String!){
        deleteEmployee(id: $id){
          id
          first_name
          last_name
          email
          gender
          salary
        }
      }`;
    return this.graphqlRequest(mutation, { id });
  }
  
}
