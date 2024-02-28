import * as React from 'react';

import { noTextChildNodes, possibleStandardNames, randomString, styleToObject } from './helpers';

export interface Options {
  /**
   * An array of actions to modify the nodes before converting them to ReactNodes.
   */
  actions?: Action[];
  /**
   * Don't remove white spaces in the output.
   */
  allowWhiteSpaces?: boolean;
  /**
   * Parse all nodes instead of just a single parent node.
   * This will return a ReactNode array (or a NodeList if `nodeOnly` is true).
   */
  includeAllNodes?: boolean;
  /**
   * The index to start the React key identification.
   * @default 0
   */
  index?: number;
  /**
   * The level to start the React key identification.
   * @default 0
   */
  level?: number;
  /**
   * Only return the node (or NodeList) without converting it to a ReactNode.
   */
  nodeOnly?: boolean;
  /**
   * Add a random key to the root element.
   * @default false
   */
  randomKey?: boolean;
  /**
   * The selector to use in the `document.querySelector` method.
   * @default 'body > *'
   */
  selector?: string;
  /**
   * The mimeType to use in the DOMParser's parseFromString.
   * @default 'text/html'
   */
  type?: DOMParserSupportedType;
}

export type Output = React.ReactNode | Node | NodeList;

interface Attributes {
  [index: string]: any;

  key: string;
}

interface GetReactNodeOptions extends Options {
  key: string;
  level: number;
}

export interface Action {
  // If this returns true, the two following functions are called if they are defined
  condition: (node: Node, key: string, level: number) => boolean;

  // Use this to inject a component or remove the node
  // It must return something that can be rendered by React
  post?: (node: Node, key: string, level: number) => React.ReactNode;

  // Use this to update or replace the node
  // e.g. for removing or adding attributes, changing the node type
  pre?: (node: Node, key: string, level: number) => Node;
}

function getReactNode(node: Node, options: GetReactNodeOptions): React.ReactNode {
  const { key, level, ...rest } = options;

  switch (node.nodeType) {
    case 1: {
      // regular dom-node
      return React.createElement(
        parseName(node.nodeName),
        parseAttributes(node, key),
        parseChildren(node.childNodes, level, rest),
      );
    }
    case 3: {
      // textnode
      const nodeText = node.nodeValue?.toString() ?? '';

      if (!rest.allowWhiteSpaces && /^\s+$/.test(nodeText) && !/[\u00A0\u202F]/.test(nodeText)) {
        return null;
      }

      /* c8 ignore next 3 */
      if (!node.parentNode) {
        return nodeText;
      }

      const parentNodeName = node.parentNode.nodeName.toLowerCase();

      if (noTextChildNodes.includes(parentNodeName)) {
        if (/\S/.test(nodeText)) {
          // eslint-disable-next-line no-console
          console.warn(
            `A textNode is not allowed inside '${parentNodeName}'. Your text "${nodeText}" will be ignored`,
          );
        }

        return null;
      }

      return nodeText;
    }
    case 8: {
      // html-comment
      return null;
    }
    case 11: {
      // fragment

      return parseChildren(node.childNodes, level, options);
    }
    /* c8 ignore next 3 */
    default: {
      return null;
    }
  }
}

function parseAttributes(node: Node, reactKey: string): Attributes {
  const attributes: Attributes = {
    key: reactKey,
  };

  if (node instanceof Element) {
    const nodeClassNames = node.getAttribute('class');

    if (nodeClassNames) {
      attributes.className = nodeClassNames;
    }

    [...node.attributes].forEach(d => {
      switch (d.name) {
        // this is manually handled above, so break;
        case 'class':
          break;
        case 'style':
          attributes[d.name] = styleToObject(d.value);
          break;
        case 'allowfullscreen':
        case 'allowpaymentrequest':
        case 'async':
        case 'autofocus':
        case 'autoplay':
        case 'checked':
        case 'controls':
        case 'default':
        case 'defer':
        case 'disabled':
        case 'formnovalidate':
        case 'hidden':
        case 'ismap':
        case 'itemscope':
        case 'loop':
        case 'multiple':
        case 'muted':
        case 'nomodule':
        case 'novalidate':
        case 'open':
        case 'readonly':
        case 'required':
        case 'reversed':
        case 'selected':
        case 'typemustmatch':
          attributes[possibleStandardNames[d.name] || d.name] = true;
          break;
        default:
          attributes[possibleStandardNames[d.name] || d.name] = d.value;
      }
    });
  }

  return attributes;
}

function parseChildren(childNodeList: NodeList, level: number, options: Options) {
  const children: React.ReactNode[] = [...childNodeList]
    .map((node, index) =>
      convertFromNode(node, {
        ...options,
        index,
        level: level + 1,
      }),
    )
    .filter(Boolean);

  if (!children.length) {
    return null;
  }

  return children;
}

function parseName(nodeName: string) {
  if (/[a-z]+[A-Z]+[a-z]+/.test(nodeName)) {
    return nodeName;
  }

  return nodeName.toLowerCase();
}

export function convertFromNode(input: Node, options: Options = {}): React.ReactNode {
  if (!input || !(input instanceof Node)) {
    return null;
  }

  const { actions = [], index = 0, level = 0, randomKey } = options;

  let node = input;
  let key = `${level}-${index}`;
  const result: React.ReactNode[] = [];

  if (randomKey && level === 0) {
    key = `${randomString()}-${key}`;
  }

  if (Array.isArray(actions)) {
    actions.forEach((action: Action) => {
      if (action.condition(node, key, level)) {
        if (typeof action.pre === 'function') {
          node = action.pre(node, key, level);

          if (!(node instanceof Node)) {
            node = input;

            if (process.env.NODE_ENV !== 'production') {
              // eslint-disable-next-line no-console
              console.warn(
                'The `pre` method always must return a valid DomNode (instanceof Node) - your modification will be ignored (Hint: if you want to render a React-component, use the `post` method instead)',
              );
            }
          }
        }

        if (typeof action.post === 'function') {
          result.push(action.post(node, key, level));
        }
      }
    });
  }

  if (result.length) {
    return result;
  }

  return getReactNode(node, { key, level, ...options });
}

export function convertFromString(input: string, options: Options = {}): Output {
  if (!input || typeof input !== 'string') {
    return null;
  }

  const {
    includeAllNodes = false,
    nodeOnly = false,
    selector = 'body > *',
    type = 'text/html',
  } = options;

  try {
    const parser = new DOMParser();
    const document = parser.parseFromString(input, type);

    if (includeAllNodes) {
      const { childNodes } = document.body;

      if (nodeOnly) {
        return childNodes;
      }

      return [...childNodes].map(node => convertFromNode(node, options));
    }

    const node = document.querySelector(selector) || document.body.childNodes[0];

    /* c8 ignore next 3 */
    if (!(node instanceof Node)) {
      throw new TypeError('Error parsing input');
    }

    if (nodeOnly) {
      return node;
    }

    return convertFromNode(node, options);
    /* c8 ignore start */
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  return null;
  /* c8 ignore stop */
}

export default function convert(input: Node | string, options: Options = {}): Output {
  if (typeof input === 'string') {
    return convertFromString(input, options);
  }

  if (input instanceof Node) {
    return convertFromNode(input, options);
  }

  return null;
}
