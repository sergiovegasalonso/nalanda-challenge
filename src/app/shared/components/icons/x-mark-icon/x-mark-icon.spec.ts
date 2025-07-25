import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XMarkIcon } from './x-mark-icon';

describe('XMarkIcon', () => {
  let component: XMarkIcon;
  let fixture: ComponentFixture<XMarkIcon | typeof XMarkIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XMarkIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(XMarkIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
