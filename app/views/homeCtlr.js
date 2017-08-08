var app = angular.module("home", []);


app.filter('searchFor', function(){

	return function(arr, searchString){

		if(!searchString){
			return [];
		}

		var result = [];

		searchString = searchString.toLowerCase();

		angular.forEach(arr, function(item){

			if(item.name.toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			}

		});

    if(result.length > 10)
      result = result.slice(0,10);

		return result;
	};

});

app.controller("homeCtlr",function($scope, $http, $window){

	$scope.create_customer = function(name){
    $http({
      url: "/create_customer",
      method: "POST",
      params: {name : name}
    }).then(function(resp){
      console.log(resp['data']);
    }, function(err){
        console.log("failure");
    });
  }

  $scope.get_instances = function(id){
    $http({
      url: "/get_instances",
      method: "GET",
      params: {id : id}
    }).then(function(resp){
      $scope.instances = resp['data'];
			console.log(id);
    }, function(err){
        console.log("failure");
    });
  }

	$scope.redirect = function(id){
		$window.location.href = '/customer/'+id;
	}

  $scope.init = function(){
    $scope.customers = [];
    $scope.instances = [];
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

	$scope.noEntry = function(){
		if(!$scope.customers || !$scope.searchString)
			return false;
		if($scope.customers.length == 0 && $scope.searchString.length > 1)
			return true;
		return false;
	}
});
