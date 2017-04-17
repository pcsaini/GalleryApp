var myApp = angular.module('myApp',['ngRoute','ngCookies']);
myApp.config(['$routeProvider','$locationProvider',
    function ($routeProvider,$locationProvider) {
        $routeProvider.when('/',{
            templateUrl:'templates/users/login.html',
            controller:'userController'
        });

        $routeProvider.when('/logout',{
            templateUrl:'templates/users/logout.html',
            controller:'userController',
            authenticated: true
        });

        $routeProvider.when('/dashboard',{
            templateUrl:'templates/users/dashboard.html',
            controller:'userController',
            authenticated: true
        });

        $routeProvider.when('/gallery/view',{
            templateUrl:'templates/gallery/gallery-view.html',
            controller:'galleryController',
            authenticated: true
        });

        $routeProvider.when('/gallery/add',{
            templateUrl:'templates/gallery/gallery-add.html',
            controller:'galleryController',
            authenticated: true
        });

        $routeProvider.otherwise('/');
    }
]);

myApp.run(["$rootScope","$location",'userModel',
    function ($rootScope,$location,userModel) {
        $rootScope.$on("$routeChangeStart",
            function (event ,next, current) {
                if (next.$$route.authenticated){
                    if (!userModel.getAuthStatus()){
                        $location.path('/');
                    }
                }
                if (next.$$route.originalPath == '/'){
                    if (userModel.getAuthStatus()){
                        $location.path(current.$$route.originalPath);
                    }
                }
            });
    }
]);
//# sourceMappingURL=app.js.map
