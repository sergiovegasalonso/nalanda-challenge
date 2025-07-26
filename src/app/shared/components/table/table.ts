import { Component, input } from '@angular/core';
import { TableModifier } from '@app/shared/types/table/table-modifier.enum';
import { TableSize } from '@app/shared/types/table/table-size.enum';

@Component({
  selector: 'nlnd-table',
  standalone: true,
  imports: [],
  templateUrl: './table.html',
})
export class Table {
  tableModifier = input(TableModifier.None);
  tableSize = input(TableSize.Medium);
}
