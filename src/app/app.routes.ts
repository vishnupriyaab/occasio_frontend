import { Routes } from '@angular/router';
import { UserLoginComponent } from './modules/user/user-login/user-login.component';
import { UserRegisterComponent } from './modules/user/user-register/user-register.component';
import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';
import { EmployeeLoginComponent } from './modules/Employee/employee-login/employee-login.component';
import { EmployeeRegisterComponent } from './modules/Employee/employee-register/employee-register.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { AdminMainComponent } from './features/components/admin-main/admin-main.component';
import { HomeComponent } from './modules/user/home/home.component';
import { ResetPasswordComponent } from './modules/user/reset-password/reset-password.component';
import { EmployeeMainComponent } from './features/components/employee-main/employee-main.component';
import { EventManagementComponent } from './modules/admin/event-management/event-management.component';
import { EventListingComponent } from './modules/Employee/event-listing/event-listing.component';
import { EDashboardComponent } from './modules/Employee/e-dashboard/e-dashboard.component';
import { UsersListingComponent } from './modules/Employee/users-listing/users-listing.component';
import { ClientListingComponent } from './modules/admin/client-listing/client-listing.component';
import { EmployeeListingComponent } from './modules/admin/employee-listing/employee-listing.component';
import { PackageMoreInfoComponent } from './modules/admin/package-more-info/package-more-info.component';
import { userAuthGuard } from './core/guards/user-auth.guard';

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
    component:HomeComponent,
    // canActivate:[userAuthGuard]
  },
  {
    path: 'reset-password',
    component:ResetPasswordComponent
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
        path: 'clients',
        data: { heading: 'Clients' },
        component: ClientListingComponent,
      },
      {
        path: 'employees',
        data: { heading: 'Employees' },
        component: EmployeeListingComponent,
      },
      {
        path: 'event-management',
        data: { heading: 'Event' },
        component: EventManagementComponent,
      },
      {
        path: 'event-management/features-moreInfo/:id',
        component: PackageMoreInfoComponent,
      }
    ],
  },

  //Employee-Side
  {
    path: 'employee-register',
    component: EmployeeRegisterComponent,
  },
  {
    path: 'employee-login',
    component: EmployeeLoginComponent,
  },
  {
    path: 'employee',
    component: EmployeeMainComponent,
    children: [
      {
        path: 'dashboard',
        data: { heading: 'Dashboard' },
        component: EDashboardComponent,
      },
      {
        path: 'event',
        data: { heading: 'Event' },
        component: EventListingComponent,
      },
      {
        path: 'users-listing',
        data: { heading: 'Client' },
        component: UsersListingComponent,
      },
    ],
  }
];
