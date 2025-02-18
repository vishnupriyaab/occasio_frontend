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
import { EDashboardComponent } from './modules/Employee/e-dashboard/e-dashboard.component';
import { UsersListingComponent } from './modules/Employee/users-listing/users-listing.component';
import { ClientListingComponent } from './modules/admin/client-listing/client-listing.component';
import { EmployeeListingComponent } from './modules/admin/employee-listing/employee-listing.component';
import { PackageMoreInfoComponent } from './modules/admin/package-more-info/package-more-info.component';
import { adminAuthGuardGuard } from './core/guards/adminAuthGuard/admin-auth-guard.guard';
import { AboutComponent } from './modules/user/about/about.component';
import { ServicesComponent } from './modules/user/user_services/services.component';
import { employeeAuthGuardGuard } from './core/guards/employeeAuthGuard/employee-auth-guard.guard';
import { userAuthGuard } from './core/guards/userAuthGuard/user-auth.guard';
import { UserProfileComponent } from './modules/user/user-profile/user-profile.component';
import { PackageListingComponent } from './modules/user/package-listing/package-listing.component';
import { FoodManagementComponent } from './shared/components/food-management/food-management.component';

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
    path: 'reset-password',
    component:ResetPasswordComponent
  },
  {
    path: '',
    component:HomeComponent,
  },
  {
    path:'about',
    component: AboutComponent,
    canActivate: [userAuthGuard]
  },
  {
    path:'services',
    component: ServicesComponent,
    canActivate:[userAuthGuard],
  },
  {
    path:'services/packages/:id',
    component: PackageListingComponent,
    canActivate:[userAuthGuard]
  },
  {
    path:'services/packages/:id/features',
    component: PackageMoreInfoComponent,
    canActivate:[userAuthGuard]
  },
  {
    path:'user-profile',
    component: UserProfileComponent,
    canActivate:[userAuthGuard]
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
        canActivate: [adminAuthGuardGuard]
      },
      {
        path: 'clients',
        data: { heading: 'Clients' },
        component: ClientListingComponent,
        canActivate: [adminAuthGuardGuard]
      },
      {
        path: 'employees',
        data: { heading: 'Employees' },
        component: EmployeeListingComponent,
        canActivate: [adminAuthGuardGuard]
      },
      {
        path: 'event-management',
        data: { heading: 'Event' },
        component: EventManagementComponent,
        canActivate: [adminAuthGuardGuard]
      },
      {
        path: 'event-management/features-moreInfo/:id',
        component: PackageMoreInfoComponent,
        canActivate:[adminAuthGuardGuard]
      },
      {
        path: 'food-management',
        component: FoodManagementComponent,
        canActivate:[adminAuthGuardGuard]
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
        canActivate: [employeeAuthGuardGuard]
      },
      {
        path: 'users-listing',
        data: { heading: 'Client' },
        component: UsersListingComponent,
        canActivate: [employeeAuthGuardGuard]
      },
      {
        path: 'food-management',
        component: FoodManagementComponent,
        canActivate:[employeeAuthGuardGuard]
      }
    ],
  }
];
