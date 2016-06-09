(function () {
'use strict';

	function BodyFilter() {
		this._root = document.getElementById("body-filter");
		this._addStoreListener();
	}

	BodyFilter.prototype._addStoreListener = function () {
		return app.store.addListener(app.store.types.RECEIVE_NAVBAR_ITEM, this._changeFilter.bind(this));
	}

	BodyFilter.prototype._removeStoreListener = function () {
		this._storeToken();
	}

	BodyFilter.prototype._changeFilter = function () {
		var currentNav = app.store.getSelectedNav();
		if (currentNav !== null && !this._root.classList.contains("dark-filter")) {
			this._root.classList.add("dark-filter")
		} else if (currentNav === null && this._root.classList.contains("dark-filter")) {
			this._root.classList.remove("dark-filter")
		}
	}

	app.BodyFilter = BodyFilter;
})();
