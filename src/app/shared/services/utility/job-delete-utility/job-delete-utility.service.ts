import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { JobAd } from '@app-models';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { DeleteJobComponent } from 'src/app/features/jobs-list/components/delete-job/delete-job.component';
import * as JobActions from '../../../../core/store/actions/job.actions';

@Injectable({
  providedIn: 'root',
})
export class JobDeleteUtilityService {
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
}
