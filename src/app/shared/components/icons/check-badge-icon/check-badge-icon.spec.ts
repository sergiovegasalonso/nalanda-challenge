import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckBadgeIcon } from './check-badge-icon';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CheckBadgeIcon', () => {
  let component: CheckBadgeIcon;
  let fixture: ComponentFixture<CheckBadgeIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [CheckBadgeIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckBadgeIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
