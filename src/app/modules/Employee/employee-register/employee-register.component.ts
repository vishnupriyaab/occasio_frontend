import { Component } from "@angular/core";
// import { RegisterFormComponent } from "../../../shared/components/register-form/register-form.component";
import { RouterLink } from "@angular/router";
import { RegisterFormComponent } from "../../../shared/components/register-form/register-form.component";

@Component({
  selector: 'app-employee-register',
  imports: [ RouterLink, RegisterFormComponent],
  templateUrl: './employee-register.component.html',
  styleUrl: './employee-register.component.css',
})
export class EmployeeRegisterComponent {}
