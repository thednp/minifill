// Element.prototype.classList polyfill
// inspired by https://github.com/remy/polyfills/blob/master/classList.js
// developed by thednp
// license MIT

	if( !(classList in ELEMENT[prototype]) ) {
		var ClassLIST = function(elem){
			var classArr = elem[classList] = [],
					classesLIST = elem[className].replace(/^\s+|\s+$/g,'').split(/\s+/),

					// methods
					hasClass = this[contains] = function(classNAME){
						return classArr[indexOf](classNAME) > -1;
					},
					addClass = this[add] = function(classNAME){
						if (!hasClass(classNAME)) {
							classArr.push(classNAME);
							elem[className] = classArr.join(' ');
						}
					},
					removeClass = this[remove] = function(classNAME){
						if (hasClass(classNAME)) {
							classArr.splice(classArr[indexOf](classNAME),1);
							elem[className] = classArr.join(' '); 
						}
					},
					toggleClass = this.toggle = function(classNAME){
						if ( hasClass(classNAME) ) { removeClass(classNAME); } 
						else { addClass(classNAME); } 
					};

			for (var i = 0; i < classesLIST[length]; i++) {
				classArr.push(classesLIST[i]);
			}
		}
		Object.defineProperty(ELEMENT[prototype], classList, { get: function () { return new ClassLIST(this); } });
	}
