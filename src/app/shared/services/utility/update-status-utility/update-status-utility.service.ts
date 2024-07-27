import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { JobAd } from '@app-models';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { UpdateStatusComponent } from 'src/app/features/jobs-list/components/update-status/update-status.component';
import * as JobActions from '../../../../core/store/actions/job.actions';

@Injectable({
  providedIn: 'root',
})
export class UpdateStatusUtilityService {
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);

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
}
