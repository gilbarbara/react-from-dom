# react-from-dom

[![NPM version](https://badge.fury.io/js/react-from-dom.svg)](https://www.npmjs.com/package/react-from-dom) [![CI](https://github.com/gilbarbara/react-from-dom/actions/workflows/main.yml/badge.svg)](https://github.com/gilbarbara/react-from-dom/actions/workflows/main.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_react-from-dom&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=gilbarbara_react-from-dom) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_react-from-dom&metric=coverage)](https://sonarcloud.io/summary/new_code?id=gilbarbara_react-from-dom)

Convert HTML/XML source code or a DOM node to a React element.  
The perfect replacement for React's `dangerouslySetInnerHTML`


## Setup

Install it
```shell-script
npm install react-from-dom
```

## Getting Started

Set a string with HTML/XML source code OR a DOM Node, which will be used to create React elements recursively.

```jsx
import React from 'react';
import convert from 'react-from-dom';

const panel = convert(`
<div class="panel">
  <div class="panel-header">
    <h2>Title</h2>
  </div>
  <div class="panel-content">
    <ul>
      <li>line 1</li>
      <li>line 2</li>
    </ul>
  </div>
  <div class="panel-footer">
    Footer
  </div>
</div>
`);

const audio = document.createElement('audio');
audio.setAttribute('controls', 'true');
audio.setAttribute(
  'src',
  'https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3',
);
const audioContent = document.createTextNode('Your browser does not support the audio element.');
audio.appendChild(audioContent);

const audioElement = convert(audio);

const App = () => (
  <div>
    {panel}
    {audioElement}
  </div>
);
```
## API

The function accepts two parameters:

**input** `string|Node`  - *required*  
An HTML/XML source code string or a DOM node.

**options** `Options`

- **actions** `Action[]`  
  An array of actions to modify the nodes before converting them to ReactNodes.  
  *Read about them below.*
- **allowWhiteSpaces** `boolean` ▶︎ **false**  
  Don't remove white spaces in the output.
- **includeAllNodes** `boolean` ▶︎ **false**  
  Parse all nodes instead of just a single parent node.  
  This will return a ReactNode array (or a NodeList if `nodeOnly` is true)
- **Index** `number` ▶︎ **0**  
  The index to start the React key identification.
- **level** `number` ▶︎ **0**  
  The level to start the React key identification.
- **nodeOnly** `boolean` ▶︎ **false**  
  Return the node (or NodeList) without converting it to a ReactNode.  
  *Only used for string inputs.*
- **randomKey** `boolean` ▶︎ **false**  
  Add a random key to the root element.
- **selector** `string` ▶︎ **body > ***  
  The selector to use in the `document.querySelector` method.  
  *Only used for string inputs.*
- **type** `DOMParserSupportedType` ▶︎ **text/html**  
  The mimeType to use in the DOMParser's parseFromString.  
  *Only used for string inputs.*

### Actions

You can mutate/update a Node before the conversion or replace it with a ReactNode.

```tsx
{
  // If this returns true, the two following functions are called if they are defined
  condition: (node: Node, key: string, level: number) => boolean;

  // Use this to update or replace the node
  // e.g. for removing or adding attributes, changing the node type
  pre?: (node: Node, key: string, level: number) => Node;

  // Use this to inject a component or remove the node
  // It must return something that can be rendered by React
  post?: (node: Node, key: string, level: number) => React.ReactNode;
}
```

#### Examples

##### Add a class to all elements that match.

```javascript
{
  condition: node => node.nodeName.toLowerCase() === 'div',
  pre: node => {
    node.className += ' a-class-added';
    return node;
  },
}
```

##### Remove all elements with a specific class.
```javascript
{
  condition: node => node.className.indexOf('delete-me') >= 0,
  post: () => null,
}
```

##### Return a react component for some node types.
```javascript
{
  condition: node => node.nodeName.toLowerCase() === 'pre',
  post: (node, key) => (
    <ReactMarkdown key={key} source={node.textContent} />
  ),
},
```

##### Transform one node into another and preserve the child nodes.
```javascript
{
  condition: node => node.nodeName.toLowerCase() === 'ul',
  pre: (node) => {
    const ol = document.createElement('ol');
    
    [...node.childNodes].forEach(child => {
      ol.appendChild(child);
    });
    
    return ol;
  }
}
```

## Browser Support

If you need to support legacy browsers, you'll need to include a polyfiil for `Number.isNaN` in your app.  
Take a look at [react-app-polyfill](https://www.npmjs.com/package/react-app-polyfill) or [polyfill.io](https://polyfill.io/v3/).

## Credits

This is a fork from the [dom-to-react](https://github.com/diva-e/dom-to-react) package. Thanks! ❤️

## License

MIT
