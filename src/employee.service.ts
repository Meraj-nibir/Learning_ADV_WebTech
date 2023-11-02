import { Injectable } from '@nestjs/common';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  private readonly employees: Employee[] = [];

  create(employee: Employee): void {
    this.employees.push(employee);
  }

  findAll(): Employee[] {
    return this.employees;
  }

  findByContactNo(contactNo: string): Employee | undefined {
    return this.employees.find((employee) => employee.contactNo === contactNo);
  }

  updateInfo(contactNo: string, username: string, password: string): void {
    const employee = this.findByContactNo(contactNo);
    if (employee) {
      employee.username = username;
      employee.password = password;
    }
  }

  deleteEmployee(contactNo: string): void {
    const index = this.employees.findIndex((employee) => employee.contactNo === contactNo);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
  }
}
