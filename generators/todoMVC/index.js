const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  configuring() {
    this.mergeJson('package.json', {
      dependencies: {
        '@angular/forms': '^2.4.8',
        '@ngrx/store': '^2.2.1',
        '@ngrx/core': '^1.2.0',
        'todomvc-app-css': '^2.0.6'
      }
    });
    if (this.options.js === 'js') {
      this.mergeJson('package.json', {
        dependencies: {
          'object-assign': '^4.1.1'
        }
      });
    }
  },

  writing: {
    src() {
      [
        'src/index.html',
        'src/index.js',
        'src/index.css',

        'src/app/index.js',
        'src/app/actions/index.js',
        'src/app/components/Footer.html',
        'src/app/components/Footer.js',
        'src/app/components/Footer.spec.js',
        'src/app/components/Header.html',
        'src/app/components/Header.js',
        'src/app/components/Header.spec.js',
        'src/app/components/MainSection.html',
        'src/app/components/MainSection.js',
        'src/app/components/MainSection.spec.js',
        'src/app/components/TodoItem.html',
        'src/app/components/TodoItem.js',
        'src/app/components/TodoItem.spec.js',
        'src/app/components/TodoTextInput.html',
        'src/app/components/TodoTextInput.js',
        'src/app/components/TodoTextInput.spec.js',

        'src/app/constants/ActionTypes.js',
        'src/app/constants/TodoFilters.js',

        'src/app/containers/App.html',
        'src/app/containers/App.js',

        'src/app/reducers/index.js',
        'src/app/reducers/todos.js',
        'src/app/reducers/todos.spec.js'

      ].map(file => this.copyTemplate(file, file));
    }
  }
});
