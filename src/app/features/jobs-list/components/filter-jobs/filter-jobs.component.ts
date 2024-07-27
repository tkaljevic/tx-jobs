import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import * as JobActions from '../../../../core/store/actions/job.actions';

@Component({
  selector: 'app-filter-jobs',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './filter-jobs.component.html',
  styleUrl: './filter-jobs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterJobsComponent implements OnInit {
  //#region Component Props

  public filterForm: FormGroup;
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);

  //#endregion

  //#region Lifecycle Hooks

  ngOnInit(): void {
    this.initForm();
    this.initSearchSubscription();
  }

  //#endregion

  //#region Init

  private initForm(): void {
    this.filterForm = new FormGroup({
      term: new FormControl('', []),
    });
  }

  private initSearchSubscription(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(this.handleSearch);
  }

  //#endregion

  //#region Handlers

  private handleSearch = (term: string): void => {
    this.store.dispatch(JobActions.searchJobsAction({ term }));
  };

  //#endregion
}
