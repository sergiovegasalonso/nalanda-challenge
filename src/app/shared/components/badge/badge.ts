import { Component, input } from '@angular/core';
import { BadgeColor } from '@shared/types/badges/badge-color.enum';
import { BadgeSize } from '@shared/types/badges/badge-size.enum';
import { BadgeStyle } from '@app/shared/types/badges/badge-style.enum';

@Component({
  selector: 'nlnd-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.html',
})
export class Badge {
  badgeColor = input(BadgeColor.Neutral);
  badgeSize = input(BadgeSize.Medium);
  badgeStyle = input(BadgeStyle.Outline);
}
