# react-from-dom

Convert HTML/XML source code or a DOM node to a React element.  
The perfect replacement for React's `dangerouslySetInnerHTML`


## Setup

Install it
```shell-script
npm install react-from-dom
```

## Getting Started

Set a string with HTML/XML source code OR a DOM Node which it will be used to create React elements recursively.

```jsx
import React from 'react';
import convertDOM from 'react-from-dom';

const panel = convertDOM(`
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
const audioElement = convertDOM(audio);

const App = () => (
  <div>
    {panel}
    {audioElement}
  </div>
);
```
## API

The function accepts two parameters:

**type** {string|Node}  - *required*  
An HTML/XML source code string or a DOM node.

**options** {object} - optional

- **actions** {Action[]}  
  An array of actions to parse your input before converting. Read about them below.
- **selector** {string}  
  The CSS selector used to get your entry. Default: `body > *`
  *Only for string input.*
- **type** {string}  
  The mimeType used by DOMParser's parseFromString. Default: `text/html`
  *Only for string input.*

### Actions

You can mutate/update a Node before the conversion or replace it  with a ReactNode.

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

##### Add a class to all elements that match

```javascript
{
  condition: node => node.nodeName.toLowerCase() === 'div',
  pre: node => {
    node.className += ' a-class-added';
    return node;
  },
}
```

##### Remove all elements with a certain class
```javascript
{
  condition: node => node.className.indexOf('delete-me') >= 0,
  post: () => null,
}
```

##### Return a react component for some node types
```javascript
{
  condition: node => node.nodeName.toLowerCase() === 'pre',
  post: (node, key) => (
    <ReactMarkdown key={key} source={node.textContent} />
  ),
},
```

##### Transform one node into another and preserve the childNodes
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



## Credits

This is a fork from diva-e's [dom-to-react](https://github.com/diva-e/dom-to-react) package. Thanks! ❤️