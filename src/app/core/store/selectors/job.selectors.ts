import {
  CurrentPagination,
  JobAd,
  JobState,
  Pagination,
  ToasterMessage,
} from '@app-models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const jobsFeatureSelector = createFeatureSelector<JobState>('jobs');

export const allJobsSelector = createSelector(
  jobsFeatureSelector,
  (state: JobState): JobAd[] => state.jobsData.data
);

export const toasterMessageSelector = createSelector(
  jobsFeatureSelector,
  (state: JobState): ToasterMessage => state.message
);

export const jobsPaginationSelector = createSelector(
  jobsFeatureSelector,
  (state: JobState): Pagination => {
    const { first, items, last, next, pages, prev } = state.jobsData;
    return { first, items, last, next, pages, prev };
  }
);

export const currentPaginationSelector = createSelector(
  jobsFeatureSelector,
  (state: JobState): CurrentPagination => state.currentPagination
);
