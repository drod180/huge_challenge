(function () {
'use strict';

	function NavbarItem(parent, details, id) {
		this._parent = parent;
		this._label = details.label;
		this._url = details.url;
		this._id = "navbar-" + id;

		this._empty = this._empty();
		this._createElement();
	}

	NavbarItem.prototype._createElement = function () {
		this._root = document.createElement("li");
		this._root.setAttribute("id", this._id);
		this._root.classList.add("navbar-item");

		if(!this._empty) {
			this._root.classList.add("filled-nav");
		}

		var anchor = document.createElement("a");
		anchor.innerHTML = this._label;
		anchor.setAttribute("href", this._url)
		anchor.classList.add("navbar-anchor");

		this._root.appendChild(anchor);
		this._parent.appendChild(this._root);
	}

	NavbarItem.prototype._empty = function () {
		var items = app.store.getHeaderItems(this._label);
		return (items.length === 0);
	}

	app.NavbarItem = NavbarItem;
})();
