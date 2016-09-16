import {Directive} from '@angular/core';

@Directive({
  selector: '[<%- directiveName %>]'
})
export class <%- className %> {
  constructor() {}
}
