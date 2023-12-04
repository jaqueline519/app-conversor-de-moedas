import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colors',
  standalone: true
})
export class ColorsPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value === undefined) {
      return 'color-gray';
    }

    const lowValue = value <= 1;
    const midiumValue = value <= 5;
    const highValue = value > 5;

    if (lowValue) return 'color-red';
    if (midiumValue) return 'color-blue';
    if (highValue) return 'color-green';

    return 'color-gray';
  }
}
