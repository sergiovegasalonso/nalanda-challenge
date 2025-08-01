import { Component, inject } from '@angular/core';
import { Alert } from '@shared/components/alert/alert';
import { BreakLine } from '@shared/components/spacing/break-line/break-line';
import { NotificationsService } from '../../services/notifications';

@Component({
  selector: 'sva-notifications-center',
  standalone: true,
  imports: [Alert, BreakLine],
  templateUrl: './notifications-center.html',
})
export class NotificationsCenter {
  private readonly notificationsService = inject(NotificationsService);

  readonly notifications = this.notificationsService.notifications$;

  dismissNotification(id: string): void {
    this.notificationsService.removeNotification(id);
  }
}
