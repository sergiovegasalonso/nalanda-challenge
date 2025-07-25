import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoIcon } from './info-icon';
import { provideZonelessChangeDetection } from '@angular/core';

describe('InfoIcon', () => {
  let component: InfoIcon;
  let fixture: ComponentFixture<InfoIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [InfoIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
