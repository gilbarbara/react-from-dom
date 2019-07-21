/*eslint spaced-comment: ["error", "never"]*/
import React from 'react';
import { render } from 'react-dom';
// import { polyfill } from 'es6-promise'; polyfill();
import Demo from 'demo/components/Demo';


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app');
  const demoDom = container.removeChild(container.querySelector('.root'));

  render((
    <Demo dom={demoDom} />
  ), container
  );
});
