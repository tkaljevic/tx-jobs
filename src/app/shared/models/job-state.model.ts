import { CurrentPagination } from './current-pagination.model';
import { JobAd } from './job.model';
import { PaginatedResponse } from './paginated-response.model';
import { ToasterMessage } from './toaster-message.type';

export interface JobState {
  jobsData: PaginatedResponse<JobAd>;
  message: ToasterMessage;
  currentPagination: CurrentPagination;
}
