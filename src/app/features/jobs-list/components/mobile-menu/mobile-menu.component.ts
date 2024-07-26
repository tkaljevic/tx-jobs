import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { JobAd } from '@app-models';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import * as JobActions from '../../../../core/store/actions/job.actions';
import { DeleteJobComponent } from '../delete-job/delete-job.component';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileMenuComponent {

  //#region Component Props

  @Input() job: JobAd;

  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);

  //#endregion

  //#region  UI Methods

  onDelete() {
    const deleteRef = this.dialog.open(DeleteJobComponent, { data: { job: this.job } },);
    deleteRef.afterClosed()
      .pipe(
        filter(response => !!response),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(this.handleDeleteResponse);
  }

  //#endregion

  //#region Handlers

  private handleDeleteResponse = () => {
    this.store.dispatch(JobActions.deleteJobAction({ jobId: this.job.id }))
  }

  //#endregion

}
