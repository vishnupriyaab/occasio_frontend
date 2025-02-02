import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../services/employees/auth-service.service';
import { catchError, of, switchMap } from 'rxjs';

export const employeeAuthGuardGuard: CanActivateFn = (route, state) => {
  const employeeService = inject(AuthServiceService);
  const router = inject(Router);

  return employeeService.isAuthenticated().pipe(
    switchMap((res) => {
      console.log(res,"qwertyuiop[asdfghjkl;zxcvbnm,.")
      if (res == true) {
        return of(true);
      } else {
        router.navigate(['/employee-login']);
        return of(false);
      }
    }),
    catchError(() => {
      router.navigate(['/employee-login']);
      return of(false);
    })
  );
};
