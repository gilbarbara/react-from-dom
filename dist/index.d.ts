import * as React from 'react';

interface Options {
    /**
     * An array of actions to modify the nodes before they are converted to ReactNodes.
     */
    actions?: Action[];
    /**
     * Skip removing white spaces in the output.
     */
    allowWhiteSpaces?: boolean;
    /**
     * Parse all nodes instead of just a single parent node.
     * This will return a ReactNode array (or a NodeList if `nodeOnly` is true).
     */
    includeAllNodes?: boolean;
    /**
     * The index to start with.
     * @default 0
     */
    index?: number;
    /**
     * The level to start with.
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
     * The selector to use for in the `document.querySelector` method.
     * @default 'body > *'
     */
    selector?: string;
    /**
     * The type of the input string.
     * @default 'text/html'
     */
    type?: DOMParserSupportedType;
}
type Output = React.ReactNode | Node | NodeList;
interface Action {
    condition: (node: Node, key: string, level: number) => boolean;
    post?: (node: Node, key: string, level: number) => React.ReactNode;
    pre?: (node: Node, key: string, level: number) => Node;
}
declare function convertFromNode(input: Node, options?: Options): React.ReactNode;
declare function convertFromString(input: string, options?: Options): Output;
declare function convert(input: Node | string, options?: Options): Output;

export { type Action, type Options, type Output, convertFromNode, convertFromString, convert as default };
