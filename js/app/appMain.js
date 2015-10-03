/*Dispatcher App module*/

	var angularApp = angular.module('angularAppRouter',['ui.router', 'angularUtils.directives.uiBreadcrumbs',
	'ui.bootstrap', 'ngTouch', 'angucomplete-alt','validation', 'validation.rule']);
	
	angularApp.config(function($stateProvider, $urlRouterProvider){
	  $urlRouterProvider.otherwise('/login');
	  $stateProvider
	  /**** login screen and other nested screens *******/
	  .state('login',{
			url:'/login',
			controller:'loginController',
			templateUrl: 'login.html'
	  })
	  
	.state('home', {
			url:'/home',
			templateUrl: 'views/home.html',
			controller:'landingController',
			displayName:'Home'
		})
		
		.state('home.Application1', {
			url:'/search',
			controller:'Application1ListController',
			templateUrl: 'views/app1/app1.html',
			displayName:'Application1 Configuration'
		})
		.state('home.Application1Add', {
			url:'/Application1Add/:metaName',
			controller:'Application1AddController',
			templateUrl: 'views/app1/app1Add.html',
			displayName:'Add Application1 Configuration'
		})
		.state('home.Application1edit', {
			url:'/Application1edit/:rowID',
			controller:'Application1EditController',
			templateUrl: 'views/app1/app1Edit.html',
			displayName:'Edit Application1 Configuration'
		})
		.state('home.Application1log', {
		    url:'/Application1log/:jobID',
			controller:'Application1LogController',
			templateUrl:'views/app1/app1Log.html',
			displayName:'View Application1 Log'
		})
		
	});
	

		