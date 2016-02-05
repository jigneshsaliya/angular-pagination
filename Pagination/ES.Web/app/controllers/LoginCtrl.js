

esWebApp.controller('LoginCtrl', ['$scope', '$state','dummyServices','ngTableParams',
	function ($scope,$state,dummyServices,ngTableParams) {
		

        var data = '';
        var vm = this;
	    vm.search = '';
	    $scope.geToInterceptor = function(){
	    	$state.go('interceptor');
	    };
	    //Basic Example
	    vm.tableBasic = new ngTableParams({
	        page: 1,            // show first page
	        count: 5           // count per page
	    }, {
	        total: 0, // length of data
	        getData: function ($defer, params) {
	        	console.log();
	        	var pageNo = params.page();
	        	var displayRecordCount = params.count();
	        	var url ='http://zizzamia.com/ng-tasty/table.json?';
	        	if(pageNo !== null){
	        		var sortingOrder='';
	        		if(params.sorting()[Object.keys(params.sorting())] === 'desc'){
	        			sortingOrder = 'dsc';
	        		}else{
	        			sortingOrder = 'asc';
	        		}
	        		 var parameter = "page="+pageNo+"&count="+displayRecordCount+"&sort-by="+Object.keys(params.sorting())[0]+"&sort-order="+sortingOrder;
	        		 url = url+parameter;
	        	}
	        	dummyServices.returnTableData(url).then(function (response) {
	                data = response;
	                params.total(data.pagination.size);
		            data = data.rows;
		            $defer.resolve(data);
	            },
	            function (err) {
	                $scope.message= "Get Service is not working.";
	            });
	        }
	    });
	}
]);
