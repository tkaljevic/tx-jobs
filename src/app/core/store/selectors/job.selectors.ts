import { JobAd, JobState, Pagination } from "@app-models";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const jobsFeatureSelector = createFeatureSelector<JobState>('jobs');

export const allJobsSelector = createSelector(
  jobsFeatureSelector,
  (state: JobState): JobAd[] => state.jobsData.data
)

export const jobsErrorSelector = createSelector(
  jobsFeatureSelector,
  (state: JobState): string => state.error
)

export const jobsPaginationSelector = createSelector(
  jobsFeatureSelector,
  (state: JobState): Pagination => {
    const { first, items, last, next, pages, prev } = state.jobsData;
    return { first, items, last, next, pages, prev };
  }
)
