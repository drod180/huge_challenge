(function () {
'use strict';

	function Hamburger() {
		this._root = document.getElementById("mobile-menu");
		this._navbar = document.getElementById("navbar-header");
		this._logo = document.getElementById("mobile-logo");
		this._body = document.getElementById("body-container");

		this._root.addEventListener("click", this._handleHamburgerClick.bind(this));
	}

	Hamburger.prototype._handleHamburgerClick = function () {
		if (this._root.classList.contains("hamburger")) {
			this._root.classList.add("close");
			this._root.classList.remove("hamburger");
			this._navbar.classList.add("mobile-open");
			this._logo.classList.add("mobile-open");
			this._body.classList.add("mobile-open");
		} else {
			this._root.classList.add("hamburger");
			this._root.classList.remove("close");
			this._navbar.classList.remove("mobile-open");
			this._logo.classList.remove("mobile-open");
			this._body.classList.remove("mobile-open");
		}
	}

	app.Hamburger = Hamburger;
})();
