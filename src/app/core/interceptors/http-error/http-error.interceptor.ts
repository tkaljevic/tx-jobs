import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToasterService } from '@core-services';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(ToasterService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      service.showError(error.message);
      return throwError(() => new Error(error.message));
    })
  );
};
