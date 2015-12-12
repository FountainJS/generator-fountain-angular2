import { Hello } from './hello';

describe('hello component', function() {
  it('should render hello world', function() {
    const hello = new Hello();
    expect(hello.hello).toEqual('Hello World!');
  });
});
