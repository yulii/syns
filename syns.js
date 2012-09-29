(function () {
	var syns = window.$syns = function() { return new Syns(); };

	syns.tag = {
		view: {
			opening: '<dl class="cf">',
			closing: '</dl>'
		},
		label: {
			opening: '<dt class="fl w25p">',
			closing: '</dt>'
		},
		element: {
			opening: '<dd class="w75p">',
			closing: '</dd>'
		},
		indent: '&nbsp;&nbsp;'
	};
	syns.view = function(data) {
		console.log(data);
		this.str = [];
		this.str.push(this.tag.view.opening);
		this.toHtmlString(data, 0);
		this.str.push(this.tag.view.closing);
		document.write(this.str.join(''));
	};

	/**
	 * Convert to HTML String from Object data
	 * @param {} o
	 * @param {} i
	 * @returns {}
	 */
	syns.toHtmlString = function(o, i) {
		var type = null;
		for (var p in o) {
			// Property Name
			this.str.push(this.tag.label.opening);
			this.str.push(this.indentString(i));
			this.str.push(p);
			this.str.push(this.tag.label.closing);

			// Value
			type = this.getTypeName(o[p]);
			if (type === 'object' || type === 'array') {
//				this.str.push(this.tag.view.opening);
//				this.str.push(this.tag.view.closing);
				this.str.push(this.tag.element.opening);
				this.str.push(type);
				this.str.push(this.tag.element.closing);
				this.toHtmlString(o[p], i+1);
			} else {
				this.str.push(this.tag.element.opening);
				if (o[p] === '') {
					this.str.push('&nbsp;');
				} else {
					this.str.push(o[p]);
				}
				this.str.push(this.tag.element.closing);
			}
		}
	};
	syns.indentString = function(n) {
		var str = [];
		for (var i = 0; i < n; i++) {
			str.push(this.tag.indent);
		}
		return str.join('');
	};

	/**
	 * Detect type of an object
	 * @param {} o
	 * @returns {}
	 */
	syns.getTypeName = function(o) {
		if (o === null)					{ return 'null'; }
		if (typeof o == 'undefined')	{ return 'undefined'; }
		if (typeof o == 'boolean')		{ return 'boolean'; }
		if (typeof o == 'string')		{ return 'string'; }
		if (typeof o == 'number')		{ return 'number'; }
		if (o instanceof Array)			{ return 'array'; }
		if (o instanceof RegExp)		{ return 'regexp'; }
		if (o instanceof Date)			{ return 'date'; }
		if (typeof o == 'function')		{ return 'function'; }
		if (typeof o == 'object')		{ return 'object'; }
		return 'unknown';
	};

})();