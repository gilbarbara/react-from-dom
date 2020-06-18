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

export const iframe =
  '<iframe width="480" height="270" src="https://www.youtube.com/embed/kemF0xdmsaY?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

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
    <code>throw new Error('Fail');</code>
    <dl>Text</dl>
  </div>
  <div class="panel-footer">
    Footer
  </div>
</div>
`;

export const utf8 = `
<svg>
  <tspan baseline-shift="0%" font-family="斯柯达体" font-size="20" fill="#E4E9F2" xml:space="preserve">眼观：仪表盘、车辆</tspan>
</svg>
`;

export const svg = `
<svg width="20px" height="6px" viewBox="0 0 20 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
    <defs>
        <path d="M3,6 C1.34314575,6 0,4.65685425 0,3 C0,1.34314575 1.34314575,0 3,0 C4.65685425,0 6,1.34314575 6,3 C6,4.65685425 4.65685425,6 3,6 Z M10,6 C8.34314575,6 7,4.65685425 7,3 C7,1.34314575 8.34314575,0 10,0 C11.6568542,0 13,1.34314575 13,3 C13,4.65685425 11.6568542,6 10,6 Z M17,6 C15.3431458,6 14,4.65685425 14,3 C14,1.34314575 15.3431458,0 17,0 C18.6568542,0 20,1.34314575 20,3 C20,4.65685425 18.6568542,6 17,6 Z" id="path-1"></path>
        <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="166.666667%" gradientTransform="translate(0.500000,0.500000),scale(0.300000,1.000000),rotate(180.000000),translate(-0.500000,-0.500000)" id="radialGradient-3">
            <stop stop-color="#F8E71C" offset="0%"></stop>
            <stop stop-color="#FF0044" offset="100%"></stop>
        </radialGradient>
    </defs>
    <g>
        <mask id="mask-2" style="fill: #fff;">
            <use xlink:href="#path-1"></use>
        </mask>
        <polygon fill="url(#radialGradient-3)" fill-rule="nonzero" mask="url(#mask-2)" points="0 0 20 0 20 6 0 6" style="z-index: 100"></polygon>
    </g>
</svg>
`;

export const svgWithStyleAndScript = `
<svg width="600px" height="400px" viewBox="0 0 600 400" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
    <style>
      @import url(main.css);
    </style>
    <style>
      circle:last-child {
        fill: green;
      }
    </style>
    <script type="text/javascript">
      <![CDATA[
        function change(evt) {
          var target = evt.target;
          var radius = target.getAttribute("r");

          if (radius == 200) {
            radius = 100;
          } else {
            radius = 200;
          }

          target.setAttribute("r", radius);
        }
      ]]>
    </script>
    <g>
        <circle fill="#DDDDDD" cx="200" cy="200" r="200" onclick="change(evt)"></circle>
        <circle fill-opacity="0.8" fill="#000000" cx="400" cy="200" r="200"></circle>
    </g>
</svg>
`;
