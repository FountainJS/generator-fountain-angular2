# Fountain Angular 2 Generator

Yeoman 'fountain' generator to start a webapp with Angular 2.

[![Angular 2](http://fountainjs.io/assets/imgs/angular2.png)](https://github.com/FountainJS/generator-fountain-angular2)

## Project under heavy development

> This Yeoman generator allows you to start an Angular1 web app with the best Developer Experience out of the box!

> No matter what framework or module management you want to use, we got you covered with a cutting edge working configuration.

> We use [Gulp 4](http://gulpjs.com/) as a task manager but we'll ask you questions about:
- Modules management: Webpack, SystemJS, none
- JS preprocessor: Babel, TypeScript, none
- CSS preprocessor: Sass, Less, none

This generator is a sub-generator of the the Yeoman Fountain generator for webapps [generator-fountain-webapp](https://github.com/FountainJS/generator-fountain-webapp).

## Generator Fountain Angular 2 structure

To take profit of the best of the Yeoman infrastructure, we heavily relies on the composability natures of the generators.

Thereby, each needs of your future application will be addressed by a dedicated Yeoman generator (each will be used depending of the options you selected or not).

More informations in [DESIGN.md](https://github.com/FountainJS/generator-fountain-webapp/blob/master/DESIGN.md).


### Web tooling layer
[![Gulp](http://fountainjs.io/assets/imgs/gulp.png)](https://github.com/FountainJS/generator-fountain-gulp)
[![ESLint](http://fountainjs.io/assets/imgs/eslint.png)](https://github.com/FountainJS/generator-fountain-eslint)
[![BrowserSync](http://fountainjs.io/assets/imgs/browsersync.png)](https://github.com/FountainJS/generator-fountain-browsersync)
[![Karma](http://fountainjs.io/assets/imgs/karma.png)](https://github.com/FountainJS/generator-fountain-karma)

### Module management layer
[![Webpack](http://fountainjs.io/assets/imgs/webpack.png)](https://github.com/FountainJS/generator-fountain-webpack)
[![SystemJS](http://fountainjs.io/assets/imgs/systemjs.png)](https://github.com/FountainJS/generator-fountain-systemjs)
[![Bower](http://fountainjs.io/assets/imgs/bower.png)](https://github.com/FountainJS/generator-fountain-inject)


## Usage

### Requirement Node 4+
This generator is targeted to be used with Node >= 4.0.0. You can check your version number with the command
```
node --version
```
If you have a version 0.x, please update on [nodejs.org](https://nodejs.org/en/download/).

### Install

##### Install required tools `yo` and `gulp-cli`:
```
npm install -g yo gulp-cli
```

##### Install `generator-fountain-webapp`:
```
npm install -g generator-fountain-webapp
```


### Run

##### Create a new directory, and go into:
```
mkdir my-new-project && cd $_
```

##### Run `yo fountain-webapp`, and select desired technologies:
```
yo fountain-webapp
```

## Changelog

[All changes listed in the GitHub releases](https://github.com/FountainJS/generator-fountain-webapp)

## Contributing

[Guidelines](CONTRIBUTING.md)
