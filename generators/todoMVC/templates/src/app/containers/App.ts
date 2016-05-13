import {Component} from '@angular/core';
import {Header} from '../components/Header.ts';
import {MainSection} from '../components/MainSection.ts';

@Component({
  selector: 'App',
  template: `
    <Header></Header>
    <MainSection></MainSection>
  `,
  directives: [Header, MainSection]
})
export class App {
}
