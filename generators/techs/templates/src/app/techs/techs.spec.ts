/// <reference path="../../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Http, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';
import {Component, Input, provide} from '@angular/core';
import {TechsComponent, Tech} from './techs';
import {TechComponent} from './tech';
import {inject, async, TestComponentBuilder, ComponentFixture, addProviders} from '@angular/core/testing';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'fountain-tech',
  template: ''
})
class MockComponent {
  @Input() public tech: Tech;
}

const techsJson = [
  {
    key: 'gulp',
    title: 'Gulp',
    logo: 'http://fountainjs.io/assets/imgs/gulp.png',
    text1: 'The streaming build system',
    text2: 'Automate and enhance your workflow'
  },
  {
    key: 'react',
    title: 'React',
    logo: 'http://fountainjs.io/assets/imgs/react.png',
    text1: 'A JavaScript library for building user interfaces',
    text2: 'A declarative, efficient, and flexible JavaScript library for building user interfaces'
  },
  {
    key: 'angular1',
    title: 'Angular 1',
    logo: 'http://fountainjs.io/assets/imgs/angular1.png',
    text1: 'HTML enhanced for web apps!',
    text2: 'AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.'
  }
];

describe('techs component', () => {
  describe('techs component methods', () => {
    beforeEach(() => {
      addProviders([
        TechsComponent,
        MockBackend,
        BaseRequestOptions,
        provide(Http, {
          useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        })
      ]);
    });

    it('should get techs', async(inject([MockBackend, TechsComponent], (mockBackend: MockBackend, techs: TechsComponent) => {
      let conn: MockConnection;
      const response = new Response(new ResponseOptions({body: techsJson}));
      mockBackend.connections.subscribe((connection: MockConnection) => {
        conn = connection;
      });
      techs.getTechs().subscribe((jsonObject => {
        techs.techs = jsonObject;
      }));
      conn.mockRespond(response);
      expect(techs.techs.length).toBe(3);
      mockBackend.verifyNoPendingRequests();
    })));
  });

  describe('techs component rendering', () => {
    beforeEach(() => {
      TechsComponent.prototype.getTechs = function getTechs () {
        const response = new Response(new ResponseOptions({body: techsJson}));
        return Observable.of(response).map(response => response.json());
      };
    });

    it('should mock the techs and render 3 elements <tech>', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .overrideDirective(TechsComponent, TechComponent, MockComponent)
        .createAsync(TechsComponent)
        .then((fixture: ComponentFixture<any>) => {
          fixture.detectChanges();
          const techs = fixture.nativeElement;
          expect(techs.querySelectorAll('fountain-tech').length).toBe(3);
        });
    })));
  });
});
