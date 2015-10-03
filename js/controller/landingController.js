/*** ***/
	angularApp.controller('landingController',['$scope','$http','$location','loginFactory', function($scope, $http, $location, loginFactory)
		{
			$scope.UserName = loginFactory.getUser();
			var url = $location.url();
			var selectedUrl = url.substring(1);
			console.log("currentPage::"+selectedUrl);
			
			
			
		}
	]);
	
	