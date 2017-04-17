/**
 * Created by pcsaini on 16/4/17.
 */
myApp.controller('userController',['$scope','userModel','$location', function ($scope,userModel,$location) {

    angular.extend($scope,{
        doLogin:function (loginForm) {
            var data = {
            	email:$scope.login.username,
                password: $scope.login.password
            };

            userModel.doLogin(data).then(function mySuccess(){
            	$location.path('/dashboard');
            });
        },

        
    });
}]);