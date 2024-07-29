import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as JobActions from '../../../../core/store/actions/job.actions';
import { FilterJobsComponent } from './filter-jobs.component';

describe('FilterJobsComponent', () => {
  let component: FilterJobsComponent;
  let fixture: ComponentFixture<FilterJobsComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FilterJobsComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();

    store = TestBed.inject(Store) as MockStore;

    fixture = TestBed.createComponent(FilterJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty term', () => {
    const filterForm = component.filterForm;
    expect(filterForm).toBeTruthy();
    expect(filterForm.get('term')?.value).toBe('');
  });

  it('should dispatch searchJobsAction when form value is changed', fakeAsync(() => {
    spyOn(store, 'dispatch');

    const term = 'something';
    component.filterForm.patchValue({ term });
    tick(1000);

    expect(store.dispatch).toHaveBeenCalledWith(JobActions.searchJobsAction({ term }));
  }));
});

// Expected spy dispatch to have been called with: [ Object({ term: 'something', type: '[Jobs] Search' }) ]
// but actual calls were:                          [ Object({ term: Object({ term: 'something' }), type: '[Jobs] Search' }) ].
