import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMiddleBrandComponent } from './top-middle-brand.component';

describe('TopMiddleBrandComponent', () => {
  let component: TopMiddleBrandComponent;
  let fixture: ComponentFixture<TopMiddleBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMiddleBrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopMiddleBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
