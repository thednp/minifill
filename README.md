# minifill.js - the essential polyfill
Ever wondered how to fix old browsers, improve scripting execution performance, simplify scripting and improve overall code quality all without using jQuery? The answer is polyfills.

[![jsDeliver](https://data.jsdelivr.com/v1/package/npm/minifill/badge)](https://www.jsdelivr.com/package/npm/minifill)
[![CDNJS](https://img.shields.io/cdnjs/v/minifill.svg?style=flat-square)](https://cdnjs.com/libraries/minifill)

The polyfills come from various sources to which I give full credits:
* [Financial Times](https://polyfill.io/) polyfill service
* Remy Sharp (the one who came with the name of `polyfill`)
* Mozilla Developer Network

When you use the above service, there is a certain amount of delay involved when executing the polyfill queries, as well as some unexplained in page script execution lags, a case where it's best to just host your own polyfills, and here comes minifill handy.

TIP: My other libraries such as [bootstrap.native](https://github.com/thednp/bootstrap.native) and [KUTE.js](https://github.com/thednp/kute.js) work best with minifill.


## A minimal polyfill with most essential stuff:

* **this.Document** - IE8 doesn't know who is `this.Document`, it's `this.HTMLDocument`
* **this.Window** - older Safari doesn't know who is `this.Window`, it's `this`
* **window.HTMLElement** - IE8 doesn't know who is `window.Element`, it's `window.HTMLElement`
* **window.Node** - IE8 doesn't know who is `window.Node`, it's `window.Element`

* **Object.defineProperty** - important for the below `classList`
* **Object.keys** - returns an array populated with the object's keys

* **Array.from** - creates a new, shallow-copied `Array` instance from an array-like or iterable object, usually `NodeList`, `HTMLCollection`
* **Array.prototype.every** - tests whether all elements in the array pass the test implemented by the provided function
* **Array.prototype.find** - returns the value of the first element in the provided array that satisfies the provided testing function
* **Array.prototype.forEach** - executes a provided function once for each array element. 
* **Array.prototype.flat** - creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
* **Array.prototype.includes** - determines whether an array includes a certain value among its entries
* **Array.prototype.map** - *creates a new array* populated with the results of calling a provided function on every element in the calling array
* **Array.prototype.some** - tests whether at least one element in the array passes the test implemented by the provided function

* **Multi.prototype.indexOf** - checks inside strings and arrays for particular values 
* **Multi.addEventListener** - uses the deprecated `attachEvent` API to help legacy browsers
* **Multi.getElementsByClassName** - a `querySelectorAll` based polyfill for `document`/`Element`
* **Multi.Event** - the complete polyfill, implements `createEvent` or `createEventObject` to make HTML4 browsers as well as IE8-IE11 work properly with today's standard `Event`
* **Multi.CustomEvent** - the complete polyfill, makes use of the above `new Event()` for stuff like unsupported events types or user defined events like `my.custom.event`, this also works with IE8-IE11
* **Multi.dispatchEvent** - uses the deprecated `fireEvent` API on legacy browsers

* **Element.prototype.matches** - the complete `matches` polyfill
* **Element.prototype.classList** - class manipulation mostly for IE8 and other HTML4 browsers, inspired by [Remy's](https://github.com/remy/polyfills/blob/master/classList.js) `classList`
* **Element.prototype.closest** - uses the above `matches` to find the closest parent element that matches the selector

* **Date.now** - required by the below `requestAnimationFrame` and other stuff, uses the `new Date().getTime()` synthax to return the current time
* **String.prototype.includes** - a quick fill by MDN
* **String.prototype.trim** - yeah `trim` eventually
* **Node.prototype.contains** - checks for parental relation between elements
* **NodeList.prototype.forEach** - simple `forEach` polyfill, executes a provided function once for each element in a `Nodelist`.

* **window.getComputedStyle** - the complete `getComputedStyle` polyfill, returns the true dimensions, spacing, or other browser supported properties
* **window.performance.now** - required for KUTE.js and other stuff, when accuracy is required for the current time
* **window.requestAnimationFrame** - also required for KUTE.js


## What is minifill.js for
* HTML4 browsers that don't support/recognize these methods/objects
* all IE browsers don't have any/enough support for the today's standard `Event`
* busting the myth of `write less, do more`

## How to use minifill.js
* Download or copy link from <a href="https://www.jsdelivr.com/projects/minifill">jsdelivr</a> or <a href="https://cdnjs.com/libraries/minifill">cdnjs</a>
* Add one of the following to your head tag

```html
<!-- if you wanna use it locally -->
<script type="text/javascript" src="../assets/js/minifill.min.js"></script>

<!-- if you wanna use JSDELIVR -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/thednp/minifill@0.0.4/dist/minifill.min.js"></script>

<!-- if you wanna use CDNJS -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/minifill/0.0.4/minifill.min.js"></script>
```


## Custom builds
You can create your own builds specific to your application bundles, but make sure to keep the same order as for the `minifill.js`.
* create a new file `/path-to/your-file.js`
* copy contents of the `minifill.js`
* edit out the polyfills you don't need
* run `npm run custom INPUTFILE:path-to/your-file.js,OUTPUTFILE:path-to/your-build.js,FORMAT:esm,MIN:false`
  **  `INPUTFILE` - allows you to specify the source file path
  **  `OUTPUTFILE` - allows you to specify the output file path
  **  `MIN` - when true, it will compress the output
  **  `FORMAT` - umd|cjs|esm and any format you specify or configure your rollup for


## Examples
<b>Class Manipulation</b>

```javascript
// check for a class
var docHasClass = myElement.classList.contains('someClass'); // return true|false

// add a class
myElement.classList.add('someClass');

// remove a class
myElement.classList.remove('someClass');

// toggle a class
myElement.classList.toggle('someClass');
```

<b>String / Array checks</b>

```javascript
// indexOf
string.indexOf('looking for this'); // returns the index of 'looking for this' within the string OR -1 if not found
// or
array.indexOf(myElement); // returns the index of an element within the array OR -1 if not found
```

<b>Get current computed style for an element</b>

```javascript
// getComputedStyle
var elStyle = window.getComputedStyle(myElement); // returns the current computed style for myElement
var width = elStyle.width; // returns the current computed width
```

<b>Get the exact current time</b>

```javascript
// window.performance.now
var timeNow = window.performance.now(); // returns a number with the exact current time
```

<b>Create Native Events</b><br>
Instead of writing

```javascript
// typical triggering events these days
if ( 'createEventObject' in document ) {
	myChangeEvent = document.createEventObject();		
	myChangeEvent.type = type;
	myChangeEvent.bubbles = bubbles;
	myChangeEvent.cancelable = cancelable;
} else {
	myChangeEvent = document.createEvent('Event');			
	myChangeEvent.initEvent(type, bubbles, cancelable);	
}
```
you can simply write

```javascript
// Event
var myChangeEvent = new Event('change'); // creates 'change' Event Element / Object (legacy browsers)
```
to do it all for you.

<b>Create Custom Events</b>

```javascript
// CustomEvent
var myCustomEvent = new CustomEvent('my.custom.event.name'); // creates 'my.custom.event.name' CustomEvent Element / Object (legacy browsers)
```

<b>Triggering/Dispatching Events</b>

```javascript
myElement.dispatchEvent(myChangeEvent); // dispatches the native 'change' event for myElement, defined above
myElement.dispatchEvent(myCustomEvent); // dispatches a CustomEvent event for myElement, defined above
```

<b>Adding Event Handlers</b>

```javascript
// addEventListener
window.addEventListener('scroll',handler,false); // adds a new handler to the window `scroll` event
// OR
myButton.addEventListener('click',handler,false); // adds a 'click' (or any other supported/custom event) handler for any HTML element
```

<b>Removing Event Handlers</b>

```javascript
// removeEventListener
window.removeEventListener('scroll',handler,false); // removes a handler bound to the window `scroll` event
// OR
myButton.removeEventListener('click',handler,false); // removes a handler bound to 'click' (or any other supported/custom event) handler for any HTML element
```
NOTE: if the `removeEventListener` call is not in the same context with `addEventListener`, it will produce no effect. If you would like to autoremove a handler, you would need to write your code like this:

```javascript
window.addEventListener('scroll', function handlerWrapper(e){
  handler(e);
  window.removeEventListener('scroll', handlerWrapper, false);
},false);
```

## License
minifill.js is licensed under MIT License.
