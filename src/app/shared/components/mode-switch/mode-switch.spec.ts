import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeSwitch } from './mode-switch';

describe('ModeSwitch', () => {
  let component: ModeSwitch;
  let fixture: ComponentFixture<ModeSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeSwitch],
    }).compileComponents();

    fixture = TestBed.createComponent(ModeSwitch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
