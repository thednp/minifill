if (!document.getElementsByClassName) {
  document.getElementsByClassName = Element.prototype.getElementsByClassName = function getElementsByClassName(search) {
    return this.querySelectorAll("." + String(search).split(/\s+/).join('.'));
  }
  // Element.prototype.getElementsByClassName = getElementsByClassName
}