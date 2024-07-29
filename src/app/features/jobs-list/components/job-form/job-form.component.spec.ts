import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobFormComponent } from './job-form.component';

describe('JobFormComponent', () => {
  let component: JobFormComponent;
  let fixture: ComponentFixture<JobFormComponent>;

  const formMock = new FormGroup({
    title: new FormControl('title'),
    description: new FormControl('desc'),
    skills: new FormControl(['skill']),
    status: new FormControl('draft'),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        JobFormComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JobFormComponent);
    component = fixture.componentInstance;
    component.jobForm = formMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove skill', () => {
    spyOn(component, 'onRemoveSkill').and.callThrough();
    component.onRemoveSkill('skill');
    expect(component.onRemoveSkill).toHaveBeenCalled();
  });

  it('should remove non-existing skill', () => {
    spyOn(component, 'onRemoveSkill').and.callThrough();
    component.onRemoveSkill('skill fake');
    expect(component.onRemoveSkill).toHaveBeenCalled();
  });

  it('should add skill', () => {
    spyOn(component, 'onAddSkill').and.callThrough();

    const mockChipInput = {
      clear: jasmine.createSpy('clear')
    };
    const event = {
      value: 'new skill',
      chipInput: mockChipInput as unknown
    } as MatChipInputEvent;
    component.onAddSkill(event);

    event.value = '';
    component.onAddSkill(event);

    expect(component.onAddSkill).toHaveBeenCalled();
  });
});
