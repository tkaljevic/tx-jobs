import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAd } from '@app-models';
import { DialogUtilityService } from '@shared-services';
import { MobileMenuComponent } from './mobile-menu.component';

describe('MobileMenuComponent', () => {
  let component: MobileMenuComponent;
  let fixture: ComponentFixture<MobileMenuComponent>;

  const mockJob: JobAd = {
    id: '1',
    title: 'test',
    description: 'desc',
    skills: ['skill'],
    status: 'draft'
  };

  const dialogServiceMock = jasmine.createSpyObj('DialogUtilityService', ['deleteJob', 'updateStatus', 'listInvoices', 'editJob']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileMenuComponent],
      providers: [
        { provide: DialogUtilityService, useValue: dialogServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MobileMenuComponent);
    component = fixture.componentInstance;
    component.job = mockJob;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteJob', () => {
    component.onDelete();
    expect(dialogServiceMock.deleteJob).toHaveBeenCalledWith(mockJob);
  });

  it('should call updateStatus', () => {
    component.onChangeStatus();
    expect(dialogServiceMock.updateStatus).toHaveBeenCalledWith(mockJob);
  });

  it('should call listInvoices', () => {
    component.onListInvoices();
    expect(dialogServiceMock.listInvoices).toHaveBeenCalledWith(mockJob);
  });

  it('should call editJob', () => {
    component.onEdit();
    expect(dialogServiceMock.editJob).toHaveBeenCalledWith(mockJob);
  });
});
