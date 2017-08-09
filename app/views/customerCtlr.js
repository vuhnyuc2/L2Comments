var app = angular.module("customerView", ['ngRoute']);

app.controller("customerCtlr",function($rootScope, $scope, $http, $location){
  $scope.getInstanceInfo = function(id){
    $scope.instanceData = {};
    $http({
      url: "/customer/" + id.toString() + "/info/",
      method: "GET"
    }).then(function(resp){
      console.log(resp['data']);
      return resp['data'];
    }, function(err){
      console.log(err);
    });
  }

  $rootScope.save_info = function(id, info_field, info_value){
    var params = {
      field: info_field,
      value: info_value
    };
    params = JSON.stringify(params);

    $http({
      url: "/customer/" + id.toString() + "/edit/",
      method: "POST",
      headers: {
         'Content-Type': "application/json"
       },
      data: params
    }).then(function(resp){
      console.log(resp['data']);
      $scope.instanceData = resp['data'];
    }, function(err){
      console.log(err);
    });
  }

  $scope.getPmrUrl = function(pmr){
    values = pmr.split(',');
    url = "https://longspeakz.boulder.ibm.com/WebRetain/DispatcherServlet?oper=pmrDisplay&pmrnumber=" +
    values[0] + "&branch=" + values[1] + "&country=" + values[2] + "&library=current&type=Software";
    return url;
  }

  $scope.init = function(){
    url = $location.absUrl().split('/').pop();
    $scope.customer = [];
    $scope.instances = [];
    $scope.tabSelected = 0;
    $scope.instance_info = [];
    $scope.field_names = ["bpm_application", "db_type", "jdk_version", "process_center", "was_version", "bpm_version", "db_version", "os", "process_server"];
    $scope.field_text = ["BPM Application", "Database Type", "JDK Version", "Process Center", "WAS Version", "BPM Version", "Database Version", "OS", "Process Server"];
    $http({
      url: "/customer/get/" + url,
      method: "GET"
    }).then(function(resp){
      $scope.customer = resp['data'].customer;
      $scope.instances = resp['data'].instances;
      $rootScope.tabSelected = $scope.instances[0].id;
      console.log($scope.instances);
    }, function(err){
        console.log(err);
    });
    $scope.getInstanceInfo($scope.tabSelected);
  }

  $scope.setTab = function(tab) {
    $rootScope.tabSelected = tab;
  }

  $scope.isSelectedTab = function(tab, type){
    if(angular.isUndefined($rootScope.tabSelected))
      return "";

    if(tab == $rootScope.tabSelected) {
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

app.directive('clickToEdit', function($timeout, $rootScope) {
    return {
        require: 'ngModel',
        scope: {
            model: '=ngModel',
            fieldname: '=info',
            type: '@type'
        },
        replace: true,
        transclude: false,
        template:
            '<div class="templateRoot">'+
                '<div class="hover-edit-trigger" title="click to edit">'+
                    '<div class="hover-text-field" ng-show="!editState" ng-click="toggle()">{{model}}<div class="edit-pencil glyphicon glyphicon-pencil"></div></div>'+
                    '<input class="inputText" type="text" ng-model="localModel" ng-enter="save()" ng-show="editState && type == \'inputText\'" />' +
                '</div>'+
                '<div class="edit-button-group pull-right" ng-show="editState">'+
                    '<div class="glyphicon glyphicon-ok"  ng-click="save()"></div>'+
                    '<div class="glyphicon glyphicon-remove" ng-click="cancel()"></div>'+
                '</div>'+
            '</div>',
        link: function (scope, element, attrs) {
            scope.editState = false;

            // make a local ref so we can back out changes, this only happens once and persists
            scope.localModel = scope.model;

            // apply the changes to the real model
            scope.save = function(){
                scope.model = scope.localModel;
                console.log(scope.fieldname);
                $rootScope.save_info($rootScope.tabSelected, scope.fieldname, scope.model);
                scope.toggle();
            };

            // don't apply changes
            scope.cancel = function(){
                scope.localModel = scope.model;
                scope.toggle();
            }

            scope.toggle = function () {

                scope.editState = !scope.editState;

                var x1 = element[0].querySelector("."+scope.type);

                $timeout(function(){
                    // focus if in edit, blur if not. some IE will leave cursor without the blur
                    scope.editState ? x1.focus() : x1.blur();
                }, 0);
            }
        }
    }
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});
