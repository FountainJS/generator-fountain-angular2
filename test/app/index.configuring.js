const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('fountain-generator').TestUtils;

let context;

test.before(() => {
  context = TestUtils.mock('app');
  require('../../generators/app/index');
});

test.beforeEach(() => {
  context.mergeJson['package.json'] = {};
  context.config = {
    set: () => {}
  };
});

test('Call this.config.set twice', () => {
  context.config = {
    set: () => {}
  };
  const spy = chai.spy.on(context.config, 'set');
  TestUtils.call(context, 'configuring.config');
  expect(spy).to.have.been.called.twice();
  expect(spy).to.have.been.called.with('version');
  expect(spy).to.have.been.called.with('props');
});

test(`Add '@angular/core' to package.json dependencies`, t => {
  context.props = {js: 'babel'};
  TestUtils.call(context, 'configuring.pkg');
  t.is(context.mergeJson['package.json'].dependencies['@angular/core'], '2.0.0-rc.4');
});

test(`Add 'es6-shim' to package.json dependencies when js is 'typescript'`, t => {
  context.props = {js: 'typescript'};
  TestUtils.call(context, 'configuring.pkg');
  t.is(context.mergeJson['package.json'].dependencies['es6-shim'], '^0.35.0');
});

test(`Add 'babel-plugin-angular2-annotations' to package.json devDependencies with js of 'babel'`, t => {
  context.props = {js: 'babel'};
  TestUtils.call(context, 'configuring.babel');
  t.is(context.mergeJson['package.json'].devDependencies['babel-plugin-angular2-annotations'], '^5.0.0');
});

test(`Add 'angular2-annotations' to .babelrc plugins when js is 'babel' and modules is 'webpack'`, t => {
  context.props = {js: 'babel', modules: 'webpack'};
  TestUtils.call(context, 'configuring.babel');
  t.true(context.mergeJson['.babelrc'].plugins.indexOf('angular2-annotations') > -1);
});

test(`Add 'angular2-annotations' to .babelrc plugins when js is 'babel' and modules is 'systemjs'`, t => {
  context.props = {js: 'babel', modules: 'systemjs'};
  TestUtils.call(context, 'configuring.babel');
  t.true(context.mergeJson['.babelrc'].plugins.indexOf('angular2-annotations') > -1);
});

test(`Add 'babel-plugin-angular2-annotations' to package.json devDependencies with js of 'typescript'`, t => {
  context.props = {js: 'typescript'};
  TestUtils.call(context, 'configuring.babel');
  t.is(context.mergeJson['package.json'].devDependencies, undefined);
});

test(`Add '@angular/router' to package.json dependencies`, t => {
  context.props = {router: 'router'};
  TestUtils.call(context, 'configuring.router');
  t.is(context.mergeJson['package.json'].dependencies['@angular/router'], '3.0.0-beta.2');
});

test(`Add 'ui-router-ng2' to package.json dependencies`, t => {
  context.props = {router: 'uirouter'};
  TestUtils.call(context, 'configuring.router');
  t.is(context.mergeJson['package.json'].dependencies['ui-router-ng2'], '1.0.0-alpha.5');
});

test(`Not add any router to package.json dependencies`, t => {
  context.props = {router: 'none'};
  TestUtils.call(context, 'configuring.router');
  t.deepEqual(context.mergeJson['package.json'], {});
});
