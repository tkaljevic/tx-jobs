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
import { JobAd, JobAdStatus } from '@app-models';
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
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddJobComponent implements OnInit {
  //#region Component Props

  public jobForm: FormGroup;
  public currentSkills = signal<string[]>([]);
  public jobStatuses: JobAdStatus[] = ['archived', 'draft', 'published'];
  public mode: 'add' | 'edit';
  public currentJobStatus: JobAdStatus | null = null;

  public data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<AddJobComponent>);

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
      skills: new FormControl(
        this.mode === 'add' ? [] : this.data.job.skills,
        []
      ),
      status: new FormControl(this.mode === 'add' ? '' : this.data.job.status, [
        Validators.required,
      ]),
    });
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
      return [...allSkills];
    });
  }

  onAddSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.currentSkills.update((currentSkills) => [...currentSkills, value]);
    }
    event.chipInput!.clear();
  }

  onSave(): void {
    const job = { ...this.jobForm.value } as JobAd;
    if (this.mode === 'edit') {
      job.id = this.data.job.id;
    }
    this.dialogRef.close(job);
  }

  //#endregion
}
