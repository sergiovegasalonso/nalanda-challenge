import { Component, input } from '@angular/core';
import { ButtonBehaviour } from '@shared/types/buttons/button-behaviour.enum';
import { ButtonType } from '@shared/types/buttons/button-type.enum';

@Component({
  selector: 'nlnd-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  buttonType = input(ButtonType.Primary);
  buttonBehaviour = input(ButtonBehaviour.Active);
}
