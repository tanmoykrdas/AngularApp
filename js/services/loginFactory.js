/******* login factory *****/

	angularApp.factory('loginFactory', function(){
		 var userName = "";
		var loginFactoryObj = {
		     
		     setUser: function(uName){
			    userName =  uName;
			 },
			 getUser: function(){
			   return userName;
			 }
		
		};
		return loginFactoryObj;
	});