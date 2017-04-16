/**
 * Created by pcsaini on 16/4/17.
 */
myApp.controller('userController',['$scope','$http', function ($scope,$http) {
    angular.extend($scope,{
        doLogin:function (loginFrom) {
            $http({
                headers:{
                    'Content-Type':'application/json'
                },
                url:baseUrl+'auth',
                method:"post",
                data:{
                    email:$scope.login.username,
                    password: $scope.login.password
                }
            }).then(function (responces) {
                console.log(responces.data);
            },function (responces) {
                console.log(responces);
                alert(responces.data);
            });
        }
    });
}]);
