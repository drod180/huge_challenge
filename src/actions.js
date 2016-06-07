(function () {
'use strict';

	app.actions = {
		updateHeaderItems: function (header) {
			app.store.receive(app.store.types.RECEIVE_NAVBAR_ITEM, header);
		},

		redirectHeaderItem: function (headerItem) {
			app.store.receive(app.store.types.RECEIVE_HEADER_ITEM, header);
		}
	};
})();
