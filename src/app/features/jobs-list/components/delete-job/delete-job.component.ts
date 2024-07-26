import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-job',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './delete-job.component.html',
  styleUrl: './delete-job.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteJobComponent {
  //#region Component props

  private dialogRef = inject(MatDialogRef<DeleteJobComponent>);
  public data = inject(MAT_DIALOG_DATA);

  //#endregion

  //#region UI Methods

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  //#endregion

}
