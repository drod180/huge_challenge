(function () {
'use strict';

	function NavbarItem(root, name) {
		this._root = root;
		this._name = name;

		this._root.addEventListener('click', this._showItems.bind(this));
	}

	NavbarItem.prototype._showItems = function () {
		debugger
		app.store.receive(app.store.types.SHOW_HEADER_ITEMS, this._name);
	}
})();
