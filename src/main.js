(function () {
  app.main = {
    start: function () {
      var apiUtil = app.apiUtil;
			var navbar = new app.Navbar();
			var headerItems = new app.HeaderItems();
			var bodyFilter = new app.BodyFilter();
			var navigator = new app.Navigator();
			apiUtil.fetchItems();
    },

    test: function () {
      var tests = app.endToEndTest;
      tests.runTests();
    }
  }
})();
