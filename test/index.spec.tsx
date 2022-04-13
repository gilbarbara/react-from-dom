import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { audio, form, iframe, panel, svg, svgWithStyleAndScript, utf8 } from './__fixtures__/data';

import convert, { convertFromNode, convertFromString } from '../src/index';

jest.mock('../src/helpers', () => {
  const helpers = jest.requireActual('../src/helpers');

  return {
    ...helpers,
    randomString: () => 'ABCDE',
  };
});

function ReactMarkdown({ children }: React.PropsWithChildren<any>) {
  return <div>{children}</div>;
}

describe('react-from-dom', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
  });

  it('should convert an SVG from a string', () => {
    const node = convertFromString(svg, { nodeOnly: true });

    expect(node).toMatchSnapshot();

    const element = convert(node as Node) as React.ReactNode;

    render(<div data-testid="wrapper">{element}</div>);

    expect(screen.getByTestId('wrapper')).toMatchSnapshot();
  });

  it('should convert an SVG with style and script from a string', () => {
    const element = convert(svgWithStyleAndScript, {
      selector: 'svg',
    }) as React.ReactNode;

    render(<div data-testid="wrapper">{element}</div>);

    expect(screen.getByTestId('wrapper')).toMatchSnapshot();
  });

  it('should handle UTF8 text', () => {
    const element = convert(utf8) as React.ReactNode;

    render(<div data-testid="wrapper">{element}</div>);

    expect(screen.getByTestId('wrapper')).toMatchSnapshot();
  });

  it('should convert a search form from a string', () => {
    const element = convert(form) as React.ReactNode;

    render(<div data-testid="wrapper">{element}</div>);

    expect(screen.getByTestId('wrapper')).toMatchSnapshot();
  });

  it('should convert an iframe from a string', () => {
    const element = convert(iframe) as React.ReactNode;

    render(<div data-testid="wrapper">{element}</div>);

    expect(screen.getByTestId('wrapper')).toMatchSnapshot();
  });

  it('should convert an audio from Node', () => {
    const element = convert(audio as Node) as React.ReactNode;

    render(<div data-testid="wrapper">{element}</div>);

    expect(screen.getByTestId('wrapper')).toMatchSnapshot();
  });

  it('should handle actions', () => {
    const element = convert(panel, {
      actions: [
        {
          condition: node => node.nodeName.toLowerCase() === 'code',
          // @ts-ignore
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
      randomKey: true,
      selector: 'div',
    }) as React.ReactNode;

    render(<div data-testid="wrapper">{element}</div>);

    expect(screen.getByTestId('wrapper')).toMatchSnapshot();
  });

  it('should handle broken markup', () => {
    const element = convert('<div><span>los</span>', {
      selector: 'div',
    }) as React.ReactNode;

    render(<div data-testid="wrapper">{element}</div>);

    expect(screen.getByTestId('wrapper')).toMatchSnapshot();
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
