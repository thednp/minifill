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
  }
}