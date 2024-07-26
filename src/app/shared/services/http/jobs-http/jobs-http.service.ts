import { Injectable } from '@angular/core';
import { JobAdDto, PaginatedResponse } from '@app-models';
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
    return this.get<PaginatedResponse<JobAdDto>>(`jobs?_page=${page}&_per_page=${perPage}`);
  }
}
