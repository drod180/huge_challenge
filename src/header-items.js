(function () {
'use strict';

	function HeaderItems() {
		this._headerName = null;
		this._storeToken = this._addStoreListener();
		this._headerItems = [];
	}

	HeaderItems.prototype._addStoreListener = function () {
	return  app.store.addListener(app.store.types.RECEIVE_NAVBAR_ITEM, this._buildHeaderList.bind(this));
	}

	HeaderItems.prototype._createElement = function () {
		if (this._root) { this._root.remove(); }
		this._root = document.createElement("ul");
		this._root.classList.add("header-list-container")

		var parent = this._getParent();
		if (parent) {
			if (parent.classList.contains("filled-nav")) {
				this._root.classList.add("contains-navs");
			}
			parent.appendChild(this._root);
		}
	}

	HeaderItems.prototype._removeStoreListener = function () {
		this._storeToken();
	}

	HeaderItems.prototype._buildHeaderList = function () {
		var headerItemList = app.store.getHeaderItems();
		this._headerName = app.store.getSelectedNav();

		this._clearHeaderList();
		this._createElement();

		headerItemList.forEach(function (headerItem) {
			this._headerItems.push(new app.HeaderItem(this._root, headerItem));
		}, this);
	}

	HeaderItems.prototype._clearHeaderList = function () {
		if (this._headerItems) {
			this._headerItems.forEach(function (headerItem) {
				headerItem.remove();
			});
		}
	}

	HeaderItems.prototype._getParent = function () {
		var itemParent = null;
		var potentialParents = document.getElementsByClassName("navbar-item");
		[].forEach.call(potentialParents, function (parent) {
			if (parent.children[0].innerHTML === this._headerName) {
				itemParent = parent;
			}
		}.bind(this));

		return itemParent;
	}

	app.HeaderItems = HeaderItems;
})();
