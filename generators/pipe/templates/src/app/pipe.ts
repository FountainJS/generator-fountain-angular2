import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: '<%- pipeName %>'
})
export class <%- className %> implements PipeTransform {
  transform(value: string) {
    return value.toUpperCase();
  }
}
