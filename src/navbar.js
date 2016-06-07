(function () {
'use strict';

	function Navbar(headers) {
		this._headers = headers;
		this._navBarItems = [];
		this._storeToken = _addStoreListener;
		
		[].forEach.call(headers, function (header) {
			navBarItems.push(new app.NavbarItem(header));
		});
	}

	HeaderItems.prototype._addStoreListener = function () {
		return app.store.addListener(app.store.types.RECEIVE_ITEMS, this._buildNavbarList);
	}

	HeaderItems.prototype._removeStoreListener = function () {
		this._storeToken();
	}
	HeaderItems.prototype._buildNavbarList = function () {
		//Get list of headers and build navbar from list
	}
	app.Navbar = Navbar;
})();
