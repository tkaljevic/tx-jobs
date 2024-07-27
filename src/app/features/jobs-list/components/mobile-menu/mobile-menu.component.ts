import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { JobAd } from '@app-models';
import {
  JobDeleteUtilityService,
  UpdateStatusUtilityService,
} from '@shared-services';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent {
  //#region Component Props

  @Input() job: JobAd;

  private deleteJobService = inject(JobDeleteUtilityService);
  private updateStatusService = inject(UpdateStatusUtilityService);

  //#endregion

  //#region  UI Methods

  onDelete() {
    this.deleteJobService.deleteJob(this.job);
  }

  onChangeStatus() {
    this.updateStatusService.updateStatus(this.job);
  }

  //#endregion
}
