import { Component, computed, input } from '@angular/core';
import { ButtonBehaviour } from '@shared/types/buttons/button-behaviour.enum';

@Component({
  selector: 'sva-button',
  templateUrl: './button.html',
})
export class Button {
  ariaLabel = input<string | undefined>('Button description');
  ButtonBehaviour = ButtonBehaviour;
  buttonBehaviour = input(ButtonBehaviour.Active);

  configurationClasses = computed(() => {
    switch (this.buttonBehaviour()) {
      case ButtonBehaviour.Active:
        return 'cursor-pointer bg-light-foreground text-black shadow-md hover:bg-light-foreground-highlighted dark:bg-dark-foreground dark:text-white dark:hover:bg-dark-foreground-highlighted';
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
