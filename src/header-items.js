(function () {
'use strict';

	function HeaderItems(headerName) {
		this._headerName = headerName;
		this._storeToken = this._addStoreListener();
	}

	HeaderItems.prototype._addStoreListener = function () {
		return app.store.addListener(app.store.types.RECEIVE_NAVBAR_ITEM, this._buildHeaderList);
	}

	HeaderItems.prototype._removeStoreListener = function () {
		this._storeToken();
	}

	HeaderItems.prototype._buildHeaderList = function () {
		//Get header list and build headerItem list
	}

	app.HeaderItems = HeaderItems;
})();
