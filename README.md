# minifill.js - the 6k polyfill

## A minimal polyfill for the web with most essential stuff:
* Document - IE8 doesn't know who is `this.Document`, it's `this.HTMLDocument`
* Element - IE8 doesn't know who is `window.HTMLElement`, it's `window.Element`
* indexOf - `Array.prototype.indexOf` for string and array checks
* getComputedStyle - `window.getComputedStyle()` returns the true dimensions, spacing, or other supported properties
* date.now - uses the `new Date().getTime()` synthax to return the current time
* window.performance.now - uses the above `date.now` in a way to get more accuracy for the current time
* requestAnimationFrame - the fallback for legacy browsers for `window.requestAnimationFrame` for better animation performance, see <a href="https://github.com/thednp/kute.js">KUTE.js</a>
* Event - this makes HTML4 browsers as well as IE8-IE11 work properly with `Event`, `addEventListener`,  `removeEventListener`,  `dispatchEvent`
* CustomEvent - makes use of the above `new Event()` for stuff like unsupported events types or user defined events like `my.custom.event`, see the carousel script for <a href="https://github.com/thednp/bootstrap.native/blob/master/lib/carousel-native.js#L113-L116">an example</a> on how to use, this also works with IE8-IE11

