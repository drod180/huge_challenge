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
