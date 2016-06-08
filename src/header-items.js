(function () {
'use strict';

	function HeaderItems(headerName) {
		this._headerName = headerName;
		this._storeToken = this._addStoreListener();
		this._headerItems = [];
	}

	HeaderItems.prototype._addStoreListener = function () {
		return app.store.addListener(app.store.types.RECEIVE_NAVBAR_ITEM, this._buildHeaderList.bind(this));
	}

	HeaderItems.prototype._createElement = function () {
		if (!this._root) { this._root.remove(); }
		this._root = document.createElement("ul");
		var parent = document.getElementById(this._headerName);
		parent.appendChild(this._root);
	}

	HeaderItems.prototype._removeStoreListener = function () {
		this._storeToken();
	}

	HeaderItems.prototype._buildHeaderList = function () {
		var headerItemList = app.store.getHeaderItems();
		this._headerName = app.store.getCurrentHeader();

		this._clearHeaderList();
		this._createElement();

		headerItemList.forEach(function (headerItem) {
			this._headerItems.push(new app.HeaderItem(this._root, headerItem));
		}, this);
	}

	HeaderItems.prototype._clearHeaderList = function () {
		if (_headerItems) {
			_headerItems.forEach(function (headerItem) {
				headerItem.remove();
			});
		}
	}

	app.HeaderItems = HeaderItems;
})();
