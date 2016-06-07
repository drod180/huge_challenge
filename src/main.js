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
