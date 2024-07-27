import { TestBed } from '@angular/core/testing';

import { UpdateStatusUtilityService } from './update-status-utility.service';

describe('UpdateStatusUtilityService', () => {
  let service: UpdateStatusUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateStatusUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
