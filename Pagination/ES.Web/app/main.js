//defining module for the users.html page
var esWebApp = angular.module('ESWeb', ['ui.router','eSWebController','esWebConfig','ngTable'])
.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider.state("page", {
        url: "/page",
        views : {
            MainView : {
                templateUrl : "partials/login.html",
                controller : "LoginCtrl"
            }
        }
    })
    .state("interceptor", {
        url: "/interceptor",
        views : {
            MainView : {
                templateUrl : "partials/interceptor.html",
                controller : "InterceptorCtrl"
            }
        }
    });
    //default view
    $urlRouterProvider.otherwise("/page");  
});

esWebApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

esWebApp.run(['$rootScope', '$state', '$stateParams',

    function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
    }
]);