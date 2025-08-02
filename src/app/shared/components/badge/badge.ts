import { Component, input } from '@angular/core';
import { BadgeColor } from '@shared/types/badge/badge-color.enum';
import { BadgeSize } from '@shared/types/badge/badge-size.enum';
import { BadgeStyle } from '@shared/types/badge/badge-style.enum';

@Component({
  selector: 'sva-badge',
  templateUrl: './badge.html',
})
export class Badge {
  badgeColor = input(BadgeColor.Neutral);
  badgeSize = input(BadgeSize.Medium);
  badgeStyle = input(BadgeStyle.Outline);
}
