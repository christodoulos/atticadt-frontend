import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonDangerTwoComponent } from './ribbon-danger-two.component';

describe('RibbonDangerTwoComponent', () => {
  let component: RibbonDangerTwoComponent;
  let fixture: ComponentFixture<RibbonDangerTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonDangerTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RibbonDangerTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
