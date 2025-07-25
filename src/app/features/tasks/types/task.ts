import { Priority } from './priority.enum';
import { Status } from './status.enum';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dependsOn?: number[];
  startAt?: Date;
  completedAt?: Date;
  duration?: number;
  attempts: number;
  blockReason?: string;
}
