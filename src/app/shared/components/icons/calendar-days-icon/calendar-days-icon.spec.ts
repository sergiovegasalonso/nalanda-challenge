import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarDaysIcon } from './calendar-days-icon';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CalendarDaysIcon', () => {
  let component: CalendarDaysIcon;
  let fixture: ComponentFixture<CalendarDaysIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
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
