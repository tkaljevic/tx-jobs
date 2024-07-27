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
import { DialogUtilityService } from '@shared-services';

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
  private dialogUtilityService = inject(DialogUtilityService);

  //#endregion

  //#region  UI Methods

  onDelete() {
    this.dialogUtilityService.deleteJob(this.job);
  }

  onChangeStatus() {
    this.dialogUtilityService.updateStatus(this.job);
  }

  onListInvoices() {
    this.dialogUtilityService.listInvoices(this.job);
  }

  onEdit() {
    this.dialogUtilityService.editJob(this.job);
  }

  //#endregion
}
