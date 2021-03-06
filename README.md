# :warning: Unmaintained

This project has been **archived** and is considered **outdated** and **unmaintained**.

With the massive rise of the CLI tools by each major JavaScript Web frameworks, it was become irrelevant to pursue the quest of being a competitive project scaffolder for modern Web project.

We officialy advise to use the coresponding CLI tools for the framework you use:

- [create-react-app](https://github.com/facebook/create-react-app) for [React](https://reactjs.org/)
- [Vue CLI](https://cli.vuejs.org/) for [Vue.js](https://vuejs.org/)
- [Angular CLI](https://cli.angular.io/) for [Angular](https://angular.io/)

Of course, we have some regrets regarding our users, Yeoman users and some goals we had with Fountain (like giving important tool choices to users, harmonizing projects configurations between frameworks...) but still, you can use official CLI tools with confidence as they are great project which went further for development experience and Web optimization.

<p align="center">
  <a href="http://fountainjs.io/">
    <img alt="FountainJS" src="http://fountainjs.io/assets/imgs/fountain.png" width="200">
  </a>
</p>

[![Build Status](https://travis-ci.org/FountainJS/generator-fountain-angular2.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-angular2)
[![codecov](https://codecov.io/gh/FountainJS/generator-fountain-angular2/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-angular2)
[![Slack](http://slackin.fountainjs.io/badge.svg)](http://slackin.fountainjs.io/)

# Fountain Angular 2 Generator

[![Angular 2](http://fountainjs.io/assets/imgs/angular2.png)](https://angular.io/)

> Fountain Angular 2 Generator allows you to start an Angular2 web app with the best developer experience possible!

> No matter what framework or module management you want to use, we got you covered with a cutting edge working configuration.

> We use [Gulp 4](http://gulpjs.com/) as a task manager but we'll ask you questions about:
- Modules management: Webpack, SystemJS, none
- JS preprocessor: Babel, TypeScript, none
- CSS preprocessor: Sass, Stylus, Less, none

This generator is a sub-generator of the the Yeoman Fountain generator for webapps [generator-fountain-webapp](https://github.com/FountainJS/generator-fountain-webapp).

## Generator Fountain Angular 2 structure

To utilize the best of the Yeoman infrastructure, we heavily rely on the composability features that the generators offer.

Thereby, each requirement for your application will be addressed by a dedicated Yeoman generator (generators utilized will vary depending on the options selected).

Additional information: [DESIGN.md](http://fountainjs.io/doc/design).


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

### Requirement Node 6+ && NPM 3+
This generator is targeted to be used with Node >= 6.0.0 and NPM => 3.0.0. You can check your version number with the command
```
node --version && npm --version
```

### Install

##### Install required tools `yo`:
```
npm install -g yo
```

##### Install `generator-fountain-angular2`:
```
npm install -g generator-fountain-angular2
```


### Run

##### Create a new directory, and go into:
```
mkdir my-new-project && cd my-new-project
```

##### Run `yo fountain-angular2`, and select desired technologies:
```
yo fountain-angular2
```
#### Use NPM scripts

- `npm run build` to build an optimized version of your application in /dist
- `npm run serve` to launch a browser sync server on your source files
- `npm run serve:dist` to launch a server on your optimized application
- `npm run test` to launch your unit tests with Karma
- `npm run test:auto` to launch your unit tests with Karma in watch mode


#### Or Gulp tasks

If you have [`gulp-cli`](https://www.npmjs.com/package/gulp-cli) installed in global packages you can use equivalent:

- `gulp` or `gulp build`
- `gulp serve`
- `gulp serve:dist`
- `gulp test`
- `gulp test:auto`

**If you don't have [`gulp-cli`](https://www.npmjs.com/package/gulp-cli) installed globally, the following error will occur:**
> /usr/local/lib/node_modules/gulp/bin/gulp.js:121
    gulpInst.start.apply(gulpInst, toRun);
TypeError: Cannot read property 'apply' of undefined

### Sub-generators

Few sub-generators are available. You can see the full list by running `yo --generators`.  
Each generator has 2 options:
- You can set the name of the generated item with `--name`
- You can set the path of the generated item with `--dir`

**Example:**

```
yo fountain-angular2:component --name myComponent --dir components/game
```

### [Start development](http://fountainjs.io/doc/usage/#use-npm-scripts)


## [Changelog](https://github.com/FountainJS/generator-fountain-angular2/releases)


## [Contributing](http://fountainjs.io/doc/contributing)
