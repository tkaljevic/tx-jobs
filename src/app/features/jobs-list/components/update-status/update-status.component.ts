import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { JobAd, JobAdStatus } from '@app-models';

@Component({
  selector: 'app-update-status',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonToggleModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './update-status.component.html',
  styleUrl: './update-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateStatusComponent implements OnInit {
  //#region  Component Props
  public data = inject(MAT_DIALOG_DATA);
  public status: JobAdStatus;
  public allStatuses: JobAdStatus[] = ['archived', 'draft', 'published'];
  public allowedStatusChanges: JobAdStatus[];
  public possibleChanges: Record<JobAdStatus, JobAdStatus[]> = {
    draft: ['published'],
    published: ['archived'],
    archived: [],
  };
  private dialogRef = inject(MatDialogRef<UpdateStatusComponent>);

  //#endregion

  //#region Lifecycle Hooks

  ngOnInit(): void {
    this.initAllowedStatusChanges();
    this.initStatus();
  }

  //#endregion

  //#region Init

  private initStatus(): void {
    this.status = this.data.job.status;
  }

  private initAllowedStatusChanges(): void {
    this.allowedStatusChanges =
      this.possibleChanges[this.data.job.status as JobAdStatus];
  }

  //#endregion

  //#region UI methods

  onChange(event: MatButtonToggleChange): void {
    this.status = event.value;
  }

  onSave(): void {
    const job = { ...this.data.job } as JobAd;
    job.status = this.status;
    this.dialogRef.close(job);
  }

  //#endregion
}
