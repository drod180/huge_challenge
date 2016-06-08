(function () {
'use strict';

	function HeaderItem(parent, details) {
		this._parent = parent;
		this._label = details.label;
		this._url = details.url;

		this._createElement();
	}

	HeaderItem.prototype._createElement = function () {
		this._root = document.createElement("li");
		var anchor = document.createElement("a");
		this._root.classList.add("header-list-item")
		anchor.innerHTML = this._label;
		anchor.setAttribute("href", this._url);
		anchor.classList.add("header-anchor");
		this._root.appendChild(anchor);
		this._parent.appendChild(this._root);
	}

	HeaderItem.prototype.remove = function () {
		if (this._root.parentNode) {
			this._root.parentNode.removeChild(this._root);
		}
	}

	app.HeaderItem = HeaderItem;
})();
