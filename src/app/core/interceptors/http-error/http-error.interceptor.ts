import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import * as JobActions from '../../../core/store/actions/job.actions';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      store.dispatch(JobActions.setErrorMessage({ message: error.message }));
      return throwError(() => new Error(error.message));
    })
  );
};
