var app = angular.module("customerView", ['ngRoute']);

app.controller("customerCtlr",function($scope, $http, $location){
  $scope.init = function(){
    url = $location.absUrl().split('/').pop();
    $scope.customer = [];
    $http({
      url: "/customer/get/" + url,
      method: "GET",
    }).then(function(resp){
      $scope.customer = resp['data'];
      console.log($scope.customer);
    }, function(err){
        console.log(err);
    });
  }

  $scope.init();
});
