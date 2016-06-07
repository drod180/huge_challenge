(function () {
'use strict';

	function NavbarItem(root) {
		this._root = root;
		this._name = this._root.innerHTML;

		this._root.addEventListener('click', this._clickHeader.bind(this));
	}

	NavbarItem.prototype._clickHeader = function () {
		app.actions.updateHeaderItems(this._name);
	}

	app.NavbarItem = NavbarItem;
})();
