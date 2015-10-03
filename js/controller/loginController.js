/*** ***/
	angularApp.controller('loginController',['$scope','$http','$location','loginFactory', function($scope, $http, $location, loginFactory)
		{
			
			$scope.loginForm = {};
			
			var loginObj = angular.fromJson($scope.loginForm);
			$scope.showAttr = function(){
				var userId = $scope.loginForm.userName;
				var password = "hdpsrvc";
				var userPassword = $scope.loginForm.userPassword;
					
					loginFactory.setUser(userId);
					$location.path('/home');
				
			}
			
		}
	]);
	
	