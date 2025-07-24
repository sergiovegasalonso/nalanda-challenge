import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';

@Component({
  selector: 'nlnd-root',
  standalone: true,
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('nalanda-challenge');
}
