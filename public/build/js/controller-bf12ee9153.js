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
myApp.controller('galleryController',['$scope','$location','$timeout','$routeParams','galleryModel',function ($scope,$location,$timeout,$routeParams,galleryModel) {

    /*Get All Galleries*/
    galleryModel.gatAllGalleries().success(function (responce) {
        $scope.galleries = responce;
        $scope.showGalleries = true;

    });

    if ($routeParams.id){
        console.log("Single Page Gallery "+ $routeParams.id);
        galleryModel.getGalleryById($routeParams.id).success(function (responce) {
            $scope.singleGallery = responce;
        })
    }


    /*Variables*/
    angular.extend($scope,{
        newGallery:{},
        errorDiv:false,
        errorMessage:[],
        singleGallery:{},
        dropzoneConfig : {
            'options': { // passed into the Dropzone constructor
                'url': baseUrl + 'upload-file'
            },
            'eventHandlers': {
                'sending': function (file, xhr, formData) {
                    console.log("Sending");
                    formData.append('_token',csrfToken);
                    formData.append('gallery_id',$routeParams.id);
                },
                'success': function (file, response) {
                    console.log("Success");
                }

            }
        }
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
        },
        viewGallery: function (id) {
            $location.path('/gallery/view/'+id);
        }
    })


}]);
//# sourceMappingURL=controller.js.map
