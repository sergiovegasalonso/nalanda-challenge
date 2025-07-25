import { Component, input } from '@angular/core';
import { AlertColor } from '@app/shared/types/alerts/alert-color.enum';
import { AlertDirection } from '@app/shared/types/alerts/alert-direction.enum';
import { AlertStyle } from '@app/shared/types/alerts/alert-style.enum';
import { CheckBadgeIcon } from '@shared/components/icons/check-badge-icon/check-badge-icon';
import { ExclamationTringleIcon } from '@shared/components/icons/exclamation-tringle-icon/exclamation-tringle-icon';
import { InfoIcon } from '@shared/components/icons/info-icon/info-icon';
import { XCircleIcon } from '@shared/components/icons/x-circle-icon/x-circle-icon';

@Component({
  selector: 'nlnd-alert',
  standalone: true,
  imports: [XCircleIcon, CheckBadgeIcon, InfoIcon, ExclamationTringleIcon],
  templateUrl: './alert.html',
})
export class Alert {
  AlertColor = AlertColor;
  alertColor = input(AlertColor.Info);
  alertDirection = input(AlertDirection.Horizontal);
  alertStyle = input(AlertStyle.Outline);
}
