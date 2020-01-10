import * as React from 'react';
import { noTextChildNodes, possibleStandardNames, styleToObject } from './helpers';

interface IOptions {
  actions?: IAction[];
  index?: number;
  level?: number;
  nodeOnly?: boolean;
  selector?: string;
  type?: string;
  keyPrefix?: string;
}

interface IAttributes {
  key: string;
  [index: string]: any;
}

export interface IAction {
  // If this returns true, the two following functions are called if they are defined
  condition: (node: Node, key: string, level: number) => boolean;

  // Use this to inject a component or remove the node
  // It must return something that can be rendered by React
  post?: (node: Node, key: string, level: number) => React.ReactNode;

  // Use this to update or replace the node
  // e.g. for removing or adding attributes, changing the node type
  pre?: (node: Node, key: string, level: number) => Node;
}

function parseAttributes(node: Node, reactKey: string): IAttributes {
  const attributes: IAttributes = {
    key: reactKey,
  };

  /* istanbul ignore else */
  if (node instanceof Element) {
    const nodeClassNames = node.getAttribute('class');

    if (nodeClassNames) {
      attributes.className = nodeClassNames;
    }

    [...node.attributes].forEach(d => {
      switch (d.name) {
        // these are manually handled above, so break;
        case 'class':
          break;
        case 'style':
          attributes[d.name] = styleToObject(d.value);
          break;
        case 'checked':
        case 'disabled':
        case 'selected':
        case 'autoplay':
        case 'controls':
          attributes[d.name] = d.name;
          break;
        default:
          attributes[possibleStandardNames[d.name] || d.name] = d.value;
      }
    });
  }

  return attributes;
}

function parseChildren(childNodeList: NodeList, level: number, options: {}) {
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

export function convertFromNode(input: Node, options: IOptions = {}): React.ReactNode {
  if (!input || !(input instanceof Node)) {
    return null;
  }

  const { actions = [], index = 0, level = 0, keyPrefix = '' } = options;

  let node = input;
  const key = `${keyPrefix}${level}-${index}`;
  const result: Array<Node | React.ReactNode> = [];

  /* istanbul ignore else */
  if (Array.isArray(actions)) {
    actions.forEach((action: IAction) => {
      if (action.condition(node, key, level)) {
        if (typeof action.pre === 'function') {
          node = action.pre(node, key, level);

          if (!(node instanceof Node)) {
            node = input;

            /* istanbul ignore else */
            if (process.env.NODE_ENV !== 'production') {
              // tslint:disable-next-line:no-console
              console.warn(
                'The `pre`-method always must return a valid DomNode (instanceof Node) - your modification will be ignored (Hint: if you want to render a React-component, use the `action`-method instead)',
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

  switch (node.nodeType) {
    case 1: // regular dom-node
      return React.createElement(
        parseName(node.nodeName),
        parseAttributes(node, key),
        parseChildren(node.childNodes, level, options),
      );

    case 3: // textnode
      const nodeText = node.nodeValue!.toString();

      /* istanbul ignore else */
      if (/^\s+$/.test(nodeText)) {
        return null;
      }

      /* istanbul ignore next */
      if (!node.parentNode) {
        return nodeText;
      }

      const parentNodeName = node.parentNode.nodeName.toLowerCase();

      if (noTextChildNodes.indexOf(parentNodeName) !== -1) {
        /* istanbul ignore else */
        if (/\S/.test(nodeText)) {
          // tslint:disable-next-line:no-console
          console.warn(
            `A textNode is not allowed inside '${parentNodeName}'. Your text "${nodeText}" will be ignored`,
          );
        }
        return null;
      }

      return nodeText;

    case 8: // html-comment
      return null;

    /* istanbul ignore next */
    default:
      return null;
  }
}

export function convertFromString(input: string, options: IOptions = {}): React.ReactNode | Node {
  if (!input || typeof input !== 'string') {
    return null;
  }
  const { nodeOnly = false, selector = 'body > *', type = 'text/html' } = options;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, type as SupportedType);
    const node = doc.querySelector(selector);

    if (!(node instanceof Node)) {
      throw new Error('Error parsing input');
    }

    if (nodeOnly) {
      return node;
    }

    return convertFromNode(node, options);
  } catch (error) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      // tslint:disable-next-line:no-console
      console.error(error);
    }
  }

  return null;
}

export default function convert(
  input: Node | string,
  options: IOptions = {},
): React.ReactNode | Node {
  if (typeof input === 'string') {
    return convertFromString(input, options);
  } else if (input instanceof Node) {
    return convertFromNode(input, options);
  }

  return null;
}
