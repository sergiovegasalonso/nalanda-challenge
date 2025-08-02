import { Component, input } from '@angular/core';
import { LoaderSize } from '@shared/types/loader/loader-size.enum';

@Component({
  selector: 'sva-loader',
  templateUrl: './loader.html',
})
export class Loader {
  loaderSize = input(LoaderSize.Medium);
}
