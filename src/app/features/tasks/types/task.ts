import { Priority } from './priority.enum';
import { State } from './state.enum';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  state: State;
  dependsOn?: number[];
  startedAt?: Date;
  completedAt?: Date;
}
