import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { JobAdDto } from '@app-models';
import { JobFormComponent } from "../job-form/job-form.component";

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [
    MatDialogModule,
    JobFormComponent,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddJobComponent implements OnInit {

  //#region Component Properties

  public jobForm: FormGroup;
  public data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<AddJobComponent>);


  //#endregion

  //#region Lifecycle Hooks

  ngOnInit(): void {
    this.initForm();
  }

  //#endregion

  //#region Init

  private initForm(): void {
    this.jobForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      skills: new FormControl([], [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  //#endregion

  //#region Utilities

  private convertFormValueToJob(): JobAdDto {
    const job = { ...this.jobForm.value } as JobAdDto;
    const now = new Date().toISOString();
    job.updatedAt = now;
    job.createdAt = now;

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
