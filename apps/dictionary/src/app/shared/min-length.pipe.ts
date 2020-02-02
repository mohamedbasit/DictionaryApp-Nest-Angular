import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minLength'
})
/**
 * To filter the min length of character with text ellipsis
 * @input Maxnumber of characters
 * @input Bind value
 */
export class MinLengthPipe implements PipeTransform {

  transform(value: any, maxNumber: number): any {
    let input = String(value);
    return (input.length > maxNumber) ? input.substr(0, maxNumber - 1) + '...' : input;
  }

}
