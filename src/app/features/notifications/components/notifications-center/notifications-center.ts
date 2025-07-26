import { Component, inject } from '@angular/core';
import { Alert } from '@shared/components/alert/alert';
import { Notifications } from '../../services/notifications';

@Component({
  selector: 'nlnd-notifications-center',
  standalone: true,
  imports: [Alert],
  templateUrl: './notifications-center.html',
  styleUrl: './notifications-center.css',
})
export class NotificationsCenter {
  private readonly notificationsService = inject(Notifications);

  readonly notifications = this.notificationsService.notifications$;

  dismissNotification(id: string): void {
    this.notificationsService.removeNotification(id);
  }
}
