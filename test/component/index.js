const path = require('path');
const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('fountain-generator').TestUtils;

let context;

test.before(() => {
  context = TestUtils.mock('component');
  context.config = {get: () => context.props};
  require('../../generators/component/index');
  process.chdir(path.resolve(__dirname, '../../'));
});

test(`Call this.copyTemplate 3 times without 'dir' option`, t => {
  const spy = chai.spy.on(context, 'copyTemplate');
  TestUtils.call(context, 'writing');
  expect(spy).to.have.been.called.exactly(3);
  t.true(context.copyTemplate['src/app/myComponent.js'].length > 0);
  t.true(context.copyTemplate['src/app/myComponent.html'].length > 0);
  t.true(context.copyTemplate['src/app/myComponent.spec.js'].length > 0);
});

test(`Call this.copyTemplate 3 times with 'dir' option`, t => {
  const spy = chai.spy.on(context, 'copyTemplate');
  TestUtils.call(context, 'writing', {dir: 'game'});
  expect(spy).to.have.been.called.exactly(3);
  t.true(context.copyTemplate['src/app/game/myComponent.js'].length > 0);
  t.true(context.copyTemplate['src/app/game/myComponent.html'].length > 0);
  t.true(context.copyTemplate['src/app/game/myComponent.spec.js'].length > 0);
});
