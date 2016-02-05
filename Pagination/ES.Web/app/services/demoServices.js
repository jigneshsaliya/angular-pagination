esWebApp.factory('dummyServices', dummyServices);
dummyServices.$inject = ['$rootScope', '$http','$q'];
function dummyServices($rootScope,$http,$q) {
    var dummyServiceFactory = {};
    var _returnTableData = function(url){
        var deferred = $q.defer();
        $http.get(url).success(function (response) {
            
            
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _tokenBasedService = function(){
        var deferred = $q.defer();
        $http.get("https://apphonics.tcs.com:443/public/ba/flightoffer/v1.0/flightOfferBasic;departureCity=LON;arrivalCity=NYC;cabin=business;journeyType=roundTrip;range=monthLow.json").success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };
    dummyServiceFactory.returnTableData = _returnTableData;
    dummyServiceFactory.tokenBasedService = _tokenBasedService
    return dummyServiceFactory;
}
