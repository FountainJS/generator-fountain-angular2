import {MockBackend} from '@angular/http/testing';
import {Http, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';
import {Component, Input} from '@angular/core';
import {TechsComponent} from './techs';
import {TestBed, inject, async} from '@angular/core/testing';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'fountain-tech',
  template: ''
})
class MockTechComponent {
  @Input() tech;
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TechsComponent,
        MockTechComponent
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http, useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
    TestBed.compileComponents();
  }));

  describe('techs component methods', () => {
    it('should get techs', inject([MockBackend], (mockBackend: MockBackend) => {
      const fixture = TestBed.createComponent(TechsComponent);
      const techs: TechsComponent = fixture.componentInstance;
      let conn;
      const response = new Response(new ResponseOptions({body: techsJson}));
      mockBackend.connections.subscribe(connection => {
        conn = connection;
      });
      techs.getTechs().subscribe(jsonObject => {
        techs.techs = jsonObject;
      });
      conn.mockRespond(response);
      expect(techs.techs.length).toBe(3);
      mockBackend.verifyNoPendingRequests();
    }));
  });

  describe('techs component rendering', () => {
    beforeEach(() => {
      TechsComponent.prototype.getTechs = function getTechs() {
        const response = new Response(new ResponseOptions({body: techsJson}));
        return Observable.of(response).map(response => response.json());
      };
    });

    it('should mock the techs and render 3 elements <tech>', () => {
      const fixture = TestBed.createComponent(TechsComponent);
      fixture.detectChanges();
      const techs = fixture.nativeElement;
      expect(techs.querySelectorAll('fountain-tech').length).toBe(3);
    });
  });
});
