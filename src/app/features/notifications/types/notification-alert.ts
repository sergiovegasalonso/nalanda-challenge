import { AlertColor } from '@shared/types/alert/alert-color.enum';

export interface NotificationAlert {
  id: string;
  message: string;
  color: AlertColor;
  timestamp: number;
}
