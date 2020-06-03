if ( !window.performance ) {
  window.performance = {};
}
	
if ( !window.performance.now ){	
  var nowOffset = Date.now();
  
  window.performance.now = function now(){
    return Date.now() - nowOffset;
  }
}