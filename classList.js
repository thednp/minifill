// Element.prototype.classList polyfill
// inspired by https://github.com/remy/polyfills/blob/master/classList.js
// developed by thednp
// license MIT

if( !('classList' in Element.prototype) ) {
  (function(){
    var className = 'className', add = 'add', classList = 'classList', remove = 'remove', contains = 'contains',
        prototype = 'prototype', element = 'element';

    // classList definition
    function ClassLIST(elem){
      this[element] = elem;
      this[classList] = elem[classList] = [];
      var classesLIST = elem[className].replace(/^\s+|\s+$/g,'').split(/\s+/);
      for (var i = 0; i < classesLIST.length; i++) {
        this[classList].push(classesLIST[i]);
      }
    }

    // methods
    ClassLIST[prototype][add] = function(classNAME){
      if (this[classList].indexOf(classNAME)<0) {
        this[classList].push(classNAME);
        this[element][className] = this[classList].join(' ');
      }
    };
    ClassLIST[prototype][remove] = function(classNAME){
      var classINDEX = this[classList].indexOf(classNAME);
      if (classINDEX>-1) {
        this[classList].splice(classINDEX,1);
        this[element][className] = this[classList].join(' ');
      }
    };
    ClassLIST[prototype][contains] = function(classNAME){
      return this[classList].indexOf(classNAME) > -1;
    };

    Object.defineProperty(Element[prototype], classList, { get: function () { return new ClassLIST(this); } });
  }());
}
