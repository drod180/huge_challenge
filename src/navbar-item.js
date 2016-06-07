(function () {
'use strict';

	function NavbarItem(parent, name) {
		this._parent = parent;
		this._name = name;

		this._createItem();
		this._root.addEventListener('click', this._clickHeader.bind(this));
	}

	NavbarItem.prototype._createItem = function () {
		this._root = document.createElement("li");
		this._root.innerHTML = this._name;
		this._parent.appendChild(this._root);
	}

	NavbarItem.prototype._clickHeader = function () {
		app.actions.updateHeaderItems(this._name);
	}

	app.NavbarItem = NavbarItem;
})();
