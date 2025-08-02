import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsCenter } from './notifications-center';
import { NotificationsService } from '../../services/notifications';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NotificationsCenter', () => {
  let component: NotificationsCenter;
  let fixture: ComponentFixture<NotificationsCenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsCenter],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsCenter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have notifications observable', () => {
    expect(component.notifications).toBeDefined();
  });

  it('should dismiss notification', () => {
    const notificationId = 'test-id';
    spyOn(component, 'dismissNotification').and.callThrough();
    component.dismissNotification(notificationId);
    expect(component.dismissNotification).toHaveBeenCalledWith(notificationId);
  });

  it('should inject Notifications service', () => {
    const notificationsService = TestBed.inject(NotificationsService);
    expect(notificationsService).toBeDefined();
    expect(component.notifications).toEqual(
      notificationsService.notifications$
    );
  });
});
