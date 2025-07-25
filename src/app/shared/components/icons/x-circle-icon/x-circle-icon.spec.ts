import { ComponentFixture, TestBed } from '@angular/core/testing';
import { XCircleIcon } from './x-circle-icon';
import { provideZonelessChangeDetection } from '@angular/core';

describe('XCircleIcon', () => {
  let component: XCircleIcon;
  let fixture: ComponentFixture<XCircleIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [XCircleIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(XCircleIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
