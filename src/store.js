function () {

	var items = [];
	var subItems = [];

  app.store = {
    types: {
			RECEIVE_HEADERS_ITEMS: 'RECEIVE_HEADERS_ITEMS',
			RECEIVE_SUB_ITEMS: 'RECEIVE_SUB_ITEMS'
    },

    receive: function (type, data) {
      // Update the store if needed
      var types = app.store.types;
      switch (type) {
				case types.RECEIVE_HEADERS_ITEMS:
          items = data;
          break;
				case types.RECEIVE_SUB_ITEMS:
					subItems = data;
					break;
			}
		}
  };
})();
