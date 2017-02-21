var ng = require('@angular/core');
var ngHttpTesting = require('@angular/http/testing');
var ngHttp = require('@angular/http');
var TechsComponent = require('./techs');
var ngTest = require('@angular/core/testing');
var Rx = require('rxjs/Rx');

var MockTechComponent = ng.Component({
  selector: 'fountain-tech',
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

describe('techs component', function () {
  beforeEach(ngTest.async(function () {
    ngTest.TestBed.configureTestingModule({
      declarations: [
        TechsComponent,
        MockTechComponent
      ],
      providers: [
        ngHttpTesting.MockBackend,
        ngHttp.BaseRequestOptions,
        {
          provide: ngHttp.Http, useFactory: function (backend, defaultOptions) {
            return new ngHttp.Http(backend, defaultOptions);
          },
          deps: [ngHttpTesting.MockBackend, ngHttp.BaseRequestOptions]
        }
      ]
    });
    ngTest.TestBed.compileComponents();
  }));

  describe('techs component methods', function () {
    it('should get techs', ngTest.inject([ngHttpTesting.MockBackend], function (mockBackend) {
      var fixture = ngTest.TestBed.createComponent(TechsComponent);
      var techs = fixture.componentInstance;
      var conn;
      var response = new ngHttp.Response(new ngHttp.ResponseOptions({body: techsJson}));
      mockBackend.connections.subscribe(function (connection) {
        conn = connection;
      });
      techs.getTechs().subscribe(function (jsonObject) {
        techs.techs = jsonObject;
      });
      conn.mockRespond(response);
      expect(techs.techs.length).toBe(3);
      mockBackend.verifyNoPendingRequests();
    }));
  });

  describe('techs component rendering', function () {
    beforeEach(function () {
      TechsComponent.prototype.getTechs = function () {
        const response = new ngHttp.Response(new ngHttp.ResponseOptions({body: techsJson}));
        return Rx.Observable.of(response).map(function (response) {
          return response.json();
        });
      };
    });

    it('should mock the techs and render 3 elements <tech>', function () {
      const fixture = ngTest.TestBed.createComponent(TechsComponent);
      fixture.detectChanges();
      const techs = fixture.nativeElement;
      expect(techs.querySelectorAll('fountain-tech').length).toBe(3);
    });
  });
});
