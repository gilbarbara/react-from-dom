import React from 'react';
import { noTextChildNodes, possibleStandardNames } from './helpers';

interface IOptions {
  actions?: IAction[];
  index?: number;
  level?: number;
  selector?: string;
  type?: string;
}

interface IAttributes {
  key: string;
  [key: string]: any;
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

function parseAttributes(node, reactKey) {
  const attributes: IAttributes = {
    key: reactKey,
  };

  const nodeClassNames = node.getAttribute('class');

  if (nodeClassNames) {
    attributes.className = nodeClassNames;
  }

  [...node.attributes].map(d => {
    switch (d.name) {
      // these are manually handled above, so break;
      case 'class':
      case 'style':
        break;
      case 'checked':
      case 'selected':
      case 'disabled':
      case 'autoplay':
      case 'controls':
        attributes[d.name] = d.name;
        break;
      default:
        if (possibleStandardNames[d.name]) {
          attributes[possibleStandardNames[d.name]] = d.value;
        } else {
          attributes[d.name] = d.value;
        }
    }
    return null;
  });

  return attributes;
}

function parseChildren(childNodeList, level, options) {
  const children = [...childNodeList]
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

function parseName(nodeName) {
  if (/[a-z]+[A-Z]+[a-z]+/.test(nodeName)) {
    return nodeName;
  }

  return nodeName.toLowerCase();
}

export function convertFromNode(node: Node, options: IOptions = {}) {
  if (!node) {
    return null;
  }

  const { actions = [], index = 0, level = 0 } = options;

  let nextNode = node;
  const key = `${level}-${index}`;
  const result: Array<Node | React.ReactNode> = [];

  if (Array.isArray(actions)) {
    actions.forEach(action => {
      if (action.condition(nextNode, key, level)) {
        if (typeof action.pre === 'function') {
          nextNode = action.pre(nextNode, key, level);

          /* istanbul ignore next */
          if (!(nextNode instanceof Node)) {
            nextNode = node;

            if (process.env.NODE_ENV !== 'production') {
              // tslint:disable-next-line:no-console
              console.warn(
                'The `pre`-method always must return a valid DomNode (instanceof Node) - your modification will be ignored (Hint: if you want to render a React-component, use the `action`-method instead)',
              );
            }
          }
        }

        if (typeof action.post === 'function') {
          result.push(action.post(nextNode, key, level));
        }
      }
    });
  }

  if (result.length) {
    return result;
  }

  switch (nextNode.nodeType) {
    case 1: // regular dom-node
      return React.createElement(
        parseName(nextNode.nodeName),
        parseAttributes(nextNode, key),
        parseChildren(nextNode.childNodes, level, options),
      );

    case 3: // textnode
      const nodeText = nextNode.nodeValue!.toString();

      /* istanbul ignore else */
      if (!/[a-zA-Z0-9_]+/.test(nodeText)) {
        return null;
      }

      /* istanbul ignore next */
      if (!nextNode.parentNode) {
        return nodeText;
      }

      const parentNodeName = nextNode.parentNode.nodeName.toLowerCase();

      /* istanbul ignore next */
      if (noTextChildNodes.indexOf(parentNodeName) !== -1) {
        if (/\S/.test(nodeText)) {
          // tslint:disable-next-line:no-console
          console.warn(
            `a textnode is not allowed inside '${parentNodeName}'. your text "${nodeText}" will be ignored`,
          );
        }
        return null;
      }

      return nodeText;

    case 8: // html-comment
      return null;

    default:
      return null;
  }
}

export function convertFromString(text: string, options: IOptions = {}) {
  if (!text || typeof text !== 'string') {
    return null;
  }
  const { type = 'text/html', selector = 'body > *' } = options;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, type as SupportedType);
    const node = doc.querySelector(selector);

    if (!(node instanceof Node)) {
      throw new Error('Error parsing text');
    }

    return convertFromNode(node, options);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      // tslint:disable-next-line:no-console
      console.error(error);
    }
  }

  return null;
}

export default function convert(input: Node | string, options: IOptions = {}) {
  if (typeof input === 'string') {
    return convertFromString(input, options);
  } else if (input instanceof Node) {
    return convertFromNode(input, options);
  }

  return null;
}
