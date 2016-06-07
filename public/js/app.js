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
(function () {
  app.main = {
    start: function () {
      var apiUtil = app.apiUtil;
			var navbar = new app.Navbar();

			apiUtil.fetchItems();
    }
  }
})();
(function () {
'use strict';

	function NavbarItem(parent, name) {
		this._parent = parent;
		this._name = name;

		this._createItem();
		this._root.addEventListener('click', this._clickHeader.bind(this));
	}

	NavbarItem.prototype._createItem = function () {
		this._root = document.createElement("li");
		this._root.innerHTML = this._name;
		this._parent.appendChild(this._root);
	}

	NavbarItem.prototype._clickHeader = function () {
		app.actions.updateHeaderItems(this._name);
	}

	app.NavbarItem = NavbarItem;
})();
(function () {
'use strict';

	function Navbar() {
		this._root = document.getElementById("navbar-header");
		this._navbarItems = [];
		this._storeToken = this._addStoreListener();
	}

	Navbar.prototype._addStoreListener = function () {
		return app.store.addListener(app.store.types.RECEIVE_ITEMS, this._buildNavbarList.bind(this));
	}

	Navbar.prototype._removeStoreListener = function () {
		this._storeToken();
	}

	Navbar.prototype._buildNavbarList = function () {
		var navList = app.store.getNavbarItems();

		navList.forEach(function (header) {
			this._navbarItems.push(new app.NavbarItem(this._root, header));
		}, this);
	}

	app.Navbar = Navbar;
})();
(function () {
 "use strict";

	var listener = {};
	var items = {};
	var currentHeader = null;

  app.store = {
    types: {
			RECEIVE_ITEMS: 'RECEIVE_ITEMS',
			RECEIVE_NAVBAR_ITEM: 'RECEIVE_NAVBAR_ITEM',
			RECEIVE_HEADER_ITEM: 'RECEIVE_HEADER_ITEM'
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
					debugger;
					currentHeader = data;
					break;
				case types.RECEIVE_HEADER_ITEM:
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
				for (var keys in el) {
					if (keys === "label") {
						navLabels.push(el[keys]);
					}
				}
			});

			return navLabels;
		}
  };
})();
  document.addEventListener('DOMContentLoaded', function () {
    var main = app.main;
    main.start();
  });
})();
