import { Injectable, signal } from '@angular/core';
import { AlertColor } from '@shared/types/alert/alert-color.enum';
import { NotificationAlert } from '../types/notification-alert';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private cleanupInterval: NodeJS.Timeout | null = null;
  private readonly notifications = signal<NotificationAlert[]>([]);
  readonly notifications$ = this.notifications.asReadonly();

  REFRESH_INTERVAL = 3000;

  clearAll(): void {
    this.notifications.set([]);
    this.stopCleanupInterval();
  }

  showError(message: string): void {
    this.showNotification(message, AlertColor.Error);
  }

  showInfo(message: string): void {
    this.showNotification(message, AlertColor.Info);
  }

  showNotification(message: string, color: AlertColor = AlertColor.Info): void {
    const notification: NotificationAlert = {
      id: Math.random().toString(36).substring(2, 9),
      message,
      color,
      timestamp: Date.now(),
    };

    this.notifications.set([...this.notifications(), notification]);
    this.startCleanupInterval();
  }

  showSuccess(message: string): void {
    this.showNotification(message, AlertColor.Success);
  }

  showWarning(message: string): void {
    this.showNotification(message, AlertColor.Warning);
  }

  removeNotification(id: string): void {
    this.notifications.set(this.notifications().filter(n => n.id !== id));

    if (this.notifications().length === 0) {
      this.stopCleanupInterval();
    }
  }

  private startCleanupInterval(): void {
    this.cleanupInterval ??= setInterval(() => {
      console.log('notifications:');
      const now = Date.now();
      const current = this.notifications();
      const filtered = current.filter(
        n => now - n.timestamp < this.REFRESH_INTERVAL
      );

      if (filtered.length !== current.length) {
        this.notifications.set(filtered);
      }

      if (filtered.length === 0) {
        this.stopCleanupInterval();
      }
    }, 1000);
  }

  private stopCleanupInterval(): void {
    if (this.cleanupInterval !== null) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}
