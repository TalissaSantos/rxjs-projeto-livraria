import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autoria',
})
export class AutoriaPipe implements PipeTransform {
  transform(autoria: string[]): unknown {
    if (autoria) {
      return autoria[0];
    }

    return '';
  }
}
