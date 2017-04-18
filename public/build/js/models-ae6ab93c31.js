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
/**
 * Created by pcsaini on 17/4/17.
 */
myApp.factory('galleryModel',['$http',function ($http) {
    return{
        saveGallery:function (galleryData) {
            return $http({
                headers:{
                    'Content-Type':'application/json'
                },
                url: baseUrl + 'gallery',
                method:"POST",
                data:{
                    name:galleryData.name
                }
            })
        },

        gatAllGalleries: function () {
            return $http.get(baseUrl + 'gallery');
        },

        getGalleryById:function (id) {
            return $http.get(baseUrl + 'gallery/' + id);
        }


    }
}]);
//# sourceMappingURL=models.js.map
