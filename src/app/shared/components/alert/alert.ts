import { Component, input } from '@angular/core';
import { AlertColor } from '@shared/types/alert/alert-color.enum';
import { AlertDirection } from '@shared/types/alert/alert-direction.enum';
import { AlertStyle } from '@shared/types/alert/alert-style.enum';
import { CheckBadgeIcon } from '@shared/components/icons/check-badge-icon/check-badge-icon';
import { ExclamationTringleIcon } from '@shared/components/icons/exclamation-tringle-icon/exclamation-tringle-icon';
import { InfoIcon } from '@shared/components/icons/info-icon/info-icon';
import { XCircleIcon } from '@shared/components/icons/x-circle-icon/x-circle-icon';

@Component({
  selector: 'sva-alert',
  imports: [XCircleIcon, CheckBadgeIcon, InfoIcon, ExclamationTringleIcon],
  templateUrl: './alert.html',
})
export class Alert {
  AlertColor = AlertColor;
  alertColor = input(AlertColor.Info);
  alertDirection = input(AlertDirection.Horizontal);
  alertStyle = input(AlertStyle.None);
}
