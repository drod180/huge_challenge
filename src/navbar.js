(function () {
'use strict';

	function Navbar() {
		this._root = document.getElementById("navbar-header");
		this._navbarItems = {};
		this._storeToken = this._addStoreListener();
		document.addEventListener("click", this._navClick.bind(this));
	}

	Navbar.prototype._addStoreListener = function () {
		return app.store.addListener(app.store.types.RECEIVE_ITEMS, this._buildNavbarList.bind(this));
	}

	Navbar.prototype._removeStoreListener = function () {
		this._storeToken();
	}

	Navbar.prototype._buildNavbarList = function () {
		var navList = app.store.getNavbarItems();

		navList.forEach(function (header, idx) {
			this._navbarItems["navbar-" + idx] = (new app.NavbarItem(this._root, header, idx));
		}, this);

		this._addCopywrite();
	}

  Navbar.prototype._addCopywrite = function () {
    var copywrite = document.createElement("li");
		var copywriteAnchor = document.createElement("a");
		copywriteAnchor.innerHTML = "© 2014 Huge. All Rights Reserved.";
		copywrite.appendChild(copywriteAnchor);
		copywrite.classList.add("copywrite");
		this._root.appendChild(copywrite);
  }

	Navbar.prototype._navClick = function (e) {
		var target = this._determineTarget(e.target);
		app.actions.updateHeaderItems(target);
	}

	Navbar.prototype._determineTarget = function (target) {
		while (!target.classList.contains("navbar-item") && target.parentElement !== null) {
			target = target.parentElement;
		}

		this._selectTarget(target);
		target = this._navbarItems[target.id];

		return target ? target._label : null;
	}

	Navbar.prototype._selectTarget = function (target) {
		var navItems = document.getElementsByClassName("navbar-item");

		[].forEach.call(navItems, function(el) {
    	el.classList.remove("selected");
		});

		if (target.classList.contains("navbar-item") && !target.classList.contains("selected")) {
			target.classList.add("selected");
		}
	}
  
	app.Navbar = Navbar;
})();
