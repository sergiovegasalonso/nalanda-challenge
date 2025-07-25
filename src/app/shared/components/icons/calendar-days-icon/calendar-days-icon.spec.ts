import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDaysIcon } from './calendar-days-icon';

describe('CalendarDaysIcon', () => {
  let component: CalendarDaysIcon;
  let fixture: ComponentFixture<CalendarDaysIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarDaysIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarDaysIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
