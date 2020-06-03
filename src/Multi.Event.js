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
  }
}
