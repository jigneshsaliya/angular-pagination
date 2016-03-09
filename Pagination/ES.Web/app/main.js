//defining module for the users.html page

var esWebApp = angular.module('ESWeb', ['ui.router','eSWebController','esWebConfig','ngTable'])
.run(['framework7',function(Framework7) {
  Framework7.register({
    modalTitle: 'Framework7',
    material: true
  });
}])
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
    })
    .state("f7", {
        url: "/f7",
        views : {
            MainView : {
                templateUrl : "partials/f7.html",
                controller : "f7Ctrl"
            }
        }
    });
    //default view
    $urlRouterProvider.otherwise("/f7");  
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
esWebApp.controller('root.controller', ['$rootScope','$state', 'framework7',function($rootScope, $state, Framework7) {
    //
    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    //
    // });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      setTimeout(function() {
        Framework7.getInstance().initPage($('.pages'));
      });
    });
    // $rootScope.$on('$viewContentLoading', function(event, toState, toParams, fromState, fromParams) {
    //
    // });
    $rootScope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams) {
      // event.preventDefault();
    });
  }]);


