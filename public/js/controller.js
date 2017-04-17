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
/**
 * Created by pcsaini on 17/4/17.
 */
myApp.controller('globalController',['$scope',function ($scope) {
    $scope.global = {};
    $scope.global.navUrl = 'templates/partials/nav.html';
}]);
/**
 * Created by pcsaini on 17/4/17.
 */

myApp.controller('navController',['$scope','$location','userModel',function ($scope,$location,userModel) {
    /*Variables*/
    angular.extend($scope,{
        user:userModel.getUserObject(),
        navUrl:[{
            link:'Home',
            url:'/dashboard',
            subMenu:[{
                link:'View Gallery',
                url:'/gallery/view'
            }, {
                link:'Add Gallery',
                url:'/gallery/add'
            }]
        }, {
            link:'View Gallery',
            url:'/gallery/view'
        }, {
            link:'Add Gallery',
            url:'/gallery/add'
        }]
    });

    /*Methods*/
    angular.extend($scope,{
        doLogout:function () {
            userModel.doUserLogout();
            $location.path('/');
        },

        checkActiveLink:function (routeLink) {
            if ($location.path() == routeLink){
                return 'make-active';
            }
        }
    })
}]);
/**
 * Created by pcsaini on 17/4/17.
 */
myApp.controller('galleryController',['$scope','$location','$timeout','galleryModel',function ($scope,$location,$timeout,galleryModel) {

    /*Get All Galleries*/
    galleryModel.gatAllGalleries().success(function (responce) {
        $timeout(function () {
            $scope.galleries = responce;
            $scope.showGalleries = true;
        },1000);
    });


    /*Variables*/
    angular.extend($scope,{
        newGallery:{},
        errorDiv:false,
        errorMessage:[]
    });

    /*Functions*/
    angular.extend($scope,{
        saveNewGallery:function (addGalleryForm) {
            if (addGalleryForm.$valid){
                $scope.formSubmitted = false;
                galleryModel.saveGallery($scope.newGallery).success(function (responce) {
                    $location.path('/gallery/view');
                })
            } else{
                $scope.formSubmitted = true;
                console.log('Error');
            }
        }
    })


}]);
//# sourceMappingURL=controller.js.map
