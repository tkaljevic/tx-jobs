import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { JobAdStatus } from '@app-models';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobFormComponent implements OnInit {
  //#region Component props

  @Input() jobForm: FormGroup;
  public currentSkills = signal<string[]>([]);
  public jobStatuses: JobAdStatus[] = ['archived', 'draft', 'published'];

  //#endregion

  //#region Lifecycle Hooks

  ngOnInit(): void {
    this.initSkills();
  }

  //#endregion

  //#region Init

  private initSkills(): void {
    this.currentSkills.set(this.jobForm.controls['skills'].value);
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

  //#endregion

}
