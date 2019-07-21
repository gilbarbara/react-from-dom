declare var global: any;
declare var window: any;

import Enzyme, { shallow, mount, render } from 'enzyme';
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

window.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

window.matchMedia = () => ({
  addListener: () => ({}),
  matches: false,
  removeListener: () => ({}),
});
