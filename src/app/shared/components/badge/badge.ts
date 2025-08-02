import { Component, computed, input } from '@angular/core';
import { BadgeColor } from './configuration/badge-color.enum';

@Component({
  selector: 'sva-badge',
  templateUrl: './badge.html',
})
export class Badge {
  badgeColor = input(BadgeColor.Neutral);

  getColorConfigurationClasses = computed(() => {
    switch (this.badgeColor()) {
      case BadgeColor.Blue:
        return 'dfs';
      case BadgeColor.Green:
        return 'f';
      case BadgeColor.Neutral:
        return 'f';
      case BadgeColor.Red:
        return 'f';
      case BadgeColor.Yellow:
        return 'f';
      default:
        return 'fdsdf';
    }
  });
}
