import {Component} from 'angular2/core';

@Component({
  selector: 'Header',
  template: `
    <header class="header">
      <p class="header-title">
        <a href="https://github.com/FountainJS/generator-fountain-webapp" target="_blank">
          Fountain Generator
        </a>
      </p>
      <p class="header-date">
        Generated with FountainJS v<%- version %> on <%- date %>
      </p>
    </header>
  `
})
export class Header {}
