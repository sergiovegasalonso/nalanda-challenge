import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'nlnd-date-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './date-input.html',
})
export class DateInput {
  startAtDate = '';
}
