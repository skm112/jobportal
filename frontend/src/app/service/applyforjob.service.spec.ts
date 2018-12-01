import { TestBed } from '@angular/core/testing';

import { ApplyforjobService } from './applyforjob.service';

describe('ApplyforjobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplyforjobService = TestBed.get(ApplyforjobService);
    expect(service).toBeTruthy();
  });
});
