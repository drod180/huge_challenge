(function () {
  app.main = {
    start: function () {
      var apiUtil = app.apiUtil;
			var headers = document.getElementById('navbar-header').children;
			var navbar = new app.Navbar(headers);
			
			apiUtil.fetchItems();
    }
  }
})();
