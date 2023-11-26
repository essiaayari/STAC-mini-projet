import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe1'
})
export class Pipe1Pipe implements PipeTransform {
//pipe personaliser pour transformer un espace en '- - -'
  transform(value : string): string {
    return value.replace(/\s+/g, '- - -');  } 
   }


