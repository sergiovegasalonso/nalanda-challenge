import { Component, input } from '@angular/core';
import { TableModifier } from '@shared/types/table/table-modifier.enum';
import { TableSize } from '@shared/types/table/table-size.enum';

@Component({
  selector: 'sva-table',
  standalone: true,
  imports: [],
  templateUrl: './table.html',
})
export class Table {
  tableModifier = input(TableModifier.None);
  tableSize = input(TableSize.Medium);
}
