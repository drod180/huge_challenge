(function() {
  "use strict";

  var app = {};
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
  app.main = {
    start: function () {
      var apiUtil = app.apiUtil;
			var headers = document.getElementById('navbar-header').children;
			var navBarItems = [];

			[].forEach.call(headers, function (header) {
				navBarItems.push(new app.NavbarItem(header));
			});
			apiUtil.fetchItems();
    }
  }
})();
(function () {
'use strict';

	function NavbarItem(root) {
		this._root = root;
		this._name = this._root.innerHTML;

		this._root.addEventListener('click', this._showItems.bind(this));
	}

	NavbarItem.prototype._showItems = function () {
		debugger
		app.store.receive(app.store.types.SHOW_HEADER_ITEMS, this._name);
	}

	app.NavbarItem = NavbarItem;
})();
(function () {
 "use strict";

	var items = {};
	var currentHeader = null;
	var currentItem = null;

  app.store = {
    types: {
			RECEIVE_ITEMS: 'RECEIVE_ITEMS',
			SHOW_HEADER_ITEMS: 'SHOW_HEADER_ITEMS',
			SHOW_SECONDARY_ITEMS: 'SHOW_SECONDARY_ITEMS'
    },

    receive: function (type, data) {
      var types = app.store.types;
      switch (type) {
				case types.RECEIVE_ITEMS:
          items = data;
          break;
				case types.SHOW_HEADER_ITEMS:
					currentHeader = data;
					currentItem = null;
					break;
				case types.SHOW_SECONDARY_ITEMS:
					currentItem = data;
					break;
			}
		}
  };
})();
  document.addEventListener('DOMContentLoaded', function () {
    var main = app.main;
    main.start();
  });
})();
