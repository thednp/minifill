if (!Array.prototype.forEach) {
  Array.prototype.forEach = function forEach (callback, thisArg) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    thisArg = thisArg || this;
    for (var i = 0, l = this.length; i !== l; ++i) {
      callback.call(thisArg, this[i], i, this);
    }
  }
}