const path = require('path');
const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('fountain-generator').TestUtils;

let context;

test.before(() => {
  context = TestUtils.mock('todoMVC');
  require('../../generators/todoMVC/index');
  process.chdir(path.resolve(__dirname, '../../'));
});

test.beforeEach(() => {
  context.mergeJson['package.json'] = {};
});

test(`Add '@ngrx/store' to package.json dependencies when using babel`, () => {
  TestUtils.call(context, 'configuring', {js: 'babel'});
  expect(context.mergeJson['package.json'].dependencies['@ngrx/store']).to.equal('^2.2.1');
});

test(`Add 'object-assign' to package.json dependencies when using es5`, () => {
  TestUtils.call(context, 'configuring', {js: 'js'});
  expect(context.mergeJson['package.json'].dependencies['object-assign']).to.equal('^4.1.1');
});

test(`Call this.copyTemplate 27 times`, () => {
  const files = [
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
  ];
  const spy = chai.spy.on(context, 'copyTemplate');
  TestUtils.call(context, 'writing.src', {
    version: require('../../package.json').version,
    date: new Date().toString()
  });
  expect(spy).to.have.been.called.exactly(files.length);
  files.filter(file => file !== 'src/index.css').forEach(file => expect(context.copyTemplate[file].length).to.be.above(0));
});
