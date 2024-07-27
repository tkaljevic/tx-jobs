import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { JobAd } from '@app-models';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { AddEditJobComponent } from 'src/app/features/jobs-list/components/add-edit-job/add-edit-job.component';
import { DeleteJobComponent } from 'src/app/features/jobs-list/components/delete-job/delete-job.component';
import { ListInvoicesComponent } from 'src/app/features/jobs-list/components/list-invoices/list-invoices.component';
import { UpdateStatusComponent } from 'src/app/features/jobs-list/components/update-status/update-status.component';
import * as JobActions from '../../../../core/store/actions/job.actions';

@Injectable({
  providedIn: 'root',
})
export class DialogUtilityService {
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);

  deleteJob(job: JobAd) {
    const deleteRef = this.dialog.open(DeleteJobComponent, {
      data: { job },
    });
    deleteRef
      .afterClosed()
      .pipe(
        filter((response) => !!response),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.store.dispatch(JobActions.deleteJobAction({ jobId: job.id }));
      });
  }

  updateStatus(job: JobAd) {
    const updateStatusRef = this.dialog.open(UpdateStatusComponent, {
      data: { job },
    });
    updateStatusRef
      .afterClosed()
      .pipe(
        filter((response) => !!response),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((job: JobAd) => {
        this.store.dispatch(JobActions.updateJobStatusAction({ job }));
      });
  }

  listInvoices(job: JobAd) {
    this.dialog.open(ListInvoicesComponent, {
      data: { job },
    });
  }

  editJob(job: JobAd) {
    const updateRef = this.dialog.open(AddEditJobComponent, {
      data: {
        job,
      },
    });

    updateRef
      .afterClosed()
      .pipe(
        filter((job) => !!job),
        map((job) => job as JobAd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((job) =>
        this.store.dispatch(JobActions.jobUpdateAction({ job }))
      );
  }
}
