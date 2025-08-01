import { Component } from '@angular/core';
import { ModeSwitch } from '@app/shared/components/mode-switch/mode-switch';

@Component({
  selector: 'sva-header',
  standalone: true,
  imports: [ModeSwitch],
  templateUrl: './header.html',
})
export class Header {}
