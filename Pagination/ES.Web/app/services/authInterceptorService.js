esWebApp.factory('authInterceptorService', ['$location', function ($location) {
 
    var authInterceptorServiceFactory = {};
 
    var _request = function (config) {
 
        config.headers = config.headers || {};
 
        
       	//Here you can set your Oauth 2.0 token as well. After log in you can store that token in local storage and 
       	//retrive that token here.
        config.headers.Authorization = 'Bearer JkbG5oEn945yGikoNdeA4ctMLGIa';
        config.headers["Client-Key"] = 'bbxjb9caruj3uy7sqa6b2fcw';
 
        return config;
    }
 
   
 
    authInterceptorServiceFactory.request = _request;
    
    return authInterceptorServiceFactory;
}]);