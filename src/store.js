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
		},

		getHeaderItems: function () {
			if (!currentHeader) { return []; }
			var navItems = items["items"];
			var headerItems = [];

			navItems.forEach(function (el) {
				for (var keys in el) {
					if (keys === "label" && el[keys] === currentHeader) {
						headerItems = el["items"].slice();
					}
				}
			})

			return headerItems;
		},

		getCurrentHeader: function () {
			return currentHeader;
		}
  };
})();
