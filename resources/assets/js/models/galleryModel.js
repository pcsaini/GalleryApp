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
        }
    }
}]);