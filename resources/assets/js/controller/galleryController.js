/**
 * Created by pcsaini on 17/4/17.
 */
myApp.controller('galleryController',['$scope','$location','$timeout','galleryModel',function ($scope,$location,$timeout,galleryModel) {

    /*Get All Galleries*/
    galleryModel.gatAllGalleries().success(function (responce) {
        $scope.galleries = responce;
        $scope.showGalleries = true;

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