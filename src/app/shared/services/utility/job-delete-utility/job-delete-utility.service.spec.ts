import { TestBed } from '@angular/core/testing';

import { JobDeleteUtilityService } from './job-delete-utility.service';

describe('JobDeleteUtilityService', () => {
  let service: JobDeleteUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobDeleteUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
