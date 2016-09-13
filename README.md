# minifill.js - the 6k polyfill (2.1k gzipped)
Ever wondered how to fix old browsers, improve scripting execution performance, simplify scripting and improve overall code quality all without using jQuery? The answer is polyfills.

## A minimal polyfill with most essential stuff:
* <b>Document</b> - IE8 doesn't know who is `this.Document`, it's `this.HTMLDocument`
* <b>Window</b> - older Safari doesn't know who is `this.Window`, it's `this`
* <b>Element</b> - IE8 doesn't know who is `window.Element`, it's `window.HTMLElement` 
* <b>indexOf</b> - `Array.prototype.indexOf` for string and array checks
* <b>getComputedStyle</b> - `window.getComputedStyle()` returns the true dimensions, spacing, or other supported properties
* <b>date.now</b> - uses the `new Date().getTime()` synthax to return the current time
* <b>window.performance.now</b> - uses the above `date.now` in a way to get more accuracy for the current time
* <b>Event</b> - implements `createEvent` or `createEventObject` to make HTML4 browsers as well as IE8-IE11 work properly with today's standard `Event`
* <b>Event.prototype</b> - `addEventListener`,  `removeEventListener`,  `dispatchEvent` for old / 'out of standard' browsers
* <b>CustomEvent</b> - makes use of the above `new Event()` for stuff like unsupported events types or user defined events like `my.custom.event`, see the carousel script for <a href="https://github.com/thednp/bootstrap.native/blob/master/lib/carousel-native.js#L117-L120">an example</a> on how to use, this also works with IE8-IE11

## What is minifill.js for
* HTML4 browsers that don't support/recognize these methods/objects
* all IE browsers don't have any/enough support for the today's standard `Event`
* busting the myth of `write less, do more`

## How to use minifill.js
* Download or copy link from <a href="https://www.jsdelivr.com/projects/minifill">jsdelivr</a> or <a href="https://cdnjs.com/libraries/minifill">cdnjs</a>
* Add one of the following to your head tag
```
<!-- if you wanna use it locally -->
<script type="text/javascript" src="../assets/js//minifill.min.js"></script>

<!-- if you wanna use JSDELIVR -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/minifill/0.0.3/minifill.min.js"></script>

<!-- if you wanna use CDNJS -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/minifill/0.0.3/minifill.min.js"></script>
```

## Examples
<b>String / Array checks</b>
```
// indexOf
string.indexOf('looking for this'); // returns the index of 'looking for this' within the string OR -1 if not found
// or
array.indexOf(myElement); // returns the index of an element within the array OR -1 if not found
```

<b>Get current computed style for an element</b>
```
// getComputedStyle
var elStyle = window.getComputedStyle(myElement); // returns the current computed style for myElement
var width = elStyle.width; // returns the current computed width
```

<b>Get the exact current time</b>
```
// window.performance.now
var timeNow = window.performance.now(); // returns a number with the exact current time
```

<b>Create Native Events</b><br>
Instead of writing
```
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
```
// Event
var myChangeEvent = new Event('change'); // creates 'change' Event Element / Object (legacy browsers)
```
to do it all for you.

<b>Create Custom Events</b>
```
// CustomEvent
var myCustomEvent = new CustomEvent('my.custom.event.name'); // creates 'my.custom.event.name' CustomEvent Element / Object (legacy browsers)
```

<b>Triggering/Dispatching Events</b>
```
myElement.dispatchEvent(myChangeEvent); // dispatches the native 'change' event for myElement, defined above
myElement.dispatchEvent(myCustomEvent); // dispatches a CustomEvent event for myElement, defined above
```

<b>Adding Event Handlers</b>
```
// addEventListener
window.addEventListener('scroll',handler,false); // adds a new handler to the window `scroll` event
//OR
myButton.addEventListener('click',handler,false); // adds a 'click' (or any other supported/custom event) handler for any HTML element
```

<b>Removing Event Handlers</b>
```
// removeEventListener
window.removeEventListener('scroll',handler,false); // removes a handler bound to the window `scroll` event
//OR
myButton.removeEventListener('click',handler,false); // removes a handler bound to 'click' (or any other supported/custom event) handler for any HTML element
```

## License
minifill.js is licensed under MIT License.
