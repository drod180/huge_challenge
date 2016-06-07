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
	        url: "/api/nav.json/#careers",
	        onLoad: function (data) {
	          app.store.receive(app.store.types.RECEIVE_ITEMS, data);
	        },
	        onError: function () {
	          app.store.receive(app.store.types.ERROR_ITEMS);
	        }
	      });
		},

		fetchHeaderItems: function (header) {
			request({
	        url: "http://localhost:3000/#/" + header,
	        onLoad: function (data) {
	          app.store.receive(app.store.types.RECEIVE_HEADERS_ITEMS, data);
	        },
	        onError: function () {
	          app.store.receive(app.store.types.ERROR_HEADERS_ITEMS);
	        }
	      });
		},

		fetchSubItems: function (header, item) {
			request({
	        url: "#/" + header + "/" + item,
	        onLoad: function (data) {
	          app.store.receive(app.store.types.RECEIVE_SUB_ITEMS, data);
	        },
	        onError: function () {
	          app.store.receive(app.store.types.ERROR_SUB_ITEMS);
	        }
	      });
		}
	}
})();
(function () {
  app.main = {
    start: function () {
      var apiUtil = app.apiUtil;

			apiUtil.fetchItems();
    }
  }
})();
(function () {
'use strict';

	function NavbarItem(root, name) {
		this._root = root;
		this._name = name;
	}
})();
(function () {
 "use strict";

	var items = {};
	var subItems = [];

  app.store = {
    types: {
			RECEIVE_ITEMS: 'RECEIVE_ITEMS',
			RECEIVE_SUB_ITEMS: 'RECEIVE_SUB_ITEMS'
    },

    receive: function (type, data) {
      // Update the store if needed
      var types = app.store.types;
      switch (type) {
				case types.RECEIVE_ITEMS:
          items = data;
					debugger
          break;
				case types.RECEIVE_SUB_ITEMS:
					subItems = data;
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
