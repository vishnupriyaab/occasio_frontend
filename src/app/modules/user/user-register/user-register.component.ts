import { Component } from '@angular/core';
// import { RegisterFormComponent } from '../../../shared/components/register-form/register-form.component';
import { RouterModule } from '@angular/router';
import { RegisterFormComponent } from '../../../shared/components/register-form/register-form.component';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [RouterModule, RegisterFormComponent ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
})
export class UserRegisterComponent {}
