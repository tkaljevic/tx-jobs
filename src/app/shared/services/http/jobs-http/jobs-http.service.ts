import { Injectable } from '@angular/core';
import { CoreHttpService } from '@core-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsHttpService extends CoreHttpService {

  getJobs(): Observable<any> {
    return this.get('jobs');
  }
}
