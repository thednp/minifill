if ( !self.performance ) {
  self.performance = {};
}
	
if ( !self.performance.now ){	
  var nowOffset = Date.now();
  self.performance.now = function now(){
    return Date.now() - nowOffset;
  }
}