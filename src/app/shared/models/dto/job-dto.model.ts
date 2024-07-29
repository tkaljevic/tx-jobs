import { JobAd } from './job.model';

export interface JobAdDto extends JobAd {
  createdAt: string;
  updatedAt: string;
  _embedded: unknown;
}
