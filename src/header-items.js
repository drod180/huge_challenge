(function () {
'use strict';

	function HeaderItems(root) {
		this._root = root;
		this._title = this._root.innerHTML;

		this._root.addEventListener('click', this._showItems.bind(this));
	}

	HeaderItems.prototype._showItems = function () {
		app.store.receive(app.store.types.NAVIGATE_TO_PAGE, this._title);
	}

	app.NavbarItem = NavbarItem;
})();
