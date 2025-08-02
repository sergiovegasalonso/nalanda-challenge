import { Component, computed, input } from '@angular/core';
import { ButtonBehaviour } from '@shared/types/buttons/button-behaviour.enum';

@Component({
  selector: 'sva-accent-button',
  templateUrl: './accent-button.html',
})
export class AccentButton {
  ariaLabel = input<string | undefined>('Button description');
  ButtonBehaviour = ButtonBehaviour;
  buttonBehaviour = input(ButtonBehaviour.Active);

  configurationClasses = computed(() => {
    switch (this.buttonBehaviour()) {
      case ButtonBehaviour.Active:
        return 'cursor-pointer bg-light-accent text-light-accent-contrast shadow-md hover:bg-light-accent-highlighted dark:bg-dark-accent dark:text-dark-accent-contrast dark:hover:bg-dark-accent-highlighted';
      case ButtonBehaviour.Disabled:
        return 'cursor-not-allowed opacity-50';
      default:
        return 'cursor-not-allowed opacity-50';
    }
  });

  isDisabled = computed(
    () => this.buttonBehaviour() === ButtonBehaviour.Disabled
  );
}
