(function() {
  "use strict";

  var app = {};
(function () {
'use strict';

	app.actions = {
		updateHeaderItems: function (header) {
			app.store.receive(app.store.types.RECEIVE_NAVBAR_ITEM, header);
		},

		redirectHeaderItem: function (headerItem) {
			app.store.receive(app.store.types.RECEIVE_HEADER_ITEM, headerItem);
		}
	};
})();
(function() {

	function request(inputOptions) {
		var options = {
			url: '',
			method: 'GET',
			onLoad: null,
			onError: null,
			onComplete: null,
		};

	  var key;
	  for (key in inputOptions) {
	    options[key] = inputOptions[key];
	  }

		var req = new XMLHttpRequest();
		req.open(options.method, options.url, true);
		req.onreadystatechange = function () {
			if (req.readyState === XMLHttpRequest.DONE) {
				if (req.status === 200) {
					options.onLoad && options.onLoad(JSON.parse(req.responseText));
				} else {
					options.onError && options.onError();
				}
				options.onComplete && options.onComplete();
			}
		};
		req.send();
	}

	app.apiUtil = {
		fetchItems: function () {
			request({
	        url: "/api/nav.json",
	        onLoad: function (data) {
	          app.store.receive(app.store.types.RECEIVE_ITEMS, data);
	        },
	        onError: function () {
	          app.store.receive(app.store.types.ERROR_ITEMS);
	        }
	      });
		}
	}
})();
(function () {
'use strict';

	function HeaderItem(parent, details) {
		this._parent = parent;
		this._label = details.label;
		this._url = details.url;

		this._createElement();
	}

	HeaderItem.prototype._createElement = function () {
		this._root = document.createElement("li");
		var anchor = document.createElement("a");
		this._root.classList.add("header-list-item")
		anchor.innerHTML = this._label;
		anchor.setAttribute("href", this._url);
		anchor.classList.add("header-anchor");
		this._root.appendChild(anchor);
		this._parent.appendChild(this._root);
	}

	HeaderItem.prototype.remove = function () {
		if (this._root.parentNode) {
			this._root.parentNode.removeChild(this._root);
		}
	}

	app.HeaderItem = HeaderItem;
})();
(function () {
'use strict';

	function HeaderItems() {
		this._headerName = null;
		this._storeToken = this._addStoreListener();
		this._headerItems = [];
	}

	HeaderItems.prototype._addStoreListener = function () {
		return app.store.addListener(app.store.types.RECEIVE_NAVBAR_ITEM, this._buildHeaderList.bind(this));
	}

	HeaderItems.prototype._createElement = function () {
		if (this._root) { this._root.remove(); }
		this._root = document.createElement("ul");
		this._root.classList.add("header-list-container")
		var parent = this._getParent();
		if (parent) {
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
(function () {
  app.main = {
    start: function () {
      var apiUtil = app.apiUtil;
			var navbar = new app.Navbar();
			var headerItems = new app.HeaderItems();
			apiUtil.fetchItems();
    }
  }
})();
(function () {
'use strict';

	function NavbarItem(parent, details, id) {
		this._parent = parent;
		this._label = details.label;
		this._url = details.url;
		this._id = "navbar-" + id;

		this._createElement();
	}

	NavbarItem.prototype._createElement = function () {
		this._root = document.createElement("li");
		this._root.setAttribute("id", this._id);
		this._root.classList.add("navbar-item");

		var anchor = document.createElement("a");
		anchor.innerHTML = this._label;
		anchor.setAttribute("href", this._url)
		anchor.classList.add("navbar-anchor");

		this._root.appendChild(anchor);
		this._parent.appendChild(this._root);
	}

	app.NavbarItem = NavbarItem;
})();
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
(function () {
 "use strict";

	var listener = {};
	var items = {};
	var selectedNav = null;

  app.store = {
    types: {
			RECEIVE_ITEMS: 'RECEIVE_ITEMS',
			RECEIVE_NAVBAR_ITEM: 'RECEIVE_NAVBAR_ITEM'
    },

		addListener: function (type, callback) {
			if (! listener[type]) {
				listener[type] = [callback];
			} else {
				listener[type].push(callback);
			}

			//return function to allow for removing a listener
			return (function () {
				listener = listener.filter(function (cb) {
					return cb !== callback;
				});
			});
		},

    receive: function (type, data) {
      var types = app.store.types;
      switch (type) {
				case types.RECEIVE_ITEMS:
          items = data;
          break;
				case types.RECEIVE_NAVBAR_ITEM:
					selectedNav = data;
					break;
			}

			listener[type] && listener[type].forEach( function (callback) {
				callback();
			})
		},

		getNavbarItems: function () {
			var navItems = items["items"];
			var navLabels = [];

			navItems.forEach(function (el) {
				navLabels.push(
					{ "label": el["label"], "url": el["url"] }
				);
			});

			return navLabels;
		},

		getHeaderItems: function () {
			if (!selectedNav) { return []; }
			var navItems = items["items"];
			var headerItems = [];

			navItems.forEach(function (el) {
				for (var keys in el) {
					if (keys === "label" && el[keys] === selectedNav) {
						headerItems = el["items"].slice();
					}
				}
			})

			return headerItems;
		},

		getSelectedNav: function () {
			return selectedNav;
		}
  };
})();
  document.addEventListener('DOMContentLoaded', function () {
    var main = app.main;
    main.start();
  });
})();
