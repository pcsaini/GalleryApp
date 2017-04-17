/**
 * Created by pcsaini on 17/4/17.
 */
myApp.factory('userModel',['$http','$cookieStore', function ($http,$cookieStore) {
    var userModel = {};
    userModel.doLogin = function(loginData){
        return $http({
            headers:{
                'Content-Type':'application/json'
            },
            url:baseUrl+'auth',
            method:"post",
            data:{
                email:loginData.email,
                password: loginData.password
            }
        }).success(function (responces) {
            console.log(responces);
            $cookieStore.put('auth',JSON.stringify(responces));
        }).error(function (data,state,header) {
            console.log(data,state,header);
            alert(data);
        })
    };

    userModel.getAuthStatus = function () {
        var status = $cookieStore.get('auth');
        if (status){
            return true;

        }else{
            return false;
        }
    };

    userModel.getUserObject = function () {
        var userObj = angular.fromJson($cookieStore.get('auth'));
        return userObj;
    };
    
    userModel.doUserLogout = function () {
        $cookieStore.remove('auth');
    };

    return userModel;
}]);