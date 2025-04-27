import { TestBed } from '@angular/core/testing';

import { StatsNiveauxService } from './stats-niveaux.service';

describe('StatsNiveauxService', () => {
  let service: StatsNiveauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsNiveauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
