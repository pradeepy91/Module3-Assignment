(function () {
  'use strict'
  var myApp = angular.module("NarrowItDownApp",[]);
  myApp.controller("NarrowItDownController",NarrowItDownController);
  myApp.service("MenuSearchService",MenuSearchService);
  NarrowItDownController.$inject = ['MenuSearchService']
  function NarrowItDownController(MenuSearchService){
    var control = this;
    control.searchKey = "";
    control.items =[];
    control.searchResult = [];
    control.removeItem = function (index) {
      control.searchResult.splice(index,1);
    };
    control.search = function(){
         control.searchResult= [];
    control.searchResult =  MenuSearchService.getMatchedMenuItems(control.searchKey);
    };
  }
 MenuSearchService.$inject = ['$http']
  function MenuSearchService($http){
    var service = this;
    service.search = function () {
      return $http({
        url:'https://davids-restaurant.herokuapp.com/menu_items.json'
      });
    };
    service.getMatchedMenuItems = function(key) {
      var searchResult   = [];
      var items = [];
      var promise = service.search();
      promise.then(function (result) {
        items =  result.data.menu_items;
        for(var i=0;i<items.length;i++){
          //var description = items[i].description;
          //console.log("Items",description);
        //  console.log("items[i].description.includes(control.searchKey)",description.index(control.searchKey));
          if(items[i].description.includes(key)){
            //console.log("Found at ",items[i].description.indexOf(control.searchKey) );
            searchResult.push(items[i]);
          }
        }
      },function (error) {
        console.log("error",error);
      })
      return searchResult;
    }
  }
})();
