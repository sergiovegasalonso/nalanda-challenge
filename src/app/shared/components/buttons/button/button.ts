import { Component, input } from '@angular/core';
import { ButtonBehaviour } from '@shared/types/buttons/button-behaviour.enum';
import { ButtonType } from '@shared/types/buttons/button-type.enum';

@Component({
  selector: 'sva-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  ariaLabel = input<string | undefined>('Button description');
  buttonType = input(ButtonType.Primary);
  buttonBehaviour = input(ButtonBehaviour.Active);
}
