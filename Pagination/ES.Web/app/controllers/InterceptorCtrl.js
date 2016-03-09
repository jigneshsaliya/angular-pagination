eSWebController = angular.module('eSWebController', []);

eSWebController.controller('InterceptorCtrl', ['$scope', '$state','dummyServices','ngTableParams',
	function ($scope,$state,dummyServices,ngTableParams) {
		$scope.flightArray = [];
		$scope.getData = function(){
			dummyServices.tokenBasedService().then(function (response) {
		        console.log(response);
		        $scope.flightArray = [];
		        $scope.flightArray = response.PricedItinerariesResponse.PricedItinerary;
		        console.log($scope.flightArray);

		    },
		    function (err) {
		        $scope.message= "Get Service is not working.";
		    });
		};


		
	}

]);

eSWebController.controller('f7Ctrl', ['$scope', '$state','dummyServices','ngTableParams',
	function ($scope,$state,dummyServices,ngTableParams) {
		$scope.flightArray = [];
		$scope.getData = function(){
			dummyServices.tokenBasedService().then(function (response) {
		        console.log(response);
		        $scope.flightArray = [];
		        $scope.flightArray = response.PricedItinerariesResponse.PricedItinerary;
		        console.log($scope.flightArray);

		    },
		    function (err) {
		        $scope.message= "Get Service is not working.";
		    });
		};


		
	}

]);
