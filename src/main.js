(function () {
  app.main = {
    start: function () {
      var apiUtil = app.apiUtil;
			var navbar = new app.Navbar();

			apiUtil.fetchItems();
    }
  }
})();
