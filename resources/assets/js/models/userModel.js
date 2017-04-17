/**
 * Created by pcsaini on 17/4/17.
 */
myApp.factory('userModel',['$http', function ($http) {
    var userModel = {};
    userModel.doLogin: function(data){
        return $http({
            headers:{
                'Content-Type':'application/json'
            },
            url:baseUrl+'auth',
            method:"post",
            data:{
                email:data.username,
                password: data.password
            }
        }).then(function (responces) {
            console.log(responces.data);
        },function (responces) {
            console.log(responces);
            alert(responces.data);
        });
    }
    return userModel;
}]);