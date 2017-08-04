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

app.controller("homeCtlr",function($scope, $http){

  $scope.get_instances = function(id){
    $http({
      url: "/get_instances",
      method: "GET",
      params: {id : id}
    }).then(function(resp){
      $scope.instances = resp['data'];
    }, function(err){
        console.log("failure");
    });
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
});
