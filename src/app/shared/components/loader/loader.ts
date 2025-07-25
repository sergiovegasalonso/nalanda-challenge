import { Component, input } from '@angular/core';
import { LoaderSize } from '@shared/types/loader/loader-size.enum';

@Component({
  selector: 'nlnd-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.html',
})
export class Loader {
  loaderSize = input(LoaderSize.Medium);
}
