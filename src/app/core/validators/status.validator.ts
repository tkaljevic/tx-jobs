import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { JobAdStatus } from "@app-models";

export function statusValidator(currentJobStatus: JobAdStatus): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const validChanges: Record<JobAdStatus, JobAdStatus[]> = {
      'draft': ['published', 'draft'],
      'published': ['archived', 'published'],
      'archived': ['archived']
    };

    if (!validChanges[currentJobStatus]?.includes(control.value)) {
      return { invalidStatusTransition: true };
    }

    return null;
  };
}
