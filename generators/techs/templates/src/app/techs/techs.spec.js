<% if (modules === 'webpack') { -%>
import 'zone.js/dist/zone';
<% } -%>
import 'zone.js/dist/async-test';
import ng from '@angular/core';
import ngHttpTesting from '@angular/http/testing';
import ngHttp from '@angular/http';
import Techs from './techs';
import Tech from './tech';
import ngTest from '@angular/core/testing';
import ngCompilerTest from '@angular/compiler/testing';
import rxjs from 'rxjs/Rx';

var MockComponent = ng.Component({
  selector: 'Tech',
  template: '',
  inputs: ['tech']
})
.Class({
  constructor: function () {}
});

var techsJson = [
  {
    key: 'gulp',
    title: 'Gulp',
    logo: 'https://raw.githubusercontent.com/FountainJS/generator-fountain-webapp/master/docs/assets/gulp.png',
    text1: 'The streaming build system',
    text2: 'Automate and enhance your workflow'
  },
  {
    key: 'react',
    title: 'React',
    logo: 'https://raw.githubusercontent.com/FountainJS/generator-fountain-webapp/master/docs/assets/react.png',
    text1: 'A JavaScript library for building user interfaces',
    text2: 'A declarative, efficient, and flexible JavaScript library for building user interfaces'
  },
  {
    key: 'angular1',
    title: 'Angular 1',
    logo: 'https://raw.githubusercontent.com/FountainJS/generator-fountain-webapp/master/docs/assets/angular1.png',
    text1: 'HTML enhanced for web apps!',
    text2: 'AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.'
  }
];

ngTest.describe('techs component', function () {
  ngTest.describe('techs component methods', function () {
    ngTest.beforeEachProviders(function () {
      return [
        Techs,
        ngHttpTesting.MockBackend,
        ngHttp.BaseRequestOptions,
        ng.provide(ngHttp.Http, {
          useFactory: function (backend, defaultOptions) {
            return new ngHttp.Http(backend, defaultOptions);
          },
          deps: [ngHttpTesting.MockBackend, ngHttp.BaseRequestOptions]
        })
      ];
    });

    ngTest.it('should get techs', ngTest.inject([ngHttpTesting.MockBackend, Techs], function (mockBackend, techs) {
      var conn;
      var response = new ngHttp.Response(new ngHttp.ResponseOptions({body: techsJson}));
      mockBackend.connections.subscribe(function (connection) {
        conn = connection;
      });
      techs.getTechs().subscribe(function (jsonObject) {
        techs.techs = jsonObject;
      });
      conn.mockRespond(response);
      ngTest.expect(techs.techs.length).toBe(3);
      mockBackend.verifyNoPendingRequests();
    }));
  });

  ngTest.describe('techs component rendering', function () {
    beforeEach(function () {
      Techs.prototype.getTechs = function getTechs() {
        var response = new ngHttp.Response(new ngHttp.ResponseOptions({body: techsJson}));
        return rxjs.Observable.of(response).map(function (response) {
          return response.json();
        });
      };
    });

    ngTest.it('should mock the techs and render 3 elements <tech>', ngTest.async(ngTest.inject([ngCompilerTest.TestComponentBuilder], function (tcb) {
      return tcb
        .overrideDirective(Techs, Tech, MockComponent)
        .createAsync(Techs)
        .then(function (fixture) {
          fixture.detectChanges();
          var techs = fixture.nativeElement;
          ngTest.expect(techs.querySelectorAll('tech').length).toBe(3);
        });
    })));
  });
});
