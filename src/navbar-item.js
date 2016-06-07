(function () {
'use strict';

	function NavbarItem(root) {
		this._root = root;
		this._name = this._root.innerHTML;

		this._root.addEventListener('click', this._showItems.bind(this));
	}

	NavbarItem.prototype._showItems = function () {
		app.store.receive(app.store.types.SHOW_HEADER_ITEMS, this._name);
	}

	app.NavbarItem = NavbarItem;
})();
