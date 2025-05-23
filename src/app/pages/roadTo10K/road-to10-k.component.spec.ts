import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadTo10KComponent } from './road-to10-k.component';

describe('RoadTo10KComponent', () => {
  let component: RoadTo10KComponent;
  let fixture: ComponentFixture<RoadTo10KComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadTo10KComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadTo10KComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
