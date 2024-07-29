import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { JobAdDto } from '@app-models';
import { statusValidator } from '@core-validators';
import { JobFormComponent } from '../job-form/job-form.component';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [
    MatDialogModule,
    JobFormComponent,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditJobComponent implements OnInit {
  //#region Component props

  public jobForm: FormGroup;
  public data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<EditJobComponent>);

  //#endregion

  //#region Lifecycle Hooks

  ngOnInit(): void {
    this.initForm();
  }

  //#endregion

  //#region Init

  private initForm(): void {
    const job = this.data.job;
    this.jobForm = new FormGroup({
      title: new FormControl(job.title, [Validators.required]),
      description: new FormControl(job.description, [Validators.required]),
      skills: new FormControl(job.skills, [Validators.required]),
      status: new FormControl(job.status, [Validators.required, statusValidator(job.status)]),
    });
  }

  //#endregion

  //#region Utilities

  private convertFormValueToJob(): JobAdDto {
    const job = { ...this.jobForm.value } as JobAdDto;
    job.id = this.data.job.id;
    job.updatedAt = new Date().toISOString();
    job.createdAt = this.data.job.createdAt;

    return job;
  }

  //#endregion

  //#region UI Methods

  onSave(): void {
    const job = this.convertFormValueToJob();
    this.dialogRef.close(job);
  }

  //#endregion
}
