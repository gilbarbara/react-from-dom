// src/index.ts
import * as React from "react";

// src/helpers.ts
var styleToObject = (input) => {
  if (typeof input !== "string") {
    return {};
  }
  const attributes = input.replace(/\n/, "").split(/ ?; ?/);
  return attributes.reduce((acc, d) => {
    const [key, value] = d.split(/ ?: ?/);
    if (key && value) {
      const nextKey = key.replace(/-(\w)/g, (_$0, $1) => $1.toUpperCase());
      acc[key.startsWith("-") ? key : nextKey] = Number.isNaN(Number(value)) ? value : Number(value);
    }
    return acc;
  }, {});
};
function randomString(length = 6) {
  const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let index = length; index > 0; --index) {
    result += characters[Math.round(Math.random() * (characters.length - 1))];
  }
  return result;
}
var noTextChildNodes = [
  "br",
  "col",
  "colgroup",
  "dl",
  "hr",
  "iframe",
  "img",
  "input",
  "link",
  "menuitem",
  "meta",
  "ol",
  "param",
  "select",
  "table",
  "tbody",
  "tfoot",
  "thead",
  "tr",
  "ul",
  "wbr"
];
var possibleStandardNames = {
  // HTML
  "accept-charset": "acceptCharset",
  acceptcharset: "acceptCharset",
  accesskey: "accessKey",
  allowfullscreen: "allowFullScreen",
  autocapitalize: "autoCapitalize",
  autocomplete: "autoComplete",
  autocorrect: "autoCorrect",
  autofocus: "autoFocus",
  autoplay: "autoPlay",
  autosave: "autoSave",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  charset: "charSet",
  class: "className",
  classid: "classID",
  classname: "className",
  colspan: "colSpan",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  controlslist: "controlsList",
  crossorigin: "crossOrigin",
  dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
  datetime: "dateTime",
  defaultchecked: "defaultChecked",
  defaultvalue: "defaultValue",
  enctype: "encType",
  for: "htmlFor",
  formmethod: "formMethod",
  formaction: "formAction",
  formenctype: "formEncType",
  formnovalidate: "formNoValidate",
  formtarget: "formTarget",
  frameborder: "frameBorder",
  hreflang: "hrefLang",
  htmlfor: "htmlFor",
  httpequiv: "httpEquiv",
  "http-equiv": "httpEquiv",
  icon: "icon",
  innerhtml: "innerHTML",
  inputmode: "inputMode",
  itemid: "itemID",
  itemprop: "itemProp",
  itemref: "itemRef",
  itemscope: "itemScope",
  itemtype: "itemType",
  keyparams: "keyParams",
  keytype: "keyType",
  marginwidth: "marginWidth",
  marginheight: "marginHeight",
  maxlength: "maxLength",
  mediagroup: "mediaGroup",
  minlength: "minLength",
  nomodule: "noModule",
  novalidate: "noValidate",
  playsinline: "playsInline",
  radiogroup: "radioGroup",
  readonly: "readOnly",
  referrerpolicy: "referrerPolicy",
  rowspan: "rowSpan",
  spellcheck: "spellCheck",
  srcdoc: "srcDoc",
  srclang: "srcLang",
  srcset: "srcSet",
  tabindex: "tabIndex",
  typemustmatch: "typeMustMatch",
  usemap: "useMap",
  // SVG
  accentheight: "accentHeight",
  "accent-height": "accentHeight",
  alignmentbaseline: "alignmentBaseline",
  "alignment-baseline": "alignmentBaseline",
  allowreorder: "allowReorder",
  arabicform: "arabicForm",
  "arabic-form": "arabicForm",
  attributename: "attributeName",
  attributetype: "attributeType",
  autoreverse: "autoReverse",
  basefrequency: "baseFrequency",
  baselineshift: "baselineShift",
  "baseline-shift": "baselineShift",
  baseprofile: "baseProfile",
  calcmode: "calcMode",
  capheight: "capHeight",
  "cap-height": "capHeight",
  clippath: "clipPath",
  "clip-path": "clipPath",
  clippathunits: "clipPathUnits",
  cliprule: "clipRule",
  "clip-rule": "clipRule",
  colorinterpolation: "colorInterpolation",
  "color-interpolation": "colorInterpolation",
  colorinterpolationfilters: "colorInterpolationFilters",
  "color-interpolation-filters": "colorInterpolationFilters",
  colorprofile: "colorProfile",
  "color-profile": "colorProfile",
  colorrendering: "colorRendering",
  "color-rendering": "colorRendering",
  contentscripttype: "contentScriptType",
  contentstyletype: "contentStyleType",
  diffuseconstant: "diffuseConstant",
  dominantbaseline: "dominantBaseline",
  "dominant-baseline": "dominantBaseline",
  edgemode: "edgeMode",
  enablebackground: "enableBackground",
  "enable-background": "enableBackground",
  externalresourcesrequired: "externalResourcesRequired",
  fillopacity: "fillOpacity",
  "fill-opacity": "fillOpacity",
  fillrule: "fillRule",
  "fill-rule": "fillRule",
  filterres: "filterRes",
  filterunits: "filterUnits",
  floodopacity: "floodOpacity",
  "flood-opacity": "floodOpacity",
  floodcolor: "floodColor",
  "flood-color": "floodColor",
  fontfamily: "fontFamily",
  "font-family": "fontFamily",
  fontsize: "fontSize",
  "font-size": "fontSize",
  fontsizeadjust: "fontSizeAdjust",
  "font-size-adjust": "fontSizeAdjust",
  fontstretch: "fontStretch",
  "font-stretch": "fontStretch",
  fontstyle: "fontStyle",
  "font-style": "fontStyle",
  fontvariant: "fontVariant",
  "font-variant": "fontVariant",
  fontweight: "fontWeight",
  "font-weight": "fontWeight",
  glyphname: "glyphName",
  "glyph-name": "glyphName",
  glyphorientationhorizontal: "glyphOrientationHorizontal",
  "glyph-orientation-horizontal": "glyphOrientationHorizontal",
  glyphorientationvertical: "glyphOrientationVertical",
  "glyph-orientation-vertical": "glyphOrientationVertical",
  glyphref: "glyphRef",
  gradienttransform: "gradientTransform",
  gradientunits: "gradientUnits",
  horizadvx: "horizAdvX",
  "horiz-adv-x": "horizAdvX",
  horizoriginx: "horizOriginX",
  "horiz-origin-x": "horizOriginX",
  imagerendering: "imageRendering",
  "image-rendering": "imageRendering",
  kernelmatrix: "kernelMatrix",
  kernelunitlength: "kernelUnitLength",
  keypoints: "keyPoints",
  keysplines: "keySplines",
  keytimes: "keyTimes",
  lengthadjust: "lengthAdjust",
  letterspacing: "letterSpacing",
  "letter-spacing": "letterSpacing",
  lightingcolor: "lightingColor",
  "lighting-color": "lightingColor",
  limitingconeangle: "limitingConeAngle",
  markerend: "markerEnd",
  "marker-end": "markerEnd",
  markerheight: "markerHeight",
  markermid: "markerMid",
  "marker-mid": "markerMid",
  markerstart: "markerStart",
  "marker-start": "markerStart",
  markerunits: "markerUnits",
  markerwidth: "markerWidth",
  maskcontentunits: "maskContentUnits",
  maskunits: "maskUnits",
  numoctaves: "numOctaves",
  overlineposition: "overlinePosition",
  "overline-position": "overlinePosition",
  overlinethickness: "overlineThickness",
  "overline-thickness": "overlineThickness",
  paintorder: "paintOrder",
  "paint-order": "paintOrder",
  "panose-1": "panose1",
  pathlength: "pathLength",
  patterncontentunits: "patternContentUnits",
  patterntransform: "patternTransform",
  patternunits: "patternUnits",
  pointerevents: "pointerEvents",
  "pointer-events": "pointerEvents",
  pointsatx: "pointsAtX",
  pointsaty: "pointsAtY",
  pointsatz: "pointsAtZ",
  preservealpha: "preserveAlpha",
  preserveaspectratio: "preserveAspectRatio",
  primitiveunits: "primitiveUnits",
  refx: "refX",
  refy: "refY",
  renderingintent: "renderingIntent",
  "rendering-intent": "renderingIntent",
  repeatcount: "repeatCount",
  repeatdur: "repeatDur",
  requiredextensions: "requiredExtensions",
  requiredfeatures: "requiredFeatures",
  shaperendering: "shapeRendering",
  "shape-rendering": "shapeRendering",
  specularconstant: "specularConstant",
  specularexponent: "specularExponent",
  spreadmethod: "spreadMethod",
  startoffset: "startOffset",
  stddeviation: "stdDeviation",
  stitchtiles: "stitchTiles",
  stopcolor: "stopColor",
  "stop-color": "stopColor",
  stopopacity: "stopOpacity",
  "stop-opacity": "stopOpacity",
  strikethroughposition: "strikethroughPosition",
  "strikethrough-position": "strikethroughPosition",
  strikethroughthickness: "strikethroughThickness",
  "strikethrough-thickness": "strikethroughThickness",
  strokedasharray: "strokeDasharray",
  "stroke-dasharray": "strokeDasharray",
  strokedashoffset: "strokeDashoffset",
  "stroke-dashoffset": "strokeDashoffset",
  strokelinecap: "strokeLinecap",
  "stroke-linecap": "strokeLinecap",
  strokelinejoin: "strokeLinejoin",
  "stroke-linejoin": "strokeLinejoin",
  strokemiterlimit: "strokeMiterlimit",
  "stroke-miterlimit": "strokeMiterlimit",
  strokewidth: "strokeWidth",
  "stroke-width": "strokeWidth",
  strokeopacity: "strokeOpacity",
  "stroke-opacity": "strokeOpacity",
  suppresscontenteditablewarning: "suppressContentEditableWarning",
  suppresshydrationwarning: "suppressHydrationWarning",
  surfacescale: "surfaceScale",
  systemlanguage: "systemLanguage",
  tablevalues: "tableValues",
  targetx: "targetX",
  targety: "targetY",
  textanchor: "textAnchor",
  "text-anchor": "textAnchor",
  textdecoration: "textDecoration",
  "text-decoration": "textDecoration",
  textlength: "textLength",
  textrendering: "textRendering",
  "text-rendering": "textRendering",
  underlineposition: "underlinePosition",
  "underline-position": "underlinePosition",
  underlinethickness: "underlineThickness",
  "underline-thickness": "underlineThickness",
  unicodebidi: "unicodeBidi",
  "unicode-bidi": "unicodeBidi",
  unicoderange: "unicodeRange",
  "unicode-range": "unicodeRange",
  unitsperem: "unitsPerEm",
  "units-per-em": "unitsPerEm",
  unselectable: "unselectable",
  valphabetic: "vAlphabetic",
  "v-alphabetic": "vAlphabetic",
  vectoreffect: "vectorEffect",
  "vector-effect": "vectorEffect",
  vertadvy: "vertAdvY",
  "vert-adv-y": "vertAdvY",
  vertoriginx: "vertOriginX",
  "vert-origin-x": "vertOriginX",
  vertoriginy: "vertOriginY",
  "vert-origin-y": "vertOriginY",
  vhanging: "vHanging",
  "v-hanging": "vHanging",
  videographic: "vIdeographic",
  "v-ideographic": "vIdeographic",
  viewbox: "viewBox",
  viewtarget: "viewTarget",
  vmathematical: "vMathematical",
  "v-mathematical": "vMathematical",
  wordspacing: "wordSpacing",
  "word-spacing": "wordSpacing",
  writingmode: "writingMode",
  "writing-mode": "writingMode",
  xchannelselector: "xChannelSelector",
  xheight: "xHeight",
  "x-height": "xHeight",
  xlinkactuate: "xlinkActuate",
  "xlink:actuate": "xlinkActuate",
  xlinkarcrole: "xlinkArcrole",
  "xlink:arcrole": "xlinkArcrole",
  xlinkhref: "xlinkHref",
  "xlink:href": "xlinkHref",
  xlinkrole: "xlinkRole",
  "xlink:role": "xlinkRole",
  xlinkshow: "xlinkShow",
  "xlink:show": "xlinkShow",
  xlinktitle: "xlinkTitle",
  "xlink:title": "xlinkTitle",
  xlinktype: "xlinkType",
  "xlink:type": "xlinkType",
  xmlbase: "xmlBase",
  "xml:base": "xmlBase",
  xmllang: "xmlLang",
  "xml:lang": "xmlLang",
  "xml:space": "xmlSpace",
  xmlnsxlink: "xmlnsXlink",
  "xmlns:xlink": "xmlnsXlink",
  xmlspace: "xmlSpace",
  ychannelselector: "yChannelSelector",
  zoomandpan: "zoomAndPan",
  // event handlers
  onblur: "onBlur",
  onchange: "onChange",
  onclick: "onClick",
  oncontextmenu: "onContextMenu",
  ondoubleclick: "onDoubleClick",
  ondrag: "onDrag",
  ondragend: "onDragEnd",
  ondragenter: "onDragEnter",
  ondragexit: "onDragExit",
  ondragleave: "onDragLeave",
  ondragover: "onDragOver",
  ondragstart: "onDragStart",
  ondrop: "onDrop",
  onerror: "onError",
  onfocus: "onFocus",
  oninput: "onInput",
  oninvalid: "onInvalid",
  onkeydown: "onKeyDown",
  onkeypress: "onKeyPress",
  onkeyup: "onKeyUp",
  onload: "onLoad",
  onmousedown: "onMouseDown",
  onmouseenter: "onMouseEnter",
  onmouseleave: "onMouseLeave",
  onmousemove: "onMouseMove",
  onmouseout: "onMouseOut",
  onmouseover: "onMouseOver",
  onmouseup: "onMouseUp",
  onscroll: "onScroll",
  onsubmit: "onSubmit",
  ontouchcancel: "onTouchCancel",
  ontouchend: "onTouchEnd",
  ontouchmove: "onTouchMove",
  ontouchstart: "onTouchStart",
  onwheel: "onWheel"
};

// src/index.ts
function getReactNode(node, options) {
  const { key, level, ...rest } = options;
  switch (node.nodeType) {
    case 1: {
      return React.createElement(
        parseName(node.nodeName),
        parseAttributes(node, key),
        parseChildren(node.childNodes, level, rest)
      );
    }
    case 3: {
      const nodeText = node.nodeValue?.toString() || "";
      if (!rest.allowWhiteSpaces && /^\s+$/.test(nodeText) && !/[\u00A0\u202F]/.test(nodeText)) {
        return null;
      }
      if (!node.parentNode) {
        return nodeText;
      }
      const parentNodeName = node.parentNode.nodeName.toLowerCase();
      if (noTextChildNodes.includes(parentNodeName)) {
        if (/\S/.test(nodeText)) {
          console.warn(
            `A textNode is not allowed inside '${parentNodeName}'. Your text "${nodeText}" will be ignored`
          );
        }
        return null;
      }
      return nodeText;
    }
    case 8: {
      return null;
    }
    case 11: {
      return parseChildren(node.childNodes, level, options);
    }
    default: {
      return null;
    }
  }
}
function parseAttributes(node, reactKey) {
  const attributes = {
    key: reactKey
  };
  if (node instanceof Element) {
    const nodeClassNames = node.getAttribute("class");
    if (nodeClassNames) {
      attributes.className = nodeClassNames;
    }
    [...node.attributes].forEach((d) => {
      switch (d.name) {
        case "class":
          break;
        case "style":
          attributes[d.name] = styleToObject(d.value);
          break;
        case "allowfullscreen":
        case "allowpaymentrequest":
        case "async":
        case "autofocus":
        case "autoplay":
        case "checked":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "formnovalidate":
        case "hidden":
        case "ismap":
        case "itemscope":
        case "loop":
        case "multiple":
        case "muted":
        case "nomodule":
        case "novalidate":
        case "open":
        case "readonly":
        case "required":
        case "reversed":
        case "selected":
        case "typemustmatch":
          attributes[possibleStandardNames[d.name] || d.name] = true;
          break;
        default:
          attributes[possibleStandardNames[d.name] || d.name] = d.value;
      }
    });
  }
  return attributes;
}
function parseChildren(childNodeList, level, options) {
  const children = [...childNodeList].map(
    (node, index) => convertFromNode(node, {
      ...options,
      index,
      level: level + 1
    })
  ).filter(Boolean);
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
function convertFromNode(input, options = {}) {
  if (!input || !(input instanceof Node)) {
    return null;
  }
  const { actions = [], index = 0, level = 0, randomKey } = options;
  let node = input;
  let key = `${level}-${index}`;
  const result = [];
  if (randomKey && level === 0) {
    key = `${randomString()}-${key}`;
  }
  if (Array.isArray(actions)) {
    actions.forEach((action) => {
      if (action.condition(node, key, level)) {
        if (typeof action.pre === "function") {
          node = action.pre(node, key, level);
          if (!(node instanceof Node)) {
            node = input;
            if (process.env.NODE_ENV !== "production") {
              console.warn(
                "The `pre` method always must return a valid DomNode (instanceof Node) - your modification will be ignored (Hint: if you want to render a React-component, use the `post` method instead)"
              );
            }
          }
        }
        if (typeof action.post === "function") {
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
function convertFromString(input, options = {}) {
  if (!input || typeof input !== "string") {
    return null;
  }
  const {
    includeAllNodes = false,
    nodeOnly = false,
    selector = "body > *",
    type = "text/html"
  } = options;
  try {
    const parser = new DOMParser();
    const document = parser.parseFromString(input, type);
    if (includeAllNodes) {
      const { childNodes } = document.body;
      if (nodeOnly) {
        return childNodes;
      }
      return [...childNodes].map((node2) => convertFromNode(node2, options));
    }
    const node = document.querySelector(selector) || document.body.childNodes[0];
    if (!(node instanceof Node)) {
      throw new TypeError("Error parsing input");
    }
    if (nodeOnly) {
      return node;
    }
    return convertFromNode(node, options);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }
  return null;
}
function convert(input, options = {}) {
  if (typeof input === "string") {
    return convertFromString(input, options);
  }
  if (input instanceof Node) {
    return convertFromNode(input, options);
  }
  return null;
}
export {
  convertFromNode,
  convertFromString,
  convert as default
};
//# sourceMappingURL=index.mjs.map