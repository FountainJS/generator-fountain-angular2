import { Component } from 'angular2/core';

export const Hello =
  Component({
    selector: 'hello-app',
    template: '<h1>{{ hello }}</h1>'
  })
  .Class({
    constructor: function() {
      this.hello = 'Hello World!';
    }
  });
