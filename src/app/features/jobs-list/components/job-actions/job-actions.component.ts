import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { JobAd } from '@app-models';
import { DialogUtilityService } from '@shared-services';

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
  private dialogUtilityService = inject(DialogUtilityService);

  //#endregion

  //#region UI Methods

  onDelete(): void {
    this.dialogUtilityService.deleteJob(this.job);
  }

  onChangeStatus(): void {
    this.dialogUtilityService.updateStatus(this.job);
  }

  onListInvoices(): void {
    this.dialogUtilityService.listInvoices(this.job);
  }

  onEdit(): void {
    this.dialogUtilityService.editJob(this.job);
  }

  //#endregion
}
