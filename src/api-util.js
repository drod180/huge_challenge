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
		fetchHeaderItems: function (header) {
			request({
	        url: "#/" + header,
	        onLoad: function (data) {
	          app.store.receive(app.store.types.RECEIVE_HEADERS_ITEMS, data);
	        },
	        onError: function () {
	          app.store.receive(app.store.types.ERROR_HEADERS_ITEMS);
	        }
	      });
		}

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
