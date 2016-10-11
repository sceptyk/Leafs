import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
  name: 'lAsync',
  pure: false
})
export class AsyncPipe implements PipeTransform {
  transform(list: any[]) {
    if(!list) return;
    return list;
  }
}