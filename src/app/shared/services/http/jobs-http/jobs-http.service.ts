import { Injectable } from '@angular/core';
import { JobAd, JobAdDto, PaginatedResponse } from '@app-models';
import { CoreHttpService } from '@core-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsHttpService extends CoreHttpService {

  /**
   * Get Jobs chunk from the http source
   *
   * @param page starting page
   * @param perPage number of jobs per page
   *
   * @returns Observable<JobAdDto[]>
   */
  getJobs(page: number, perPage: number): Observable<PaginatedResponse<JobAdDto>> {
    return this.get<PaginatedResponse<JobAdDto>>(`jobs?_page=${page}&_per_page=${perPage}&_sort=updatedAt`);
  }


  /**
   * Create a new Job.
   *
   * @param job Job to be saved
   * @returns Job created
   */
  addJob(job: Partial<JobAd>): Observable<JobAd> {
    return this.post<JobAd>('jobs', job);
  }

  /**
   *
   * @param jobId
   * @returns
   */
  deleteJob(jobId: string): Observable<JobAd> {
    return this.delete<JobAd>(`jobs/${jobId.toString()}`);
  }
}
