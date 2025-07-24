import { BreakLine } from '@app/shared/components/spacing/break-line/break-line';
import { Component } from '@angular/core';
import { Heading1 } from '@app/shared/components/headings/heading-1/heading-1';
import { TasksTable } from '../../components/tasks-table/tasks-table';

@Component({
  selector: 'nlnd-task-manager',
  standalone: true,
  imports: [TasksTable, BreakLine, Heading1],
  templateUrl: './task-manager.html',
})
export class TaskManager {}
