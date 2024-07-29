import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { JobAdDto } from '@app-models';
import { UpdateStatusComponent } from './update-status.component';

describe('UpdateStatusComponent', () => {
  let component: UpdateStatusComponent;
  let fixture: ComponentFixture<UpdateStatusComponent>;

  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UpdateStatusComponent>>;

  const mockJob = {
    id: '1',
    title: 'title',
    description: 'desc',
    skills: ['skill'],
    status: 'draft',
    createdAt: '2024-07-29',
    updatedAt: '2024-07-29',
  } as JobAdDto;

  beforeEach(async () => {

    const matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        UpdateStatusComponent,
        MatDialogModule,
        MatButtonToggleModule,
        MatButtonModule,
        CommonModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { job: mockJob } },
        { provide: MatDialogRef, useValue: matDialogRefMock }
      ]

    })
      .compileComponents();

    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<UpdateStatusComponent>>;

    fixture = TestBed.createComponent(UpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize allowed status changes', () => {
    expect(component.status).toBe(mockJob.status);
    expect(component.allowedStatusChanges).toEqual(['published']);
  });

  it('should update the status when onChange is called', () => {
    spyOn(component, 'onChange').and.callThrough();
    component.onChange({ value: 'published' } as MatButtonToggleChange);
    expect(component.status).toBe('published');
    expect(component.onChange).toHaveBeenCalled();
  });

  it('should close the dialog with updated job status when onSave is called', () => {
    component.status = 'published';
    component.onSave();

    const newJob = {
      ...mockJob,
      status: 'published',
      updatedAt: new Date().toISOString()
    } as JobAdDto;

    expect(dialogRefSpy.close).toHaveBeenCalledWith(newJob);
  });
});


