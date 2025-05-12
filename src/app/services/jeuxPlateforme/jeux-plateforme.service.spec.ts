import { TestBed } from '@angular/core/testing';

import { JeuxPlateformeService } from './jeux-plateforme.service';

describe('JeuxPlateformeService', () => {
  let service: JeuxPlateformeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JeuxPlateformeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
