import { JobAd } from "./job.model";

export interface JobState {
  jobs: JobAd[];
  error: string;
}
