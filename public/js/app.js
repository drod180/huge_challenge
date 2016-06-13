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
		fetchItems: function (callback) {
			request({
	        url: "/api/nav.json",
	        onLoad: function (data) {
	          app.store.receive(app.store.types.RECEIVE_ITEMS, data);
	        },
	        onError: function () {
	          app.store.receive(app.store.types.ERROR_ITEMS);
	        },
          onComplete: function () {
            callback && callback();
          }
	      });
		}
	}
})();
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
(function () {
'use strict';

  var testEq = function (current, expected) {
    console.log("current is: " + current + " expected: " + expected);
    var passed = current === expected;
    console.log(passed ? "Passed" : "Failed");
    return current === expected;
  }

  var testNotEq = function (current, expected) {
    console.log("current is: " + current + " NOT expected: " + expected);
    var passed = current !== expected;
    console.log(passed ? "Passed" : "Failed");
    return current !== expected;
  }



  app.endToEndTest = {

    setupTest: function (callback) {
      this._store = app.store;
      this._navbar = new app.Navbar();
      this._header = new app.HeaderItems();
      this._passed = 0;
      this._failed = 0;
      callback && callback();
    },

    getData: function (callback) {
      var items = this._store.getNavbarItems();
      console.log("Store is empty before retreiving data");
      testEq(items.length, 0) ? this._passed += 1 : this._failed += 1;

      app.apiUtil.fetchItems(function () {
        items = this._store.getNavbarItems();
        console.log("Store gets data");
        testNotEq(items.length, 0) ? this._passed += 1 : this._failed += 1;

        callback && callback();
      }.bind(this));
    },

    buildNavbar: function (callback) {
      app.apiUtil.fetchItems(function () {
        this._navbar._buildNavbarList();
        var navItems = this._navbar._navbarItems;
        console.log("Create navbar");
        testNotEq(Object.keys(navItems).length, 0) ? this._passed += 1 : this._failed += 1;

        var items = this._store.getNavbarItems();
        var matching = items.every(function (item) {
           for (var keys in navItems) {
            if (navItems[keys]._label === item.label){
              return true;
            }
           }
           return false;
        })

        console.log("Check if navbar items match store");
        console.log(matching ? "Passed" : "Failed");
        matching ? this._passed += 1 : this._failed += 1;
        callback && callback();
      }.bind(this));
    },

    buildHeaderItems: function (callback) {
      app.apiUtil.fetchItems(function () {
        this._navbar._buildNavbarList();
        this._header._buildHeaderList();
        var navItems = this._navbar._navbarItems;
        var headerItems = this._header._headerItems;
        console.log("Build empty header")
        testEq(headerItems.length, 0) ? this._passed += 1 : this._failed += 1;

        var matching = true;
         for (var keys in navItems) {
           app.actions.updateHeaderItems(navItems[keys]._label)
           headerItems = this._header._headerItems;
           var storeItems = this._store.getHeaderItems(navItems[keys]._label);

           matching = storeItems.length === headerItems.length;
         }

        console.log("Check if header items match store");
        console.log(matching ? "Passed" : "Failed");
        matching ? this._passed += 1 : this._failed += 1;
        callback && callback();
      }.bind(this));
    },

    runTests: function () {
      this.setupTest(this.getData.bind(this,
        this.buildNavbar.bind(this,
          this.buildHeaderItems.bind(this,
            this.endTest.bind(this)
      ))));
    },

    endTest: function () {
      this._navbar.remove()
      var total = this._passed + this._failed;
      console.log(total + " tests run, " + this._passed + " passed " + this._failed + " failed!");
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
    this._headerItems = [];
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
			var bodyFilter = new app.BodyFilter();
			var navigator = new app.Navigator();
			apiUtil.fetchItems();
    },

    test: function () {
      var tests = app.endToEndTest;
      tests.runTests();
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

		this._empty = this._empty();
		this._createElement();
	}

	NavbarItem.prototype._createElement = function () {
		this._root = document.createElement("li");
		this._root.setAttribute("id", this._id);
		this._root.classList.add("navbar-item");

		if(!this._empty) {
			this._root.classList.add("filled-nav");
		}

		var anchor = document.createElement("a");
		anchor.innerHTML = this._label;
		anchor.setAttribute("href", this._url)
		anchor.classList.add("navbar-anchor");

		this._root.appendChild(anchor);
		this._parent.appendChild(this._root);
	}

	NavbarItem.prototype._empty = function () {
		var items = app.store.getHeaderItems(this._label);
		return (items.length === 0);
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
		while (target !== this._parent && target.parentNode !== null) {
			target = target.parentNode;
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
			var navItems = items["items"] === undefined ? [] : items["items"];
			var navLabels = [];

			navItems.forEach(function (el) {
				navLabels.push(
					{ "label": el["label"], "url": el["url"] }
				);
			});

			return navLabels;
		},

		getHeaderItems: function (navItem) {
			var nav = navItem === undefined ? selectedNav : navItem;
			if (nav === null) { return []; }
			var navItems = items["items"];
			var headerItems = [];

			navItems.forEach(function (el) {
				for (var keys in el) {
					if (keys === "label" && el[keys] === nav) {
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
