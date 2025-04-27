import { TestBed } from '@angular/core/testing';

import { StatsTropheesService } from './stats-trophees.service';

describe('StatsTropheesService', () => {
  let service: StatsTropheesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsTropheesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
