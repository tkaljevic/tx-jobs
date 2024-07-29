import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddJobComponent } from './add-job.component';

describe('AddJobComponent', () => {
  let component: AddJobComponent;
  let fixture: ComponentFixture<AddJobComponent>;

  const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJobComponent, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddJobComponent);
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

  it('should define valid job', () => {
    component.jobForm.patchValue({
      title: 'test',
      description: 'desc',
      skills: ['skill'],
      status: 'draft'
    });

    const job = component['convertFormValueToJob']();

    expect(job.title).toBe('test');
    expect(job.description).toBe('desc');
    expect(job.skills).toEqual(['skill']);
    expect(job.status).toBe('draft');
    expect(job.createdAt).toBeDefined();
    expect(job.updatedAt).toBeDefined();
  });
});
