import { Component } from "@angular/core";
import { RegisterFormComponent } from "../../../shared/components/register-form/register-form.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-employee-register',
  imports: [RegisterFormComponent, RouterLink],
  templateUrl: './employee-register.component.html',
  styleUrl: './employee-register.component.css',
})
export class EmployeeRegisterComponent {}
