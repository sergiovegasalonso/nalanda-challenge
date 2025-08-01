import { Component, signal } from '@angular/core';
import { Header } from './layout/header/header';
import { NotificationsCenter } from './features/notifications/components/notifications-center/notifications-center';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'sva-root',
  standalone: true,
  imports: [RouterOutlet, Header, NotificationsCenter],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('nalanda-challenge');
}
