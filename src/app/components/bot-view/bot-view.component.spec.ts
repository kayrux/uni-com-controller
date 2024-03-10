import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotViewComponent } from './bot-view.component';

describe('BotViewComponent', () => {
  let component: BotViewComponent;
  let fixture: ComponentFixture<BotViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
