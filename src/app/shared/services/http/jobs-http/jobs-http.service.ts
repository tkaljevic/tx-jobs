import { Injectable } from '@angular/core';
import { JobAdDto } from '@app-models';
import { CoreHttpService } from '@core-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsHttpService extends CoreHttpService {

  /**
   * Get Jobs chunk from the http source
   *
   * @param start starting job position
   * @param limit how many jobs to get
   *
   * @returns Observable<JobAdDto[]>
   */
  getJobs(start: number, limit: number): Observable<JobAdDto[]> {
    return this.get<JobAdDto[]>(`jobs?_start=${start}&_limit=${limit}`);
  }
}
