import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { JobAdStatus } from '@app-models';
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
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddJobComponent implements OnInit {
  public jobForm: FormGroup;
  public currentSkills = signal<string[]>([]);
  public jobStatuses: JobAdStatus[] = ['archived', 'draft', 'published'];

  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddJobComponent>);

  ngOnInit(): void {
    this.initForm();
  }

  //#region Init

  private initForm(): void {
    this.jobForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      skills: new FormControl([''], []),
      status: new FormControl('', [Validators.required]),
    });
  }

  //#endregion

  //#region UI Methods

  onRemoveSkill(skillName: string) {
    this.currentSkills.update((keywords) => {
      const index = keywords.indexOf(skillName);
      if (index < 0) {
        return keywords;
      }
      keywords.splice(index, 1);
      return [...keywords];
    });
  }

  onAddSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.currentSkills.update((keywords) => [...keywords, value]);
    }
    event.chipInput!.clear();
  }

  onSave(): void {
    this.dialogRef.close(this.jobForm.value);
  }

  //#endregion
}
