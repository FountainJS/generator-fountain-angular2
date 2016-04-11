var Hello = require('./hello');

describe('hello component', function () {
  it('should render hello world', function () {
    var hello = new Hello();
    expect(hello.hello).to.equal('Hello World!');
  });
});
