import { JobAd } from "./job.model";
import { PaginatedResponse } from "./paginated-response.model";

export interface JobState {
  jobsData: PaginatedResponse<JobAd>;
  error: string;
}
