var app = angular.module("home", []);

app.controller("homeCtlr",function($scope, $http){
  $scope.init = function(){
    $scope.customers = [];
    $http({
      url: "/get_customers",
      method: "GET",
    }).then(function(resp){
      $scope.customers = resp['data'];
    }, function(err){
        console.log("failure");
    });
  }

  $scope.init();
});
