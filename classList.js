// Element.prototype.classList by Remy Sharp
if (!("classList" in document.documentElement)) {
	(function () {
		var prototype = Array.prototype,
			push = prototype.push,
			splice = prototype.splice,
			join = prototype.join;
		
		function ClassList(el) {
			this.el = el;
			// The className needs to be trimmed and split on whitespace
			// to retrieve a list of classes.
			var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
			for (var i = 0; i < classes.length; i++) {
				push.call(this, classes[i]);
			}
		};
		
		ClassList.prototype = {
			add: function(token) {
				if(this.contains(token)) return;
				push.call(this, token);
				this.el.className = this.toString();
			},
			contains: function(token) {
				return this.el.className.indexOf(token) != -1;
			},
			item: function(index) {
				return this[index] || null;
			},
			remove: function(token) {
				if (!this.contains(token)) return;
				for (var i = 0; i < this.length; i++) {
					if (this[i] == token) break;
				}
				splice.call(this, i, 1);
				this.el.className = this.toString();
			},
			toString: function() {
				return join.call(this, ' ');
			},
			toggle: function(token) {
				if (!this.contains(token)) {
					this.add(token);
				} else {
					this.remove(token);
				}
			
				return this.contains(token);
			}
		};
		
		window.classList = ClassList;
		
		function defineElementGetter (obj, prop, getter) {
			if (Object.defineProperty) {
				Object.defineProperty(obj, prop,{
					get : getter
				});
			} else {
				obj.__defineGetter__(prop, getter);
			}
		}
		
		defineElementGetter(Element.prototype, 'classList', function () {
			return new ClassList(this);
		});
	})();
}
