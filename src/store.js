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
