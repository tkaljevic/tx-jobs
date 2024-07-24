import { JobAd, JobState } from "@app-models";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const jobsFeatureSelector = createFeatureSelector<JobState>('jobs');

export const allJobsSelector = createSelector(
  jobsFeatureSelector,
  (state: JobState): JobAd[] => state.jobs
)

export const jobsErrorSelector = createSelector(
  jobsFeatureSelector,
  (state: JobState): string => state.error
)
