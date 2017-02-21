const path = require('path');
const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('fountain-generator').TestUtils;

let context;

const files = [
  'src/index.js',
  'src/index.css',
  'src/app/index.js',
  'src/app/hello.html',
  'src/app/hello.js',
  'src/app/hello.spec.js'
];

test.before(() => {
  context = TestUtils.mock('hello');
  require('../../generators/hello/index');
  process.chdir(path.resolve(__dirname, '../../'));
});

test(`Call this.copyTemplate 6 times`, t => {
  const spy = chai.spy.on(context, 'copyTemplate');
  TestUtils.call(context, 'writing');
  expect(spy).to.have.been.called.exactly(files.length);
  files.forEach(file => t.true(context.copyTemplate[file].length > 0));
});
