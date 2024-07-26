import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonUtilityService {
  public jobDeleteConfirmation = new Subject<string>();
}
