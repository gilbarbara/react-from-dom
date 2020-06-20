import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';

Enzyme.configure({ adapter: new Adapter() });

declare let global: any;

global.act = act;
global.shallow = shallow;
global.mount = mount;
global.render = render;

const react = document.createElement('div');
react.id = 'react';
react.style.height = '100vh';
document.body.appendChild(react);

global.skipEventLoop = () => new Promise((resolve) => setImmediate(resolve));

global.requestAnimationFrame = (callback: () => void) => {
  setTimeout(callback, 0);
};

global.matchMedia = () => ({
  addListener: () => ({}),
  matches: false,
  removeListener: () => ({}),
});

/*eslint-disable no-console */
const consoleError = console.error;
console.error = jest.fn((error) => {
  const skipMessages = [
    'Expected `%s` listener',
    'Error parsing input',
    'You provided a `checked` prop',
    'Use the `defaultValue` or `value`',
  ];

  if (
    (typeof error === 'string' && skipMessages.some((d) => error.indexOf(d) >= 0)) ||
    (error instanceof Error && skipMessages.some((d) => error.message.indexOf(d) >= 0))
  ) {
    return;
  }

  consoleError(error);
});

console.warn = jest.fn();
