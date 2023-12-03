import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmairComponent } from './farmair.component';

describe('FarmairComponent', () => {
  let component: FarmairComponent;
  let fixture: ComponentFixture<FarmairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmairComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FarmairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
