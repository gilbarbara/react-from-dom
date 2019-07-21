declare var global: any;
import React from 'react';

import convert from '../src/index';

import { audio, form, panel, svg } from './__fixtures__/data';

const ReactMarkdown: React.FC = ({ children }) => <div>{children}</div>;

describe('react-from-dom', () => {
  it('should convert an SVG from string', () => {
    const component: React.ElementType = convert(svg, {
      selector: 'svg',
      type: 'image/svg+xml',
    });
    const wrapper = global.mount(component);

    expect(wrapper).toMatchSnapshot();
  });

  it('should convert a search form from string', () => {
    const component: React.ElementType = convert(form);
    const wrapper = global.mount(component);

    expect(wrapper).toMatchSnapshot();
  });

  it('should convert an audio from Node', () => {
    const component: React.ElementType = convert(audio as Node);
    const wrapper = global.mount(component);

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle actions', () => {
    const component: React.ElementType = convert(panel, {
      actions: [
        {
          condition: node => node.nodeName.toLowerCase() === 'pre',
          post: (node, key) => (
            // @ts-ignore
            <ReactMarkdown key={key} source={node.textContent} />
          ),
        },
        {
          condition: node => node.nodeName.toLowerCase() === 'ul',
          pre: node => {
            const ol = document.createElement('ol');

            [...node.childNodes].forEach(child => {
              ol.appendChild(child);
            });

            return ol;
          },
        },
        {
          condition: node => node instanceof HTMLElement && node.className === 'panel-footer',
          post: () => null,
        },
        {
          condition: node => node instanceof HTMLElement && node.classList.contains('panel'),
          pre: node => {
            if (node instanceof HTMLElement) {
              node.className += ' panel--fixed';
            }

            return node;
          },
        },
      ],
      selector: 'div',
    });
    const wrapper = global.mount(component);

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle broken markup', () => {
    const component: React.ElementType = convert('<div><span>los</span>', {
      selector: 'div',
    });
    const wrapper = global.mount(component);

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle missing or invalid parameters', () => {
    // @ts-ignore
    expect(convert()).toBeNull();

    // @ts-ignore
    expect(convert(() => ({}))).toBeNull();

    // @ts-ignore
    expect(convert('This is not a test')).toBeNull();

    // @ts-ignore
    expect(convert([])).toBeNull();
  });
});
