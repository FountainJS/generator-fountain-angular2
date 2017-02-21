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
          '@angular/core': '^2.4.8',
          '@angular/compiler': '^2.4.8',
          '@angular/common': '^2.4.8',
          '@angular/platform-browser': '^2.4.8',
          '@angular/platform-browser-dynamic': '^2.4.8',
          '@angular/http': '^2.4.8',
          'rxjs': '5.1.1',
          'zone.js': '^0.7.7',
          'core-js': '^2.4.1'
        }
      });
    },

    babel() {
      if (this.props.js === 'babel') {
        this.mergeJson('package.json', {
          devDependencies: {
            'babel-plugin-angular2-annotations': '^5.1.0',
            'babel-plugin-transform-class-properties': '^6.23.0',
            'babel-plugin-transform-decorators-legacy': '^1.3.4',
            'babel-plugin-transform-flow-strip-types': '^6.22.0'
          }
        });

        const plugins = [
          'angular2-annotations',
          'transform-decorators-legacy',
          'transform-class-properties',
          'transform-flow-strip-types'
        ];

        // if (this.props.modules === 'webpack') {
        //   this.mergeJson('.babelrc', {
        //     env: {
        //       development: {plugins},
        //       production: {plugins}
        //     }
        //   });
        // } else {
        //   this.mergeJson('.babelrc', {plugins});
        // }

        this.mergeJson('.babelrc', {plugins});
      }
    },

    router() {
      if (this.props.router === 'router') {
        this.mergeJson('package.json', {
          dependencies: {
            '@angular/router': '^3.4.8'
          }
        });
      } else if (this.props.router === 'uirouter') {
        this.mergeJson('package.json', {
          dependencies: {
            'ui-router-ng2': '1.0.0-beta.4'
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
      ci: this.props.ci,
      css: this.props.css,
      router: this.props.router,
      sample: this.props.sample,
      skipInstall: this.props.skipInstall,
      skipCache: this.props.skipCache
    };

    this.composeWith(require.resolve(`../${this.props.sample}`), options);

    this.composeWith(require.resolve('generator-fountain-gulp/generators/app'), options);
  },

  writing() {
    if (this.props.router !== 'none') {
      this.copyTemplate(`src/${this.props.router}/routes.js`, 'src/app/routes.js', this.props);
    }
    this.copyTemplate('src/index.html', 'src/index.html', {router: this.props.router});
  }
});
