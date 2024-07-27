import { JobAd } from "./job.model";

export interface JobAdDto extends JobAd {
  createdAt: Date;
  updatedAt: Date;
  _embedded: unknown;
}
