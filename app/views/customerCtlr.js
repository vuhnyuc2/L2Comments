var app = angular.module("customerView", ['ngRoute']);

app.controller("customerCtlr",function($scope, $http, $location){
  $scope.get_instance_info = function(id){
    $http({
      url: "/customer/" + id.toString() + "/info/",
      method: "GET",
    }).then(function(resp){
      console.log(resp['data']);
      return resp['data'];
    }, function(err){
      console.log(err);
    });
  }

  $scope.get_pmr_url = function(pmr){
    values = pmr.split(',');
    url = "https://longspeakz.boulder.ibm.com/WebRetain/DispatcherServlet?oper=pmrDisplay&pmrnumber=" +
    values[0] + "&branch=" + values[1] + "&country=" + values[2] + "&library=current&type=Software";
    return url;
  }

  $scope.init = function(){
    url = $location.absUrl().split('/').pop();
    $scope.customer = [];
    $scope.instance_info = [];
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
