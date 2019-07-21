export const audio = document.createElement('audio');
audio.setAttribute('controls', 'true');
audio.setAttribute(
  'src',
  'https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3',
);
const audioContent = document.createTextNode('Your browser does not support the audio element.');
audio.appendChild(audioContent);

export const form = `
<form id="search" action="/search" method="get" class="search-bar" autocomplete="off" _lpchecked="1">
  <!-- Search Form -->
  <h1>Search</h1>
  Human
  <label for="pet-select">Choose a pet:</label>
  <select id="pet-select">
      <option value="">--Please choose an option--</option>
      <option value="dog">Dog</option>
      <option value="cat" selected>Cat</option>
  </select>
  <input type="checkbox" name="visible" value="on" checked>
  <div class="ps-relative">
    <input name="q" type="text" placeholder="Search…" autocomplete="off" maxlength="240" class="s-input s-input__search js-search-field " aria-label="Search">
    <svg aria-hidden="true" class="svg-icon s-input-icon s-input-icon__search iconSearch" width="18" height="18" viewBox="0 0 18 18"><path d="M18 16.5l-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0z"></path></svg>
  </div>
</form>
`;

export const panel = `
<div class="panel">
  <div class="panel-header">
    <h2>Title</h2>
  </div>
  <div class="panel-content">
    <ul>
      <li>line 1</li>
      <li>line 2</li>
    </ul>
    <p>
      This Element has a <code>style</code> attribute.<br>
      It also shows how to use the <code>parser</code>-argument
    </p>
    <img>EMPTY</img>
    <pre>This is a test</pre>
  </div>
  <div class="panel-footer">
    Footer
  </div>
</div>
`;

export const svg = `
<svg width="256px" height="296px" viewBox="0 0 256 296" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
    <defs>
    <linearGradient x1="50%" y1="0%" x2="50%" y2="99.3024554%" id="linearGradient-1">
            <stop stop-color="#404040" stop-opacity="0.3" offset="0%"></stop>
            <stop stop-color="#404040" stop-opacity="0" offset="100%"></stop>
        </linearGradient>
    </defs>
    <g>
        <path d="M115.497674,261.08837 L115.497674,154.478845 L23.8139535,101.729261 L23.8139535,162.501763 L65.8104558,186.8486 L65.8104558,232.549219 L115.497674,261.08837 Z M139.311628,261.714907 L189.916577,232.563707 L189.916577,185.779949 L232.186047,161.285235 L232.186047,101.27387 L139.311628,154.895035 L139.311628,261.714907 Z M219.971965,80.8276886 L171.155386,52.5391067 L128.292316,77.4106841 L85.1040206,52.5141067 L35.8521355,81.1812296 L127.765737,134.063073 L219.971965,80.8276886 Z M0,222.211907 L0,74.4948807 L127.986799,0 L256,74.1820085 L256,221.978632 L127.983954,295.72283 L0,222.211907 Z" fill="#000000"></path>
    </g>
</svg>
`;
