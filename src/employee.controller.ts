import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeInfoDto } from './employee.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  createEmployee(@Body(new ValidationPipe()) employee: CreateEmployeeDto): void {
    this.employeeService.create(new Employee(employee.name, employee.contactNo, employee.username, employee.password));
  }

  @Get()
  findAll(): Employee[] {
    return this.employeeService.findAll();
  }

  @Get(':contactNo')
  findByContactNo(@Param('contactNo') contactNo: string): Employee | undefined {
    return this.employeeService.findByContactNo(contactNo);
  }

  @Put(':contactNo')
  updateInfo(
    @Param('contactNo') contactNo: string,
    @Body(new ValidationPipe()) employeeInfo: UpdateEmployeeInfoDto,
  ): void {
    this.employeeService.updateInfo(contactNo, employeeInfo.username, employeeInfo.password);
  }

  @Delete(':contactNo')
  deleteEmployee(@Param('contactNo') contactNo: string): void {
    this.employeeService.deleteEmployee(contactNo);
  }
}
