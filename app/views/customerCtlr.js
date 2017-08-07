var app = angular.module("customerView", ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider
        .when ('/customer/:customer_id',
                {
                    templateUrl : 'customer.html',
                    controller  : 'customerCtlr'
                }
              )
        .otherwise({
          redirectTo: '/customerFALSE'
        });
    }]);
app.controller("customerCtlr",function($scope, $http, $location, $routeParams){
  $scope.init = function(){
    console.log($location.path);
    console.log($routeParams);
    $scope.customer = [];
    $http({
      url: "/customer/get/" + $routeParams.customer_id,
      method: "GET",
    }).then(function(resp){
      $scope.customer = resp['data'];
    }, function(err){
        console.log("failure");
    });
  }

  $scope.init();
});
