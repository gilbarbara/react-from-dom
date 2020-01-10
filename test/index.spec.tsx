import * as React from 'react';

import convert, { convertFromNode, convertFromString } from '../src/index';

import { audio, form, panel, svg, svgWithStyleAndScript } from './__fixtures__/data';

declare let global: any;

const ReactMarkdown: React.FC = ({ children }) => <div>{children}</div>;

describe('react-from-dom', () => {
  it('should convert an SVG from a string', () => {
    const node = convertFromString(svg, { nodeOnly: true });

    expect(node).toMatchSnapshot();

    // @ts-ignore
    const element: React.ReactNode = convert(node);

    const wrapper = global.mount(element);
    expect(wrapper).toMatchSnapshot();
  });

  it('should convert an SVG with style and script from a string', () => {
    const element: React.ReactNode = convert(svgWithStyleAndScript, {
      selector: 'svg',
    });
    const wrapper = global.mount(element);

    expect(wrapper).toMatchSnapshot();
  });

  it('should convert a search form from a string', () => {
    const element: React.ReactNode = convert(form);
    const wrapper = global.mount(element);

    expect(wrapper).toMatchSnapshot();
  });

  it('should convert an audio from Node', () => {
    const element: React.ReactNode = convert(audio as Node);
    const wrapper = global.mount(element);

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle actions', () => {
    // @ts-ignore
    const element: React.ElementType = convert(panel, {
      actions: [
        {
          condition: node => node.nodeName.toLowerCase() === 'code',
          pre: () => null,
        },
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
              // eslint-disable-next-line no-param-reassign
              node.className += ' panel--fixed';
            }

            return node;
          },
        },
      ],
      selector: 'div',
    });
    const wrapper = global.mount(element);

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle broken markup', () => {
    const element: React.ReactNode = convert('<div><span>los</span>', {
      selector: 'div',
    });
    const wrapper = global.mount(element);

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle missing or invalid parameters', () => {
    // @ts-ignore
    expect(convert()).toBeNull();

    // @ts-ignore
    expect(convert(() => ({}))).toBeNull();

    // @ts-ignore
    expect(convertFromNode()).toBeNull();

    // @ts-ignore
    expect(convertFromNode('This is not a test')).toBeNull();

    // @ts-ignore
    expect(convertFromString()).toBeNull();

    // @ts-ignore
    expect(convertFromString([])).toBeNull();

    // @ts-ignore
    expect(convertFromString('This is a test')).toBeNull();
  });
});
