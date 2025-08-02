import { Component } from '@angular/core';
import { Mode } from './types/mode.enum';

@Component({
  selector: 'sva-mode-switch',
  templateUrl: './mode-switch.html',
})
export class ModeSwitch {
  toggleMode(): void {
    document.documentElement.classList.toggle(Mode.Dark);
    localStorage['theme'] = this.getModeFromHtmlTag();
  }

  private getModeFromHtmlTag(): Mode {
    return document.documentElement.classList.contains(Mode.Dark)
      ? Mode.Dark
      : Mode.Light;
  }
}
