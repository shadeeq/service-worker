import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatmapDemoComponent } from './seatmap-demo.component';

describe('SeatmapDemoComponent', () => {
  let component: SeatmapDemoComponent;
  let fixture: ComponentFixture<SeatmapDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatmapDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeatmapDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
