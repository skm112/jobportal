import { TestBed } from '@angular/core/testing';

import { ShowappliedjobsService } from './showappliedjobs.service';

describe('ShowappliedjobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowappliedjobsService = TestBed.get(ShowappliedjobsService);
    expect(service).toBeTruthy();
  });
});
