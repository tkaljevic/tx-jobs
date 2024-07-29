import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobAd } from '@app-models';
import { DeleteJobComponent } from './delete-job.component';

describe('DeleteJobComponent', () => {
  let component: DeleteJobComponent;
  let fixture: ComponentFixture<DeleteJobComponent>;

  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DeleteJobComponent>>;
  const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
  const jobMock = {
    description: 'desc',
    id: '1',
    skills: ['skill'],
    status: 'archived',
    title: 'title',
  } as JobAd;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteJobComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { job: jobMock } }
      ]
    })
      .compileComponents();

    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<DeleteJobComponent>>;

    fixture = TestBed.createComponent(DeleteJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject the correct data', () => {
    expect(component.data).toEqual({ job: jobMock });
  });

  it('should run on confirm', () => {
    spyOn(component, 'onConfirm').and.callThrough();
    component.onConfirm();
    expect(component.onConfirm).toHaveBeenCalled();
  });

  it('should close the dialog with true', () => {
    spyOn(component, 'onConfirm').and.callThrough();
    component.onConfirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

});
