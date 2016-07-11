const fountain = require('fountain-generator');
const version = require('../../package.json').version;

module.exports = fountain.Base.extend({
  prompting: {
    fountain() {
      this.options.framework = 'angular2';
      return this.fountainPrompting();
    },

    sample() {
      this.option('sample', {type: Boolean, required: false});

      const prompts = [{
        when: !this.options.sample,
        type: 'list',
        name: 'sample',
        message: 'Do you want a sample app?',
        choices: [
          {name: 'A working landing page', value: 'techs'},
          {name: 'Just a Hello World', value: 'hello'},
          {name: 'Ngrx/store TodoMVC', value: 'todoMVC'}
        ]
      }, {
        when: !this.options.router,
        type: 'list',
        name: 'router',
        message: 'Would you like a router?',
        choices: [
          {name: '@angular/router', value: 'router'},
          {name: 'Angular UI Router', value: 'uirouter'},
          {name: 'None', value: 'none'}
        ]
      }];

      return this.prompt(prompts).then(props => {
        Object.assign(this.props, props);
      });
    }
  },

  configuring: {
    config() {
      this.config.set('version', version);
      this.config.set('props', this.props);
    },

    pkg() {
      this.mergeJson('package.json', {
        dependencies: {
          '@angular/core': '2.0.0-rc.4',
          '@angular/compiler': '2.0.0-rc.4',
          '@angular/common': '2.0.0-rc.4',
          '@angular/platform-browser': '2.0.0-rc.4',
          '@angular/platform-browser-dynamic': '2.0.0-rc.4',
          '@angular/http': '2.0.0-rc.4',
          'rxjs': '5.0.0-beta.8',
          'zone.js': '^0.6.12',
          'es6-promise': '^3.0.2',
          'reflect-metadata': '0.1.3'
        }
      });
      if (this.props.js === 'typescript') {
        this.mergeJson('package.json', {dependencies: {'es6-shim': '^0.35.0'}});
      }
    },

    babel() {
      if (this.props.js === 'babel') {
        this.mergeJson('package.json', {
          devDependencies: {
            'babel-plugin-angular2-annotations': '^5.0.0',
            'babel-plugin-transform-class-properties': '^6.5.2',
            'babel-plugin-transform-decorators-legacy': '^1.3.4',
            'babel-plugin-transform-flow-strip-types': '^6.5.0'
          }
        });

        this.mergeJson('.babelrc', {
          plugins: [
            'angular2-annotations',
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-flow-strip-types'
          ]
        });
      }
    },

    router() {
      if (this.props.router === 'router') {
        this.mergeJson('package.json', {
          dependencies: {
            '@angular/router': '3.0.0-beta.2'
          }
        });
      } else if (this.props.router === 'uirouter') {
        this.mergeJson('package.json', {
          dependencies: {
            'ui-router-ng2': '1.0.0-alpha.5'
          }
        });
      }
    }
  },

  composing() {
    const options = {
      framework: this.props.framework,
      modules: this.props.modules,
      js: this.props.js,
      css: this.props.css,
      router: this.props.router,
      sample: this.props.sample,
      skipInstall: this.props.skipInstall,
      skipCache: this.props.skipCache
    };

    this.composeWith(`fountain-angular2:${this.props.sample}`, {options}, {
      local: require.resolve(`../${this.props.sample}`)
    });
    this.composeWith('fountain-gulp', {options}, {
      local: require.resolve('generator-fountain-gulp/generators/app')
    });
  },

  writing() {
    if (this.props.router !== 'none') {
      this.copyTemplate(`src/${this.props.router}/routes.js`, 'src/routes.js', this.props);
    }
    this.copyTemplate('src/index.html', 'src/index.html', {router: this.props.router});
  }
});
