if (!self.Window) {
  if (self.constructor) {
    self.Window = self.constructor;
  } else {
    (self.Window = self.constructor = new Function('return function Window() {}')()).prototype = self;
  }
}