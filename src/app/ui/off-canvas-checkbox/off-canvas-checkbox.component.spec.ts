import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCanvasCheckboxComponent } from './off-canvas-checkbox.component';

describe('OffCanvasCheckboxComponent', () => {
  let component: OffCanvasCheckboxComponent;
  let fixture: ComponentFixture<OffCanvasCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffCanvasCheckboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffCanvasCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
