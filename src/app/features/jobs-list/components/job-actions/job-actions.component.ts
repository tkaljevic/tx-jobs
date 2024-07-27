import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { JobAd } from '@app-models';
import {
  JobDeleteUtilityService,
  UpdateStatusUtilityService,
} from '@shared-services';

@Component({
  selector: 'app-job-actions',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './job-actions.component.html',
  styleUrl: './job-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobActionsComponent {
  //#region Component props

  @Input() job: JobAd;
  private jobDeleteUtilityService = inject(JobDeleteUtilityService);
  private updateStatusService = inject(UpdateStatusUtilityService);

  //#endregion

  //#region UI Methods

  onDelete(): void {
    this.jobDeleteUtilityService.deleteJob(this.job);
  }

  onChangeStatus(): void {
    this.updateStatusService.updateStatus(this.job);
  }

  //#endregion
}
