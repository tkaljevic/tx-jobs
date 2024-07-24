import { Injectable } from '@angular/core';
import { JobAdDto } from '@app-models';
import { CoreHttpService } from '@core-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsHttpService extends CoreHttpService {

  getJobs(): Observable<JobAdDto[]> {
    return this.get<JobAdDto[]>('jobs');
  }
}
