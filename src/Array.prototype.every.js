if (!Array.prototype.every) {
  Array.prototype.every = function(callbackfn, thisArg) {
    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var O = Object(this), len = O.length >>> 0;

    if (typeof callbackfn !== 'function' && Object.prototype.toString.call(callbackfn) !== '[object Function]') {
      throw new TypeError();
    }

    if (arguments.length > 1) {
      T = thisArg;
    }

    k = 0;

    while (k < len) {

      var kValue;

      if (k in O) {
        var testResult;
        kValue = O[k];

        if(T) testResult = callbackfn.call(T, kValue, k, O); 
        else testResult = callbackfn(kValue,k,O)

        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  }
}