import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XMark } from './x-mark';

describe('XMark', () => {
  let component: XMark;
  let fixture: ComponentFixture<XMark>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XMark],
    }).compileComponents();

    fixture = TestBed.createComponent(XMark);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
