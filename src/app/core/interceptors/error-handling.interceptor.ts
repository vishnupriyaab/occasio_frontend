import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { RefreshTokenService } from '../services/common/refreshToken/refresh-token.service';
import { inject } from '@angular/core';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  const refreshToken = inject(RefreshTokenService);

  return next(req).pipe(
    catchError((err: any) => {
      if (err.error.message == 'Unauthorized: No token provided') {
        return refreshToken.refreshToken().pipe(
          switchMap(() => {
            return next(req);
          }),
          catchError((err) => throwError(err))
        );
      }
      return throwError(() => err);
    })
  );
};
