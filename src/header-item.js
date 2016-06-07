(function () {
'use strict';

	function HeaderItem(root) {
		this._root = root;
		this._title = this._root.innerHTML;

		this._root.addEventListener('click', this._clickHeaderItem.bind(this));
	}

	HeaderItem.prototype._clickHeaderItem = function () {
		app.actions.redirectHeaderItem(this._title);
	}

	app.HeaderItem = HeaderItem;
})();
