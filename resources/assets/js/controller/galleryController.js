/**
 * Created by pcsaini on 17/4/17.
 */
myApp.controller('galleryController',['$scope','$location','$timeout','$routeParams','galleryModel',
    function ($scope,$location,$timeout,$routeParams,galleryModel,Lightbox) {

        /*Get All Galleries*/
        galleryModel.gatAllGalleries().success(function (responce) {
            $scope.galleries = responce;
            $scope.showGalleries = true;

        });

        if ($routeParams.id){
            console.log("Single Page Gallery "+ $routeParams.id);
            galleryModel.getGalleryById($routeParams.id).success(function (responce) {
                $scope.singleGallery = responce;
                console.log(responce);
            })
        }

        $scope.$on('imageAdded',function (event, args) {
           $scope.singleGallery = args;
           $scope.$apply();
        });


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
                        formData.append('_token',csrfToken);
                        formData.append('gallery_id',$routeParams.id);
                    },
                    'success': function (file,response) {
                        console.log(response);
                        $scope.singleGallery.images.push(response);
                        $scope.$emit('imageAdded',$scope.singleGallery);
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
            },
            openLightboxModal: function (index) {
                Lightbox.openModal($scope.singleGallery.images, index);
            },
            deleteImage:function (imageId) {
                console.log("Delete Image "+imageId);
                var data = {
                    imageId: imageId,
                    galleryId: $routeParams.id
                };

                galleryModel.deleteSingleGallery(data).success(function (responce) {
                    $scope.singleGallery = responce;
                    console.log(responce);
                });
            }
        })


}]);