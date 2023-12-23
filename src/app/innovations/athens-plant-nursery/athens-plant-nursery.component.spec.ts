import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthensPlantNurseryComponent } from './athens-plant-nursery.component';

describe('AthensPlantNurseryComponent', () => {
  let component: AthensPlantNurseryComponent;
  let fixture: ComponentFixture<AthensPlantNurseryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthensPlantNurseryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AthensPlantNurseryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
