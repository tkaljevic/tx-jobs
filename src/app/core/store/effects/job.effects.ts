import { inject, Injectable } from '@angular/core';
import { Invoice, JobAd } from '@app-models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { JobsHttpService } from '@shared-services';
import { catchError, concatMap, map, mergeMap, of, withLatestFrom } from 'rxjs';
import * as InvoiceActions from '../actions/invoice.actions';
import * as JobActions from '../actions/job.actions';
import * as JobSelectors from '../selectors/job.selectors';

@Injectable()
export class JobEffects {
  private actions$ = inject(Actions);
  private jobsHttpService = inject(JobsHttpService);
  private store = inject(Store);

  loadJobsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.loadJobsAction),
      mergeMap((action) =>
        this.jobsHttpService.getJobs(action.page, action.perPage).pipe(
          map((data) => JobActions.loadJobsSuccessAction({ data })),
          catchError((error) => {
            return of(
              JobActions.loadJobsFailureAction({ error: error.message })
            );
          })
        )
      )
    )
  );

  deleteJobsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.deleteJobAction),
      withLatestFrom(
        this.store.pipe(select(JobSelectors.currentPaginationSelector)),
        this.store.pipe(select(JobSelectors.jobsPaginationSelector))
      ),
      mergeMap(([action, pagination, metaPagination]) =>
        this.jobsHttpService.deleteJob(action.jobId).pipe(
          concatMap(() => {
            /**
             * Corner case - Deleting the last element
             * which require return to the previous page.
             */
            if (
              metaPagination.next === null &&
              metaPagination.items === pagination.perPage + 1
            ) {
              return [
                JobActions.setCurrentPagination({
                  page: pagination.page - 1,
                  perPage: pagination.perPage,
                }),
                JobActions.deleteJobSuccessAction(),
                JobActions.loadJobsAction({
                  page: pagination.page - 1,
                  perPage: pagination.perPage,
                }),
              ];
            }
            return [
              JobActions.deleteJobSuccessAction(),
              JobActions.loadJobsAction({
                page: pagination.page,
                perPage: pagination.perPage,
              }),
            ];
          }),
          catchError((error) =>
            of(JobActions.deleteJobFailureAction({ error: error.message }))
          )
        )
      )
    )
  );

  addNewJobEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.addNewJobAction),
      withLatestFrom(
        this.store.pipe(select(JobSelectors.currentPaginationSelector))
      ),
      mergeMap(([action, pagination]) =>
        this.jobsHttpService.addJob(action.job).pipe(
          concatMap((job) => {
            const actions: Action[] = [
              JobActions.addJobSuccessAction({ job }),
              JobActions.loadJobsAction({
                page: pagination.page,
                perPage: pagination.perPage,
              }),
            ];
            if (job.status === 'published') {
              actions.push(
                InvoiceActions.createInvoiceAction({
                  invoice: this.getRandomInvoice(job),
                })
              );
            }
            return actions;
          }),
          catchError((error) => {
            return of(
              JobActions.addNewJobFailureAction({ error: error.message })
            );
          })
        )
      )
    )
  );

  updateStatusEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.updateJobStatusAction),
      withLatestFrom(
        this.store.pipe(select(JobSelectors.currentPaginationSelector))
      ),
      mergeMap(([action, pagination]) =>
        this.jobsHttpService.updateJob(action.job).pipe(
          concatMap(() => {
            const actions: Action[] = [
              JobActions.updateJobStatusSuccessAction(),
              JobActions.loadJobsAction({
                page: pagination.page,
                perPage: pagination.perPage,
              }),
            ];
            if (action.job.status === 'published') {
              actions.push(
                InvoiceActions.createInvoiceAction({
                  invoice: this.getRandomInvoice(action.job),
                })
              );
            }
            return actions;
          }),
          catchError((error) => {
            return of(
              JobActions.updateJobStatusFailureAction({
                error: error.message,
              })
            );
          })
        )
      )
    )
  );

  searchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.searchJobsAction),
      withLatestFrom(
        this.store.pipe(select(JobSelectors.currentPaginationSelector))
      ),
      mergeMap(([action, pagination]) => {
        const term = Object.values(action.term)[0].toLowerCase();
        if (!term.length) {
          return of(
            JobActions.loadJobsAction({
              page: pagination.page,
              perPage: pagination.perPage,
            })
          );
        }
        /**
         * AD:
         * Potential bug - Filtered jobs are not aligned with the pagination displayed on the page.
         * However, json-server filtering did not work as expected, which is the key reason for
         * this solution involving local data filtering.
         */
        return this.jobsHttpService.getAllJobs().pipe(
          map((allJobs) => {
            return allJobs.filter(
              (job) =>
                job.title.toLowerCase().includes(term) ||
                job.description.toLowerCase().includes(term) ||
                job.skills.some((skill) =>
                  skill.toLowerCase().includes(term)
                ) ||
                job.status.toLowerCase().includes(term)
            );
          }),
          map((jobs) => JobActions.showFilteredJobsAction({ jobs })),
          catchError((error) => {
            return of(
              JobActions.setErrorMessage({
                message: error.message,
              })
            );
          })
        );
      })
    )
  );

  updateJobEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.jobUpdateAction),
      withLatestFrom(
        this.store.pipe(select(JobSelectors.currentPaginationSelector))
      ),
      mergeMap(([action, pagination]) =>
        this.jobsHttpService.updateJob(action.job).pipe(
          concatMap((job) => {
            const actions: Action[] = [
              JobActions.jobUpdateSuccessAction({ job }),
              JobActions.loadJobsAction({
                page: pagination.page,
                perPage: pagination.perPage,
              }),
            ];
            if (action.job.status === 'published') {
              actions.push(
                InvoiceActions.createInvoiceAction({
                  invoice: this.getRandomInvoice(action.job),
                })
              );
            }
            return actions;
          }),
          catchError((error) => {
            return of(
              JobActions.jobUpdateFailureAction({
                error: error.message,
              })
            );
          })
        )
      )
    )
  );

  getRandomInvoice(job: JobAd): Omit<Invoice, 'id'> {
    const invoiceDueDate = new Date();
    invoiceDueDate.setMonth(invoiceDueDate.getMonth() + 2);
    invoiceDueDate.setDate(0);
    return {
      amount: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
      dueDate: invoiceDueDate,
      jobAdId: job.id,
    };
  }
}
