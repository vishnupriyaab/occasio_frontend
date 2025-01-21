import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/users/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    switchMap((res) => {
      if(res == true){
        return of(true);
      }else{
        router.navigate(["/user-login"]); 
        return of(false);
      }
    }),
    catchError(() => {
      router.navigate(["/user-login"]); 
      return of(false);
    })
  );
};
