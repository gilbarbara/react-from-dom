import * as React from 'react';
import { mount } from 'enzyme';

import convert, { convertFromNode, convertFromString } from '../src/index';

import { audio, form, iframe, panel, svg, svgWithStyleAndScript, utf8 } from './__fixtures__/data';

const ReactMarkdown: React.FC = ({ children }) => <div>{children}</div>;

describe('react-from-dom', () => {
  it('should convert an SVG from a string', () => {
    const node = convertFromString(svg, { nodeOnly: true });

    expect(node).toMatchSnapshot();

    // @ts-ignore
    const element: React.ReactNode = convert(node);

    const wrapper = mount(element as React.ReactElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should convert an SVG with style and script from a string', () => {
    const element: React.ReactNode = convert(svgWithStyleAndScript, {
      selector: 'svg',
    });
    const wrapper = mount(element as React.ReactElement);

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle UTF8 text', () => {
    const element: React.ReactNode = convert(utf8);
    const wrapper = mount(element as React.ReactElement);

    expect(wrapper).toMatchSnapshot();
  });

  it('should convert a search form from a string', () => {
    const element: React.ReactNode = convert(form);
    const wrapper = mount(element as React.ReactElement);

    expect(wrapper).toMatchSnapshot();
  });

  it('should convert an iframe from a string', () => {
    const element: React.ReactNode = convert(iframe);
    const wrapper = mount(element as React.ReactElement);

    expect(wrapper).toMatchSnapshot();
  });

  it('should convert an audio from Node', () => {
    const element: React.ReactNode = convert(audio as Node);
    const wrapper = mount(element as React.ReactElement);

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle actions', () => {
    const element = convert(panel, {
      actions: [
        {
          condition: (node) => node.nodeName.toLowerCase() === 'code',
          // @ts-ignore
          pre: () => null,
        },
        {
          condition: (node) => node.nodeName.toLowerCase() === 'pre',
          post: (node, key) => (
            // @ts-ignore
            <ReactMarkdown key={key} source={node.textContent} />
          ),
        },
        {
          condition: (node) => node.nodeName.toLowerCase() === 'ul',
          pre: (node) => {
            const ol = document.createElement('ol');

            [...node.childNodes].forEach((child) => {
              ol.appendChild(child);
            });

            return ol;
          },
        },
        {
          condition: (node) => node instanceof HTMLElement && node.className === 'panel-footer',
          post: () => null,
        },
        {
          condition: (node) => node instanceof HTMLElement && node.classList.contains('panel'),
          pre: (node) => {
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
    const wrapper = mount(element as React.ReactElement);

    expect(wrapper).toMatchSnapshot();
  });

  it('should handle broken markup', () => {
    const element: React.ReactNode = convert('<div><span>los</span>', {
      selector: 'div',
    });
    const wrapper = mount(element as React.ReactElement);

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
