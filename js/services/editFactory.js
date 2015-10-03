/******* login factory *****/

	angularApp.factory('editFactory', function(){
		var dispatcherDetails = {}; 
		var editFactoryObj = {
		     setObj: function(index){
				dispatcherDetails =  index;
				
			 },
			 getObj: function(){
			   return dispatcherDetails;
			   console.log("editFactory:getObj"+dispatcherDetails);
			 }
		
		};
		
		return editFactoryObj;
	});