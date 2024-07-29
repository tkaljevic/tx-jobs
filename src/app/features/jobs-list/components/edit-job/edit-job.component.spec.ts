import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobAd } from '@app-models';
import { JobFormComponent } from '../job-form/job-form.component';
import { EditJobComponent } from './edit-job.component';

describe('EditJobComponent', () => {
  let component: EditJobComponent;
  let fixture: ComponentFixture<EditJobComponent>;

  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EditJobComponent>>;

  const jobData = {
    job: {
      id: '1',
      title: 'Test',
      description: 'desc',
      skills: ['skill'],
      status: 'draft',
    } as JobAd
  };

  beforeEach(async () => {

    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        EditJobComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        JobFormComponent,
        MatButtonModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: jobData },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should init form', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.jobForm).toBeDefined();
  });

  it('should call on save method', () => {
    spyOn(component, 'onSave').and.callThrough();
    component.onSave();
    expect(component.onSave).toHaveBeenCalled();
  });

  it('should update return valid data on onSave', () => {
    const updatedTitle = 'Backend Developer';
    component.jobForm.patchValue({ title: updatedTitle });
    component.onSave();

    expect(dialogRefSpy.close).toHaveBeenCalledOnceWith(jasmine.objectContaining({ title: updatedTitle }));
  });
});
