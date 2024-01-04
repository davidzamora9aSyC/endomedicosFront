// map-keys.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapKeys'
})
export class MapKeysPipe implements PipeTransform {
  transform(value: any): string {
    return Object.keys(value).join(', ');
  }
}
