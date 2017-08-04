var app = angular.module("customerView", []);

app.controller("customerCtlr",function($scope, $http, $routeParams){
  $scope.init = function(){
    $scope.customer = [];
    $http({
      url: "/get_customer/" + $routeParams.id,
      method: "GET",
    }).then(function(resp){
      $scope.customer = resp['data'];
    }, function(err){
        console.log("failure");
    });
  }

  $scope.init();
});
