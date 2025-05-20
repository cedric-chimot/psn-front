import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutonsNavigationComponent } from './boutons-navigation.component';

describe('BoutonsNavigationComponent', () => {
  let component: BoutonsNavigationComponent;
  let fixture: ComponentFixture<BoutonsNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutonsNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutonsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
