var app = angular.module("customerView", ['ngRoute']);

app.controller("customerCtlr",function($scope, $http, $location){
  $scope.init = function(){
    url = $location.absUrl().split('/').pop();
    $scope.customer = [];
    $scope.instances = [];
    $scope.tabSelected = 0;
    $http({
      url: "/customer/get/" + url,
      method: "GET",
    }).then(function(resp){
      $scope.customer = resp['data'].customer;
      $scope.instances = resp['data'].instances;
      console.log($scope.instances);
    }, function(err){
        console.log(err);
    });
  }

  $scope.setTab = function(tab) {
    $scope.tabSelected = tab;
  }

  $scope.isSelectedTab = function(tab, type){
    if(angular.isUndefined($scope.tabSelected))
      return "";

    if(tab == $scope.tabSelected) {
      switch(type){
        case 0:
          return "active";
        break;
        case 1:
          return "tab-pane fade in active";
        break;
      }
    }

    if(type == 1)
      return "tab-pane fade"
    return "";
  }

  $scope.init();
});
