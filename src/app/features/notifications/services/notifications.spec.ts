import { Notifications } from './notifications';
import { TestBed } from '@angular/core/testing';

describe('Notifications', () => {
  let service: Notifications;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Notifications);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
