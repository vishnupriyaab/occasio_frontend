import { Component } from '@angular/core';
import { LoginFormComponent } from '../../../shared/components/login-form/login-form.component';
// import { LoginFormComponent } from "../../../shared/components/common/login-form/login-form.component";

@Component({
  selector: 'app-admin-login',
  imports: [ LoginFormComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {}
