# minifill.js - the 5k polyfill (2.1k gzipped)
Ever wondered how to fix old browsers, improve scripting execution performance, simplify scripting and improve overall code quality all without using jQuery? The answer is polyfills.

[![jsDeliver](https://data.jsdelivr.com/v1/package/npm/minifill/badge)](https://www.jsdelivr.com/package/npm/minifill)
[![CDNJS](https://img.shields.io/cdnjs/v/minifill.svg?style=flat-square)](https://cdnjs.com/libraries/minifill)

The polyfills come from various sources to which I give full credits:
* [Financial Times](https://polyfill.io/) polyfill service
* Remy Sharp (the one who came with the name of `polyfill`)
* Mozilla Developer Network

TIP: My other libries such as [bootstrap.native](https://github.com/thednp/bootstrap.native) and [KUTE.js](https://github.com/thednp/kute.js) work best with minifill.

## A minimal polyfill with most essential stuff:
* <b>Document</b> - IE8 doesn't know who is `this.Document`, it's `this.HTMLDocument`
* <b>Window</b> - older Safari doesn't know who is `this.Window`, it's `this`
* <b>Element</b> - IE8 doesn't know who is `window.Element`, it's `window.HTMLElement`
* <b>Element.prototype.classList</b> - class manipulation mostly for IE8 and other HTML4 browsers, inspired by [Remy's](https://github.com/remy/polyfills/blob/master/classList.js) `classList`
* <b>Array.prototype.indexOf</b> - for string and array checks
* <b>window.getComputedStyle</b> - returns the true dimensions, spacing, or other supported properties
* <b>date.now</b> - uses the `new Date().getTime()` synthax to return the current time
* <b>window.performance.now</b> - uses the above `date.now` in a way to get more accuracy for the current time
* <b>Event</b> - implements `createEvent` or `createEventObject` to make HTML4 browsers as well as IE8-IE11 work properly with today's standard `Event`
* <b>Event.prototype</b> - `addEventListener`, `removeEventListener`, `dispatchEvent` for old / 'out of standard' browsers
* <b>CustomEvent</b> - makes use of the above `new Event()` for stuff like unsupported events types or user defined events like `my.custom.event`, this also works with IE8-IE11

## What is minifill.js for
* HTML4 browsers that don't support/recognize these methods/objects
* all IE browsers don't have any/enough support for the today's standard `Event`
* busting the myth of `write less, do more`

## How to use minifill.js
* Download or copy link from <a href="https://www.jsdelivr.com/projects/minifill">jsdelivr</a> or <a href="https://cdnjs.com/libraries/minifill">cdnjs</a>
* Add one of the following to your head tag

```markup
<!-- if you wanna use it locally -->
<script type="text/javascript" src="../assets/js/minifill.min.js"></script>

<!-- if you wanna use JSDELIVR -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/thednp/minifill@0.0.4/dist/minifill.min.js"></script>

<!-- if you wanna use CDNJS -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/minifill/0.0.4/minifill.min.js"></script>
```

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
window.addEventListener('scroll', function handlerWrapper(){
  handler();
  window.removeEventListener('scroll',handler,false);
},false);
```

## License
minifill.js is licensed under MIT License.
