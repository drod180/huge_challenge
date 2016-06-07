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
