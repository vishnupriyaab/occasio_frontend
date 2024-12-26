import { Routes } from '@angular/router';
import { UserLoginComponent } from './modules/user/user-login/user-login.component';
import { UserRegisterComponent } from './modules/user/user-register/user-register.component';
import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';
import { EmployeeLoginComponent } from './modules/Employee/employee-login/employee-login.component';
import { EmployeeRegisterComponent } from './modules/Employee/employee-register/employee-register.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { AdminMainComponent } from './features/components/admin-main/admin-main.component';
import { EventsComponent } from './modules/admin/events/events.component';
import { HomeComponent } from './modules/user/home/home.component';

export const routes: Routes = [
  //User-Side
  {
    path: 'user-login',
    component: UserLoginComponent,
  },
  {
    path: 'user-register',
    component: UserRegisterComponent,
  },
  {
    path: '',
    component:HomeComponent
  },

  //Admin-Side
  {
    path: 'admin-login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin',
    component: AdminMainComponent,
    children: [
      {
        path: 'dashboard',
        data: { heading: 'Dashboard' },
        component: DashboardComponent,
      },
      {
        path: 'event',
        data: { heading: 'Event' },
        component: EventsComponent,
      },
    ],
  },

  //Employee-Side
  {
    path: 'employee-login',
    component: EmployeeLoginComponent,
  },
  {
    path: 'employee-register',
    component: EmployeeRegisterComponent,
  },
];
