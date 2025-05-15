import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuxPlateformeFormComponent } from './jeux-plateforme-form.component';

describe('JeuxPlateformeFormComponent', () => {
  let component: JeuxPlateformeFormComponent;
  let fixture: ComponentFixture<JeuxPlateformeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JeuxPlateformeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JeuxPlateformeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
