import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { httpErrorInterceptor, httpLoaderInterceptor } from '@core-interceptors';
import { environment } from '@environment';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { JobEffects } from './core/store/effects/job.effects';
import { jobReducer } from './core/store/reducers/job.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      httpLoaderInterceptor,
      httpErrorInterceptor
    ])),
    provideAnimationsAsync(),
    provideStore({ jobs: jobReducer }),
    provideEffects([JobEffects]),
    provideStoreDevtools({
      logOnly: environment.production,
      maxAge: 25
    }),
  ]
};
