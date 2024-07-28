import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { JobAdDto, JobAdStatus } from '@app-models';
@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './add-edit-job.component.html',
  styleUrl: './add-edit-job.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditJobComponent implements OnInit {
  //#region Component Props

  public jobForm: FormGroup;
  public currentSkills = signal<string[]>([]);
  public jobStatuses: JobAdStatus[] = ['archived', 'draft', 'published'];
  public mode: 'add' | 'edit';
  public currentJobStatus: JobAdStatus | null = null;

  public data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<AddEditJobComponent>);

  //#endregion

  //#region Lifecycle hooks

  ngOnInit(): void {
    this.initMode();
    this.initSkills();
    this.initStatus();
    this.initForm();
  }

  //#endregion

  //#region Init

  private initMode() {
    this.mode = this.data && this.data.job ? 'edit' : 'add';
  }

  private initSkills() {
    if (this.mode === 'edit') {
      this.currentSkills.set(this.data.job.skills);
    }
  }

  private initStatus() {
    this.currentJobStatus = this.mode === 'edit' ? this.data.job.status : null;
  }

  private initForm(): void {
    this.jobForm = new FormGroup({
      title: new FormControl(this.mode === 'add' ? '' : this.data.job.title, [
        Validators.required,
      ]),
      description: new FormControl(
        this.mode === 'add' ? '' : this.data.job.description,
        [Validators.required]
      ),
      skills: new FormControl(this.mode === 'add' ? [] : this.data.job.skills, [
        Validators.required,
      ]),
      status: new FormControl(this.mode === 'add' ? '' : this.data.job.status, [
        Validators.required,
      ]),
    });
  }

  //#endregion

  //#region Utilities

  private convertFormValueToJob(): JobAdDto {
    const job = { ...this.jobForm.value } as JobAdDto;
    if (this.mode === 'edit') {
      job.id = this.data.job.id;
    }
    const now = new Date().toISOString();
    job.updatedAt = now;
    job.createdAt = this.mode === 'edit' ? this.data.job.createdAt : now;
    return job;
  }

  //#endregion

  //#region UI Methods

  onRemoveSkill(skillName: string) {
    this.currentSkills.update((currentSkills) => {
      const index = currentSkills.indexOf(skillName);
      if (index < 0) {
        return currentSkills;
      }
      const allSkills = [...currentSkills];
      allSkills.splice(index, 1);
      this.jobForm.patchValue({
        skills: allSkills,
      });
      return [...allSkills];
    });
  }

  onAddSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.currentSkills.update((currentSkills) => [...currentSkills, value]);
    }
    event.chipInput!.clear();
    this.jobForm.patchValue({
      skills: this.currentSkills(),
    });
  }

  onSave(): void {
    const job = this.convertFormValueToJob();
    this.dialogRef.close(job);
  }

  //#endregion
}
