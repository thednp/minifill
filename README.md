# minifill.js - the 5k polyfill for IE < 10

## A minimal polyfill for the web with most essential stuff:
* Document - IE8 doesn't know who is `this.Document`, it's `this.HTMLDocument`
* Element - IE8 doesn't know who is `window.HTMLElement`, it's `window.Element`
* indexOf - `Array.prototype.indexOf` for string and array checks
* getComputedStyle - `window.getComputedStyle()` returns the true dimensions, spacing, and other suppored properties
* date.now - uses the `new Date().getTime()` synthax to return the current time
* window.performance.now - uses the above `date.now` in a way to get more accuracy for the current time
* requestAnimationFrame - the fallback for legacy browsers for `window.requestAnimationFrame` for better animation performance, see <a href="">KUTE.js</a>
* Event - `Event`, `addEventListener`,  `removeEventListener`,  `dispatchEvent`
* CustomEvent - for stuff like unsupported events or user defined events like `my.custom.event`

