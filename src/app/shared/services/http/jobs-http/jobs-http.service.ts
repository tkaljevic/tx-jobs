import { Injectable } from '@angular/core';
import { JobAd, JobAdDto, PaginatedResponse } from '@app-models';
import { CoreHttpService } from '@core-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
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
  getJobs(
    page: number,
    perPage: number
  ): Observable<PaginatedResponse<JobAdDto>> {
    return this.get<PaginatedResponse<JobAdDto>>(
      `jobs?_page=${page}&_per_page=${perPage}&_sort=updatedAt`
    );
  }

  getAllJobs(): Observable<JobAdDto[]> {
    return this.get<JobAdDto[]>('jobs');
  }

  /**
   * Create a new Job.
   *
   * @param job Job to be saved
   * @returns Observable<JobAd> - Job created
   */
  addJob(job: Partial<JobAd>): Observable<JobAd> {
    return this.post<JobAd>('jobs', job);
  }

  /**
   * Delete a job, for ID given.
   *
   * @param jobId job to be deleted
   * @returns Observable<JobAd>
   */
  deleteJob(jobId: string): Observable<JobAd> {
    return this.delete<JobAd>(`jobs/${jobId}?_dependent=invoices`);
  }

  /**
   * Update job by providing new property values.
   *
   *
   * @param job Job to be updated
   * @returns Observable<JobAd> - updated value
   */
  updateJob(job: JobAd): Observable<JobAd> {
    return this.put<JobAd>(`jobs/${job.id}`, { ...job });
  }
}
