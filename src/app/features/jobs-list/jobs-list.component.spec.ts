import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobAd } from '@app-models';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as JobActions from '../../core/store/actions/job.actions';
import * as JobSelectors from '../../core/store/selectors/job.selectors';
import { AddJobComponent } from './components/add-job/add-job.component';
import { JobsListComponent } from './jobs-list.component';
describe('JobsListComponent', () => {
  let component: JobsListComponent;
  let fixture: ComponentFixture<JobsListComponent>;

  let store: MockStore;

  const initialState = {
    jobs: [],
    pagination: {},
    currentPagination: { page: 1, perPage: 10 },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        JobsListComponent,
        BrowserAnimationsModule,
        MatDialogModule,
        AddJobComponent
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } }
      ],
    })
      .compileComponents();

    store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(JobSelectors.currentPaginationSelector, { page: 1, perPage: 5 });
    store.overrideSelector(JobSelectors.jobsPaginationSelector, { first: 0, items: 1, last: 1, next: 1, pages: 1, prev: 1 });
    store.overrideSelector(JobSelectors.allJobsSelector, [{ description: 'desc', id: 'a', skills: ['skill'], status: 'draft', title: 'test' } as JobAd]);

    fixture = TestBed.createComponent(JobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init component with values from selectors', fakeAsync(() => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    tick();
    expect(component.ngOnInit).toHaveBeenCalled();

  }));

  it('should change pagination values', () => {
    spyOn(component, 'onPaginationChange').and.callThrough();
    const dispatchMock = spyOn(store, 'dispatch');

    component.onPaginationChange({ pageIndex: 1, pageSize: 5 } as PageEvent);

    expect(component.onPaginationChange).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith(JobActions.setCurrentPagination({ page: 2, perPage: 5 }));
    expect(dispatchMock).toHaveBeenCalledWith(JobActions.loadJobsAction({ page: 2, perPage: 5 }));
  });

});
