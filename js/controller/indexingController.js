/*** ***/

angularApp.service('createService', function () {
	
});
angularApp.controller('createService', function ($scope, $http, createService) {
	$scope.remoteUrlRequestFn = function(str) {
      return {q: str};
    };
	$scope.dwObjectSelected = function(selected) {
		if(selected){
		   $('#processing_container').show();
		   var id = (selected.originalObject).id;
		   var name = (selected.originalObject).name;
		   var indexing_list = [{"name":"id","position":1,"is_index":true,"additional_attributes":true},{"name":"name","position":2,"is_index":false,"additional_attributes":true},{"name":"email","position":3,"is_index":false,"additional_attributes":false}];		
			$scope.indexing_list = indexing_list;	
		}
	 
    };

    $scope.disableInput = true;
	$scope.dw_object = [
			{
				id: 1,
				name: "customer",
				price: 499.98
			},
			{
				id: 2,
				name: "order",
				price: 134.99
			},
			{
				id: 3,
				name: "Mislleanous",
				price: 49.95
			},
			{
				id: 4,
				name: "Food menu",
				price: 69.24
			}
	];
	
	$scope.saveIndex = function(){
		var index_arr = [];
		var len = $scope.indexing_list.length;
		for(var i=0;i<len;i++){
			index_arr.push({
				'name':$scope.indexing_list[i].name,
				'position':$scope.indexing_list[i].position || i+1,
				'isIndex':$scope.indexing_list[i].is_index,
				'isAdditionalAttr':$scope.indexing_list[i].additional_attributes
			});
		}
		console.debug('Array >>'+JSON.stringify(index_arr));
		
	}
  
})

	