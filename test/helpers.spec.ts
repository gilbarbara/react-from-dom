import { randomString, styleToObject } from '../src/helpers';

describe('randomString', () => {
  it('should return a random string', () => {
    expect(randomString()).toHaveLength(6);
  });
  it('should return a 20 characters random string', () => {
    expect(randomString(20)).toHaveLength(20);
  });
});

describe('styleToObject', () => {
  it('should return an object', () => {
    expect(styleToObject('')).toEqual({});
    expect(
      styleToObject(
        'stroke-width: 0;stroke-dasharray: none;stroke-linecap: butt;stroke-dashoffset: 0;stroke-linejoin: miter;stroke-miterlimit: 4;fill: var(--my-css-var);fill-rule: nonzero;opacity: 1;--my-css-var: yellow;',
      ),
    ).toEqual({
      '--my-css-var': 'yellow',
      fill: 'var(--my-css-var)',
      fillRule: 'nonzero',
      opacity: 1,
      strokeDasharray: 'none',
      strokeDashoffset: 0,
      strokeLinecap: 'butt',
      strokeLinejoin: 'miter',
      strokeMiterlimit: 4,
      strokeWidth: 0,
    });
  });
});
