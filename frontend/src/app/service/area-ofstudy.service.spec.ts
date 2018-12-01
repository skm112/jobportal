import { TestBed } from '@angular/core/testing';

import { AreaOfstudyService } from './area-ofstudy.service';

describe('AreaOfstudyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreaOfstudyService = TestBed.get(AreaOfstudyService);
    expect(service).toBeTruthy();
  });
});
