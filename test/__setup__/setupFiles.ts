declare var global: any;
declare var window: any;

import Enzyme, { shallow, mount, render } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';

Enzyme.configure({ adapter: new Adapter() });

global.act = act;
global.shallow = shallow;
global.mount = mount;
global.render = render;

const react = document.createElement('div');
react.id = 'react';
react.style.height = '100vh';
document.body.appendChild(react);

global.skipEventLoop = () => new Promise(resolve => setImmediate(resolve));

window.requestAnimationFrame = (callback: () => void) => {
  setTimeout(callback, 0);
};

window.matchMedia = () => ({
  addListener: () => ({}),
  matches: false,
  removeListener: () => ({}),
});

// tslint:disable:no-console
const consoleError = console.error;
console.error = jest.fn(error => {
  const skipMessages = ['Expected `%s` listener', 'Error parsing input'];

  if (
    (typeof error === 'string' && skipMessages.some(d => error.indexOf(d) >= 0)) ||
    (error instanceof Error && skipMessages.some(d => error.message.indexOf(d) >= 0))
  ) {
    return;
  }

  consoleError(error);
});

console.warn = jest.fn();
