import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDemoComponent } from './card-demo.component';

describe('CardDemoComponent', () => {
  let component: CardDemoComponent;
  let fixture: ComponentFixture<CardDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
