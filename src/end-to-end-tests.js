(function () {
'use strict';

  var testEq = function (current, expected) {
    console.log("current is: " + current + " expected: " + expected);
    var passed = current === expected;
    console.log(passed ? "Passed" : "Failed");
    return current === expected;
  }

  var testNotEq = function (current, expected) {
    console.log("current is: " + current + " NOT expected: " + expected);
    var passed = current !== expected;
    console.log(passed ? "Passed" : "Failed");
    return current !== expected;
  }

  app.endToEndTest = {

    setupTest: function (callback) {
      this._store = app.store;
      this._navbar = new app.Navbar();
      this._header = new app.HeaderItems();
      this._passed = 0;
      this._failed = 0;
      callback && callback();
    },

    getData: function (callback) {
      var items = this._store.getNavbarItems();
      console.log("Store is empty before retreiving data");
      testEq(items.length, 0) ? this._passed += 1 : this._failed += 1;

      app.apiUtil.fetchItems(function () {
        items = this._store.getNavbarItems();
        console.log("Store gets data");
        testNotEq(items.length, 0) ? this._passed += 1 : this._failed += 1;

        callback && callback();
      }.bind(this));
    },

    buildNavbar: function (callback) {
      app.apiUtil.fetchItems(function () {
        this._navbar._buildNavbarList();
        var navItems = this._navbar._navbarItems;
        console.log("Create navbar");
        testNotEq(Object.keys(navItems).length, 0) ? this._passed += 1 : this._failed += 1;

        var items = this._store.getNavbarItems();
        var matching = items.every(function (item) {
           for (var keys in navItems) {
            if (navItems[keys]._label === item.label){
              return true;
            }
           }
           return false;
        })

        console.log("Check if navbar items match store");
        console.log(matching ? "Passed" : "Failed");
        matching ? this._passed += 1 : this._failed += 1;
        callback && callback();
      }.bind(this));
    },

    buildHeaderItems: function (callback) {
      app.apiUtil.fetchItems(function () {
        this._navbar._buildNavbarList();
        this._header._buildHeaderList();
        var navItems = this._navbar._navbarItems;
        var headerItems = this._header._headerItems;
        console.log("Build empty header")
        testEq(headerItems.length, 0) ? this._passed += 1 : this._failed += 1;

        var matching = true;
         for (var keys in navItems) {
           app.actions.updateHeaderItems(navItems[keys]._label)
           headerItems = this._header._headerItems;
           var storeItems = this._store.getHeaderItems(navItems[keys]._label);

           matching = storeItems.length === headerItems.length;
         }

        console.log("Check if header items match store");
        console.log(matching ? "Passed" : "Failed");
        matching ? this._passed += 1 : this._failed += 1;
        callback && callback();
      }.bind(this));
    },

    runTests: function () {
      this.setupTest(this.getData.bind(this,
        this.buildNavbar.bind(this,
          this.buildHeaderItems.bind(this,
            this.endTest.bind(this)
      ))));
    },

    endTest: function () {
      this._navbar.remove()
      var total = this._passed + this._failed;
      console.log(total + " tests run, " + this._passed + " passed " + this._failed + " failed!");
    }
  }
})();
