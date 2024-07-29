import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpLoaderService } from '@core-services';
import { finalize } from 'rxjs';

export const httpLoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(HttpLoaderService);
  loaderService.show();
  return next(req).pipe(
    finalize(() => {
      loaderService.hide();
    })
  );
};
