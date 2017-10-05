var app = angular.module('employeeApp',[]);

app.controller('empController',function($scope){
   $scope.emplist = { "empFName":"" ,"empLName":"","designation": "","locationName": "","qualification": "","percentage": ""};
   $scope.employees = [];
	$scope.saveEmp = function(){
	    var empData = $scope.emplist;
		$scope.emplist = { "empFName":"" ,"empLName":"","designation": "","locationName": "","qualification": "","percentage": ""};
		$scope.employees.push(empData);
		alert("Employee Details Saved Successfully");
	}
	$scope.cancelEmp = function(){
		$scope.emplist = { "empFName":"" ,"empLName":"","designation": "","locationName": "","qualification": "","percentage": ""};
	}
});