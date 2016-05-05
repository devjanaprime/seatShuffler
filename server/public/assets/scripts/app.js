var app = angular.module('app', []);
app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    $scope.student = {};
    $scope.students = [];
    var fetchStudents = function(){
        return $http.get('/students').then(function(response){
            if(response.status !==200){
                throw new Error('Failed to fetch students from the API');
            }
            $scope.student = {};
            $scope.students = response.data;
            return response.data;
        })
    };
    $scope.add = function(student){
        return $http.post('/add', student).then(fetchStudents);
    };
    $scope.delete = function(student){
        console.log(student);
        return $http.delete('/delete', student).then(fetchStudents);
    };
    fetchStudents();
}]);