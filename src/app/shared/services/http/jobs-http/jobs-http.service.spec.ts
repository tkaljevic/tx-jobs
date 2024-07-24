import { TestBed } from '@angular/core/testing';

import { JobsHttpService } from './jobs-http.service';

describe('JobsHttpService', () => {
  let service: JobsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
