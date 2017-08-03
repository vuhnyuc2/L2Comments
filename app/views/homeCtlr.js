var app = angular.module("home", []);

app.filter('searchFor', function(){

	return function(arr, searchString){

		if(!searchString){
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		angular.forEach(arr, function(item){

			if(item.name.toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			}

		});

		return result;
	};

});

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
  //PlaceHolder for test search
  $scope.companies = [
    {
      name : 'Walmart',
      otherInfo : 'none'
    },
    {
      name : 'IBM',
      otherInfo : 'none'
    },
    {
      name : 'Citibank',
      otherInfo : 'none'
    },
    {
      name : 'BestBuy',
      otherInfo : 'none'
    }
  ]
});
