import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';
import { inject } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';

export const adminAuthGuardGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminService)
  const router = inject(Router);

  return adminService.isAuthenticated().pipe(
      switchMap((res) => {
        if(res == true){
          return of(true);
        }else{
          router.navigate(["/admin-login"]); 
          return of(false);
        }
      }),
      catchError(() => {
        router.navigate(["/admin-login"]); 
        return of(false);
      })
    );
};
