import { JobAd } from '../dto';
import { CurrentPagination, PaginatedResponse } from '../pagination';
import { ToasterMessage } from '../ui';

export interface JobState {
  jobsData: PaginatedResponse<JobAd>;
  message: ToasterMessage;
  currentPagination: CurrentPagination;
}
