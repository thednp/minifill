
(function(){ 
	if (!this.Window) {
		if (this.constructor) {
			this.Window = this.constructor;
		} else {
			(this.Window = this.constructor = new Function('return function Window() {}')()).prototype = this;
		}
	}
}())
