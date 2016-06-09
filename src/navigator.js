(function () {
'use strict';

	function Navigator() {
		this._root = document.getElementById("mobile-menu");
		this._navbar = document.getElementById("navbar-header");
		this._logo = document.getElementById("mobile-logo");
		this._body = document.getElementById("body-container");
		this._parent = document.getElementById("main-nav");

		document.addEventListener("click", this._checkNavClick.bind(this));
		this._root.addEventListener("click", this._handleNavigatorClick.bind(this));
	}

	Navigator.prototype._checkNavClick = function (e) {
		var target = e.target;
		while (target !== this._parent && target.parentElement !== null) {
			target = target.parentElement;
		}

		if (target !== this._parent) {
			this._closeNav();
		}
	}

	Navigator.prototype._handleNavigatorClick = function () {
		if (this._root.classList.contains("hamburger")) {
			this._openNav();
		} else {
			this._closeNav();
		}
	}

	Navigator.prototype._closeNav = function () {
		this._root.classList.add("hamburger");
		this._root.classList.remove("close");
		this._navbar.classList.remove("mobile-open");
		this._logo.classList.remove("mobile-open");
		this._body.classList.remove("mobile-open");
	}

	Navigator.prototype._openNav = function () {
		this._root.classList.add("close");
		this._root.classList.remove("hamburger");
		this._navbar.classList.add("mobile-open");
		this._logo.classList.add("mobile-open");
		this._body.classList.add("mobile-open");
	}

	app.Navigator = Navigator;
})();
