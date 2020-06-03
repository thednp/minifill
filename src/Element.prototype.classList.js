// Element.prototype.classList by Remy Sharp
// updated by thdnp
if( !Element.prototype.classList ) {
	var ClassLIST = function(elem){
		var classArr = (elem.getAttribute('class')||'').replace(/^\s+|\s+$/g,'').split(/\s+/) || [];
				
		// methods
		hasClass = this.contains = function(classNAME){
			return classArr.indexOf(classNAME) > -1;
		},
		addClass = this.add = function(classNAME){
			if (!hasClass(classNAME)) {
				classArr.push(classNAME);
				elem.setAttribute('class', classArr.join(' '));
			}
		},
		removeClass = this.remove = function(classNAME){
			if (hasClass(classNAME)) {
				classArr.splice(classArr.indexOf(classNAME),1);
				elem.setAttribute('class', classArr.join(' '));
			}
		},
		toggleClass = this.toggle = function(classNAME){
			if ( hasClass(classNAME) ) { removeClass(classNAME); } 
			else { addClass(classNAME); } 
		};
	}
	Object.defineProperty(Element.prototype, 'classList', { 
		get: function () { 
			return new ClassLIST(this)
		} 
	});
}