import { Component, input } from '@angular/core';

@Component({
  selector: 'nlnd-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  buttonType = input('primary');
}
