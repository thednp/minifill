if ( !self.performance ) {
  self.performance = {};
}
	
if ( !self.performance.now ){	
  if (typeof (self) === 'undefined' && typeof (process) !== 'undefined' && process.hrtime) {
    self.performance.now = function now() {
      var time = process.hrtime();
      return time[0] * 1000 + time[1] / 1000000;
    };
  } else {
    var nowOffset = Date.now();
    self.performance.now = function now(){
      return Date.now() - nowOffset;
    }
  }
}