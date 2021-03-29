/*!
  * minifill.js v0.0.16 (https://thednp.github.io/minifill/)
  * Copyright 2015-2021 © thednp
  * Licensed under MIT (https://github.com/thednp/minifill/blob/master/LICENSE)
  */
 "use strict";
if (!self.Document){ self.Document = self.HTMLDocument; }

if (!self.Window) {
  if (self.constructor) {
    self.Window = self.constructor;
  } else {
    (self.Window = self.constructor = new Function('return function Window() {}')()).prototype = self;
  }
}

if (!window.HTMLElement) { window.HTMLElement = window.Element; }

if (!window.Node) { window.Node = window.Element; }

(function (nativeDefineProperty) {
  var
      supportsAccessors = Object.prototype.hasOwnProperty.call(Object.prototype, '__defineGetter__'),
      ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine',
      ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';
  Object.defineProperty = function defineProperty(object, property, descriptor) {
    if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
      return nativeDefineProperty(object, property, descriptor);
    }
    if (object === null || !(object instanceof Object || typeof object === 'object')) {
      throw new TypeError('Object.defineProperty called on non-object');
    }
    if (!(descriptor instanceof Object)) {
      throw new TypeError('Property description must be an object');
    }
    var propertyString = String(property);
    var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;
    var getterType = 'get' in descriptor && typeof descriptor.get;
    var setterType = 'set' in descriptor && typeof descriptor.set;
    if (getterType) {
      if (getterType !== 'function') {
        throw new TypeError('Getter must be a function');
      }
      if (!supportsAccessors) {
        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
      }
      if (hasValueOrWritable) {
        throw new TypeError(ERR_VALUE_ACCESSORS);
      }
      Object.__defineGetter__.call(object, propertyString, descriptor.get);
    } else {
      object[propertyString] = descriptor.value;
    }
    if (setterType) {
      if (setterType !== 'function') {
        throw new TypeError('Setter must be a function');
      }
      if (!supportsAccessors) {
        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
      }
      if (hasValueOrWritable) {
        throw new TypeError(ERR_VALUE_ACCESSORS);
      }
      Object.__defineSetter__.call(object, propertyString, descriptor.set);
    }
    if ('value' in descriptor) {
      object[propertyString] = descriptor.value;
    }
    return object;
  };
}(Object.defineProperty));

if (typeof Object.assign !== 'function') {
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      var arguments$1 = arguments;
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments$1[index];
        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

if (typeof Object.create !== "function") {
  Object.create = function (proto, propertiesObject) {
      if (typeof proto !== 'object' && typeof proto !== 'function') {
          throw new TypeError('Object prototype may only be an Object: ' + proto);
      } else if (proto === null || typeof propertiesObject != 'undefined') {
          throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument, nor a second argument.");
      }
      function F() {}
      F.prototype = proto;
      return new F();
  };
}

if (!Object.keys) {
  Object.keys = function(obj) {
    var keys = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }
    return keys;
  };
}

if (!Function.prototype.bind) {
  Function.prototype.bind = function() {
    var slice = Array.prototype.slice,
        thatFunc = this,
        thatArg = arguments[0],
        args = slice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
      throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    return function(){
      var funcArgs = args.concat(slice.call(arguments));
      return thatFunc.apply(thatArg, funcArgs);
    };
  };
}

if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };
    return function from(arrayLike) {
      var C = this, items = Object(arrayLike);
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined, T;
      if (typeof mapFn !== 'undefined') {
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }
      var len = toLength(items.length);
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);
      var k = 0;
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      A.length = len;
      return A;
    }
  }());
}

if (!Array.prototype.every) {
  Array.prototype.every = function(callbackfn, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    var O = Object(this), len = O.length >>> 0;
    if (typeof callbackfn !== 'function' && Object.prototype.toString.call(callbackfn) !== '[object Function]') {
      throw new TypeError();
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        var testResult;
        kValue = O[k];
        if(T) { testResult = callbackfn.call(T, kValue, k, O); }
        else { testResult = callbackfn(kValue,k,O); }
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
      if (this == null) {
        throw TypeError('"this" is null or not defined');
      }
      var o = Object(this), len = o.length >>> 0;
      if (typeof predicate !== 'function') {
        throw TypeError('predicate must be a function');
      }
      var thisArg = arguments[1], k = 0;
      while (k < len) {
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        k++;
      }
      return undefined;
    },
    configurable: true,
    writable: true
  });
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function forEach (callback, thisArg) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    thisArg = thisArg || this;
    for (var i = 0, l = this.length; i !== l; ++i) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

if (!Array.prototype.flat) {
	Object.defineProperty(Array.prototype, 'flat', {
		configurable: true,
		value: function flat () {
			var depth = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
			return depth ? Array.prototype.reduce.call(this, function (acc, cur) {
				if (Array.isArray(cur)) {
					acc.push.apply(acc, flat.call(cur, depth - 1));
				} else {
					acc.push(cur);
				}
				return acc;
			}, []) : Array.prototype.slice.call(this);
		},
		writable: true
	});
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement  ) {
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }
    return false;
  };
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function indexOf(searchElement) {
    if (this === undefined || this === null) {
      throw new TypeError(this + 'is not an object');
    }
    var	arraylike = this instanceof String ? this.split('') : this,
      length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
      index = Number(arguments[1]) || 0;
    index = (index < 0 ? Math.max(length + index, 0) : index) - 1;
    while (++index < length) {
      if (index in arraylike && arraylike[index] === searchElement) {
        return index;
      }
    }
    return -1;
  };
}

if (!Array.prototype.map) {
  Array.prototype.map = function(callback) {
    var T, A, k;
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    var O = Object(this), len = O.length >>> 0;
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = arguments[1];
    }
    A = new Array(len);
    k = 0;
    while (k < len) {
      var kValue, mappedValue;
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
    return A;
  };
}

if (!Array.prototype.some) {
  Array.prototype.some = function(fun, thisArg) {
    if (this == null) {
      throw new TypeError('Array.prototype.some called on null or undefined');
    }
    if (typeof fun !== 'function') {
      throw new TypeError();
    }
    var t = Object(this);
    var len = t.length >>> 0;
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisArg, t[i], i, t)) {
        return true;
      }
    }
    return false;
  };
}

if (!Array.prototype.indexOf || !String.prototype.indexOf) {
  Array.prototype.indexOf = String.prototype.indexOf = function indexOf(searchElement) {
    if (this === undefined || this === null) {
      throw new TypeError(this + 'is undefined or null');
    }
    var	arraylike = this instanceof String ? this.split('') : this,
      length = Math.max(Math.min(arraylike.length, 9007199254740991), 0) || 0,
      index = Number(arguments[1]) || 0;
    index = (index < 0 ? Math.max(length + index, 0) : index) - 1;
    while (++index < length) {
      if (index in arraylike && arraylike[index] === searchElement) {
        return index;
      }
    }
    return -1;
  };
}

if (!window.addEventListener||!Window.prototype.addEventListener) {
  window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
    var	element = this,
      type = arguments[0],
      listener = arguments[1];
    if (!element._events) {	element._events = {}; }
    if (!element._events[type]) {
      element._events[type] = function (event) {
        var	list = element._events[event.type].list,
          events = list.slice(),
          index = -1,
          length = events.length,
          eventElement;
        event.preventDefault = function preventDefault() {
          if (event.cancelable !== false) {
            event.returnValue = false;
          }
        };
        event.stopPropagation = function stopPropagation() {
          event.cancelBubble = true;
        };
        event.stopImmediatePropagation = function stopImmediatePropagation() {
          event.cancelBubble = true;
          event.cancelImmediate = true;
        };
        event.currentTarget = element;
        event.relatedTarget = event.fromElement || null;
        event.target = event.target || event.srcElement || element;
        event.timeStamp = new Date().getTime();
        if (event.clientX) {
          event.pageX = event.clientX + document.documentElement.scrollLeft;
          event.pageY = event.clientY + document.documentElement.scrollTop;
        }
        while (++index < length && !event.cancelImmediate) {
          if (index in events) {
            eventElement = events[index];
            if (list.indexOf(eventElement) !== -1 && typeof eventElement === 'function') {
              eventElement.call(element, event);
            }
          }
        }
      };
      element._events[type].list = [];
      if (element.attachEvent) {
        element.attachEvent('on' + type, element._events[type]);
      }
    }
    element._events[type].list.push(listener);
  };
  window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
    var	element = this,
      type = arguments[0],
      listener = arguments[1],
      index;
    if (element._events && element._events[type] && element._events[type].list) {
      index = element._events[type].list.indexOf(listener);
      if (index !== -1) {
        element._events[type].list.splice(index, 1);
        if (!element._events[type].list.length) {
          if (element.detachEvent) {
            element.detachEvent('on' + type, element._events[type]);
          }
          delete element._events[type];
        }
      }
    }
  };
}

if (!document.getElementsByClassName) {
  document.getElementsByClassName = Element.prototype.getElementsByClassName = function getElementsByClassName(search) {
    return this.querySelectorAll("." + String(search).split(/\s+/).join('.'));
  };
}

if (!window.Event || !Window.prototype.Event) {
  window.Event = Window.prototype.Event = Document.prototype.Event = Element.prototype.Event = function Event(type, eventInitDict) {
    if (!type) { throw new Error('Not enough arguments'); }
    var event,
      bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false,
      cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
    if ( 'createEvent' in document ) {
      event = document.createEvent('Event');
      event.initEvent(type, bubbles, cancelable);
    } else {
      event = document.createEventObject();
      event.type = type;
      event.bubbles = bubbles;
      event.cancelable = cancelable;
    }
    return event;
  };
}

if ( !window.CustomEvent || !Window.prototype.CustomEvent) {
  window.CustomEvent = Window.prototype.CustomEvent = Document.prototype.CustomEvent = Element.prototype.CustomEvent = function CustomEvent(type, eventInitDict) {
    if (!type) {
      throw Error('TypeError: Failed to construct "CustomEvent": An event name must be provided.');
    }
    var event = new Event(type, eventInitDict);
    event.detail = eventInitDict && eventInitDict.detail || null;
    return event;
  };
}

if (!window.dispatchEvent||!Window.prototype.dispatchEvent||!Document.prototype.dispatchEvent||!Element.prototype.dispatchEvent) {
  window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
    if (!arguments.length) {
      throw new Error('Not enough arguments');
    }
    if (!event || typeof event.type !== 'string') {
      throw new Error('DOM Events Exception 0');
    }
    var element = this, type = event.type;
    try {
      if (!event.bubbles) {
        event.cancelBubble = true;
        var cancelBubbleEvent = function (event) {
          event.cancelBubble = true;
          (element || window).detachEvent('on' + type, cancelBubbleEvent);
        };
        this.attachEvent('on' + type, cancelBubbleEvent);
      }
      this.fireEvent('on' + type, event);
    } catch (error) {
      event.target = element;
      do {
        event.currentTarget = element;
        if ('_events' in element && typeof element._events[type] === 'function') {
          element._events[type].call(element, event);
        }
        if (typeof element['on' + type] === 'function') {
          element['on' + type].call(element, event);
        }
        element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
      } while (element && !event.cancelBubble);
    }
    return true;
  };
}

if (!Number.isFinite) {
  Number.isFinite = function(value) {
    return typeof value === 'number'
      && isFinite(value);
  };
}

if (!Number.isInteger) {
  Number.isInteger = function(value) {
    return typeof value === 'number'
      && isFinite(value)
      && Math.floor(value) === value;
  };
}

if (!Number.isNaN) {
  Number.isNaN = function(value) {
    return typeof value === 'number'
      && value !== value;
  };
}

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector;
}

if( !('classList' in Element.prototype) ) {
  var ClassLIST = function(elem){
    var classArr = (elem.getAttribute('class')||'').trim().split(/\s+/) || [];
    this.contains = function(classNAME){
      return classArr.indexOf(classNAME) > -1;
    };
    this.add = function(classNAME){
      if (!this.contains(classNAME)) {
        classArr.push(classNAME);
        elem.setAttribute('class', classArr.join(' '));
      }
    };
    this.remove = function(classNAME){
      if (this.contains(classNAME)) {
        classArr.splice(classArr.indexOf(classNAME),1);
        elem.setAttribute('class', classArr.join(' '));
      }
    };
    this.toggle = function(classNAME){
      if ( this.contains(classNAME) ) { this.remove(classNAME); }
      else { this.add(classNAME); }
    };
  };
  Object.defineProperty(Element.prototype, 'classList', {
    get: function () {
      return new ClassLIST(this)
    }
  });
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function closest(selector) {
    var node = this;
    while (node) {
      if (node.matches(selector)) { return node; }
      else { node = 'SVGElement' in window && node instanceof SVGElement ? node.parentNode : node.parentElement; }
    }
    return null;
  };
}

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    if (search instanceof RegExp) {
      throw TypeError('first argument must not be a RegExp');
    }
    if (start === undefined) { start = 0; }
    return this.indexOf(search, start) !== -1;
  };
}

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

if(!Date.now){
  Date.now = function now() {
    return new Date().getTime();
  };
}

if (!Node.prototype.contains) {
  Node.prototype.contains = function (el) {
    while (el = el.parentNode) {
      if (el === this) { return true; }
    }
    return false;
  };
}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

if (!window.getComputedStyle) {
  (function(){
    function getComputedStylePixel(element, property, fontSize) {
      var value = element.document && element.currentStyle[property].match(/([\d\.]+)(%|cm|em|in|mm|pc|pt|)/) || [0, 0, ''],
        size = value[1],
        suffix = value[2],
        rootSize;
      fontSize = !fontSize ? fontSize : /%|em/.test(suffix) && element.parentElement ? getComputedStylePixel(element.parentElement, 'fontSize', null) : 16;
      rootSize = property == 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;
      return suffix == '%' ? size / 100 * rootSize :
        suffix == 'cm' ? size * 0.3937 * 96 :
        suffix == 'em' ? size * fontSize :
        suffix == 'in' ? size * 96 :
        suffix == 'mm' ? size * 0.3937 * 96 / 10 :
        suffix == 'pc' ? size * 12 * 96 / 72 :
        suffix == 'pt' ? size * 96 / 72 :
        size;
    }
    function setShortStyleProperty(style, property) {
      var	borderSuffix = property == 'border' ? 'Width' : '',
        t = property + 'Top' + borderSuffix,
        r = property + 'Right' + borderSuffix,
        b = property + 'Bottom' + borderSuffix,
        l = property + 'Left' + borderSuffix;
      style[property] = (style[t] == style[r] && style[t] == style[b] && style[t] == style[l] ? [ style[t] ]
                      : style[t] == style[b] && style[l] == style[r] ? [ style[t], style[r] ]
                      : style[l] == style[r] ? [ style[t], style[r], style[b] ]
                      : [ style[t], style[r], style[b], style[l] ]).join(' ');
    }
    function CSSStyleDeclaration(element) {
      var style = this,
      currentStyle = element.currentStyle,
      fontSize = getComputedStylePixel(element, 'fontSize'),
      unCamelCase = function (match) {
        return '-' + match.toLowerCase();
      },
      property;
      for (property in currentStyle) {
        Array.prototype.push.call(style, property == 'styleFloat' ? 'float' : property.replace(/[A-Z]/, unCamelCase));
        if (property == 'width') {
          style[property] = element.offsetWidth + 'px';
        } else if (property == 'height') {
          style[property] = element.offsetHeight + 'px';
        } else if (property == 'styleFloat') {
          style.float = currentStyle[property];
        } else if (/margin.|padding.|border.+W/.test(property) && style[property] != 'auto') {
          style[property] = Math.round(getComputedStylePixel(element, property, fontSize)) + 'px';
        } else if (/^outline/.test(property)) {
          try {
            style[property] = currentStyle[property];
          } catch (error) {
            style.outlineColor = currentStyle.color;
            style.outlineStyle = style.outlineStyle || 'none';
            style.outlineWidth = style.outlineWidth || '0px';
            style.outline = [style.outlineColor, style.outlineWidth, style.outlineStyle].join(' ');
          }
        } else {
          style[property] = currentStyle[property];
        }
      }
      setShortStyleProperty(style, 'margin');
      setShortStyleProperty(style, 'padding');
      setShortStyleProperty(style, 'border');
      style.fontSize = Math.round(fontSize) + 'px';
    }
    CSSStyleDeclaration.prototype = {
      constructor: CSSStyleDeclaration,
      getPropertyPriority: function () {
        throw new Error('NotSupportedError: DOM Exception 9');
      },
      getPropertyValue: function (property) {
        return this[property.replace(/-\w/g, function (match) {
          return match[1].toUpperCase();
        })];
      },
      item: function (index) {
        return this[index];
      },
      removeProperty: function () {
        throw new Error('NoModificationAllowedError: DOM Exception 7');
      },
      setProperty: function () {
        throw new Error('NoModificationAllowedError: DOM Exception 7');
      },
      getPropertyCSSValue: function () {
        throw new Error('NotSupportedError: DOM Exception 9');
      }
    };
    window.getComputedStyle = function getComputedStyle(element) {
      return new CSSStyleDeclaration(element);
    };
  })();
}

if ( !self.performance ) {
  self.performance = {};
}
if ( !self.performance.now ){
  var nowOffset = Date.now();
  self.performance.now = function now(){
    return Date.now() - nowOffset;
  };
}

if (!window.requestAnimationFrame) {
  var	lastTime = Date.now();
  window.requestAnimationFrame = function (callback) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + 'is not a function');
    }
    var	currentTime = Date.now(),
      delay = 16 + lastTime - currentTime;
    if (delay < 0) { delay = 0;	}
    lastTime = currentTime;
    return setTimeout(function () {
      lastTime = Date.now();
      callback(performance.now());
    }, delay);
  };
  window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}
