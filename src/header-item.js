(function () {
'use strict';

	function HeaderItem(parent, name) {
		this._parent = parent;
		this._name = name;

		this._createElement();

		this._root.addEventListener('click', this._clickHeaderItem.bind(this));
	}

	HeaderItem.prototype._createElement = function () {
		this._root = document.createElement("li");
		this._root.innerHTML = this._name;
		this._parent.appendChild(this._root);
	}

	HeaderItem.prototype._clickHeaderItem = function () {
		app.actions.redirectHeaderItem(this._title);
	}

	HeaderItem.prototype.remove = function () {
		this._root.removeEventListener('click', this._clickHeaderItem.bind(this));
		this._root.remove();
	}

	app.HeaderItem = HeaderItem;
})();
