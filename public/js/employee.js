var app = angular.module('employee_app',[])


app.controller('employee_ctrl',function($scope, $http) {
    $scope.click = function() {
    	$scope.employees=[]
        var response = $http.get('/employees')
        response.success(function(data, status, headers, config) {
            $scope.employees=data
        })
        response.error(function(data, status, headers, config) {
            alert("Error.")
        })
    }
    $scope.click()
})