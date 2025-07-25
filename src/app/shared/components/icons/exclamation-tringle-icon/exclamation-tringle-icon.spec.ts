import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExclamationTringleIcon } from './exclamation-tringle-icon';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ExclamationTringleIcon', () => {
  let component: ExclamationTringleIcon;
  let fixture: ComponentFixture<ExclamationTringleIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [ExclamationTringleIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(ExclamationTringleIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
