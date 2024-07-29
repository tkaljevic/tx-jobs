import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpLoaderService {

  loaderDisplayed$ = new BehaviorSubject<boolean>(false);
  private requestCounter = 0;

  show(): void {
    if (++this.requestCounter) {
      this.loaderDisplayed$.next(true);
    }
  }

  hide(): void {
    if (this.requestCounter > 0 && --this.requestCounter === 0) {
      this.loaderDisplayed$.next(false);
    }
  }
}
