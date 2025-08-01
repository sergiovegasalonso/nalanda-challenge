import { Component } from '@angular/core';
import { Header } from './layout/header/header';
import { NotificationsCenter } from './features/notifications/components/notifications-center/notifications-center';
import { Page } from './layout/page/page';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'sva-root',
  standalone: true,
  imports: [RouterOutlet, Header, NotificationsCenter, Page],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
