import { Injectable, signal } from '@angular/core';
import { AlertColor } from '@shared/types/alert/alert-color.enum';

export interface NotificationAlert {
  id: string;
  message: string;
  color: AlertColor;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class Notifications {
  private readonly notifications = signal<NotificationAlert[]>([]);

  // Expose as readonly signal
  readonly notifications$ = this.notifications.asReadonly();

  constructor() {
    // Auto-remove notifications after 5 seconds
    setInterval(() => {
      const now = Date.now();
      const current = this.notifications();
      const filtered = current.filter((n) => now - n.timestamp < 5000);
      if (filtered.length !== current.length) {
        this.notifications.set(filtered);
      }
    }, 1000);
  }

  showNotification(message: string, color: AlertColor = AlertColor.Info): void {
    const notification: NotificationAlert = {
      id: Math.random().toString(36).substring(2, 9),
      message,
      color,
      timestamp: Date.now(),
    };

    this.notifications.set([...this.notifications(), notification]);
  }

  showSuccess(message: string): void {
    this.showNotification(message, AlertColor.Success);
  }

  showError(message: string): void {
    this.showNotification(message, AlertColor.Error);
  }

  showWarning(message: string): void {
    this.showNotification(message, AlertColor.Warning);
  }

  showInfo(message: string): void {
    this.showNotification(message, AlertColor.Info);
  }

  removeNotification(id: string): void {
    this.notifications.set(this.notifications().filter((n) => n.id !== id));
  }

  clearAll(): void {
    this.notifications.set([]);
  }
}
