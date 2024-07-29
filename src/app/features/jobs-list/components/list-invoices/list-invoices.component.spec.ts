import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice, JobAd } from '@app-models';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as InvoiceActions from '../../../../core/store/actions/invoice.actions';
import * as InvoiceSelectors from '../../../../core/store/selectors/invoices.selectors';
import { ListInvoicesComponent } from './list-invoices.component';

describe('ListInvoicesComponent', () => {
  let component: ListInvoicesComponent;
  let fixture: ComponentFixture<ListInvoicesComponent>;

  let store: MockStore;
  const initialState = { invoices: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInvoicesComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: MAT_DIALOG_DATA, useValue: { job: { id: '1' } as JobAd } }
      ]
    })
      .compileComponents();

    store = TestBed.inject(Store) as MockStore;

    fixture = TestBed.createComponent(ListInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getInvoicesAction on initialization', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(
      InvoiceActions.getInvoicesAction({ jobId: '1' })
    );
  });

  it('should update invoices$ when invoices are selected from the store', () => {
    const invoices = [
      { id: '1', amount: 100, jobAdId: '1', dueDate: '2024' },
      { id: '2', amount: 200, jobAdId: '1', dueDate: '2024' }
    ] as Invoice[];
    store.overrideSelector(InvoiceSelectors.invoicesSelector, invoices);

    component.ngOnInit();
    component.invoices$.subscribe((data) => {
      expect(data).toEqual(invoices);
    });
  });
});
