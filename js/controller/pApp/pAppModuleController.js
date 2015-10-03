

/**************** createService controller *******************/

angularApp.service('createService', function () {
	
});
angularApp.controller('createService', function ($scope, $http, IndexingService) {
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
  
});

/*============================================================================================================================*/
/************* Application1 add controller ******************/


angularApp.controller('Application1AddController',['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
	$scope.remoteUrlRequestFn = function(str) {
      return {q: str};
    };
	
	var selectedName = $stateParams.metaName;
	console.log("selectedName::"+selectedName);
	console.log("get data from::"+'data/'+ selectedName +'/dedupeNew.json')
			$http.get('data/'+ selectedName +'/dedupeNew.json').
				  success(function(dedupeData, status, headers, config){
					
					// loops through the array, if there exists value for ID,get its position from database.
					for(var i = 0; i < dedupeData.length; i++){
						if(dedupeData[i].type == 'ID'){
							dedupeData[i].id_pos = dedupeData[i].position;
						}else{
							dedupeData[i].id_pos = 0;
						}
					}
					
					$scope.dedupe_list = dedupeData;
				  }).
				  error(function(data, status, headers, config){
				  
				  });
	
	$scope.changeNoOfChar = function(count){
		if ($('#additional_attr_'+count).prop('checked') == false){ 
			if($('#no_of_char_'+count).val() !=''){
			   $('#no_of_char_'+count).val('');
			}
		}
	}
	$scope.changeComparator = function(val, count){
		var comparator_type = $('#type_'+count).val();
		if(comparator_type == 'ID'){
			$('#additional_attr_'+count).attr('disabled', 'disabled');
			if ($('#additional_attr_'+count).prop('checked') == true){
				$('#additional_attr_'+count).attr('checked', false);
				$scope.dedupe_list[count].additional_attributes = false;
			}
			// clears the number of characters text field	
			if($('#no_of_char_'+count).val() !=''){
			   $('#no_of_char_'+count).val('');
			}
			$('#no_of_char_'+count).attr("disabled", 'disabled');
		}else{
			console.log('Else');
			$('#additional_attr_'+count).prop('disabled',false);
		}
		$('#no_of_char_'+count).keyup(function () { 
			this.value = this.value.replace(/[^0-9\.]/g,'');
		});

		/******** checking starts if the selected value is ID ********/
		if(val == 'ID'){
			for(var i = 0; i < $scope.dedupe_list.length; i++){
				/******** checks if the database type is ID and checks the position is greater than 0 ********/
				if($scope.dedupe_list[i].type == 'ID' && $scope.dedupe_list[i].id_pos > 0){  
					var position = $scope.dedupe_list[i].id_pos-1;
					$scope.dedupe_list[position].type = '';
				}else{
				/******** checks if the change for the value of ID is done from the dropdown,no database type exists for ID ********/
					$('#id_pos_'+count).val(count);
					/******** loops through all dropdowns and checks if entry for ID exists,deselect previous selection for ID ********/
					for(var i = 0; i < $scope.dedupe_list.length; i++){
						if($scope.dedupe_list[i].type == 'ID'){
							$scope.dedupe_list[i].type = '';
						}
						$scope.dedupe_list[count].type = 'ID';
					}
				}	
			}
		}	
	}
	
	$scope.saveIndex = function(){
		var len = $scope.dedupe_list.length;
		var dedupe_arr = [];
		var dedupe_obj = {};
		var threshold_value = $('#threshold_val').val();
		var tolerance_value = $('#tolerance_val').val();
		if(tolerance_value > threshold_value){
			$('#tolerance_error').html('<span><div role="alert" class="alert-danger">Tolerance value should be less than threshold value</div></span>');
		}else{
			$('#tolerance_error').html('');
		}
		for(var i = 0; i < len; i++){
			var type            = $scope.dedupe_list[i].type;
			var no_of_char      = $scope.dedupe_list[i].no_of_char;
			dedupe_obj.name     = $scope.dedupe_list[i].name;
			dedupe_obj.position = $scope.dedupe_list[i].position || i+1;
			
			if(type != -1 || no_of_char >0){
				if(type != -1){
					dedupe_obj.type = type;
				}
				if(no_of_char > 0){
					dedupe_obj.no_of_char = no_of_char
				}
				dedupe_arr.push(dedupe_obj);
			    dedupe_obj = {};
			}
		}
		
		var dedupelist_arr = [];
		dedupelist_arr.push({
								'columnCount':len,
								'columns':dedupe_arr,
								'threshold': $scope.comparators_list.threshold_val,
								'tolerance':$scope.comparators_list.tolerance_val,
								'source_path':$scope.comparators_list.source_path,
								'target_path':$scope.comparators_list.target_path
							});
		console.debug('Array >>'+JSON.stringify(dedupelist_arr));

	}
	
	
  
}]);

/*============================================================================================================================*/
/**************** Application1 list controller ************/


angularApp.controller('Application1ListController',['$scope', '$http', '$location', function ($scope,$http,$location) {
	
	$scope.remoteUrlRequestFn = function(str) {
      return {q: str};
    };
	
	
	$scope.dwObjectSelected = function(selected) {
		if(selected){
				var selectedTitle = selected.title;
				var selectedName = selected.originalObject.name;
				$scope.seletedObj = {'name':selected.originalObject.name, 'id':selected.originalObject.id};
				
				$http.get('data/'+ selectedName +'/dedupeList.json').
				  success(function(dedupeData, status, headers, config){
					
					var id = (selected.originalObject).id;
					var name = (selected.originalObject).name;
					var dedupe_listData = dedupeData;
					console.log("dedupeData::"+dedupeData);
					$scope.dedupe_list = dedupe_listData;
					
					/****** pagination and row listing *****/
					$scope.totalRows = $scope.dedupe_list.length;
					$scope.currentPage = 1;
					$scope.numPerPage = $scope.totalRows;
					console.log("$scope.totalRows::"+$scope.totalRows); 
					$scope.paginate = function(value) {
					var begin, end, index;
					begin = ($scope.currentPage - 1) * $scope.numPerPage;
					end = begin + $scope.numPerPage;
					index = $scope.dedupe_list.indexOf(value);
					return (begin <= index && index < end);
				
					};
				  }).
				  error(function(data, status, headers, config){
						angular.element('.msg').append('<p style="color:red;">List Unavaileble. Please create new.</p>');
				  })
			
			
		   	
		
		}
	 
    };
	
	$scope.editRow = function(index){
		var jobID = index.id;
		console.log("row id::"+jobID)
		//console.log($location.path())
		$location.path('home/dedupeedit/'+jobID)
	}

    $scope.disableInput = true;
	$scope.dw_object = [
			{
				id: 1,
				name: "customer",
				
			},
			{
				id: 2,
				name: "order",
				
			},
			{
				id: 3,
				name: "FMCG",
				
			},
			{
				id: 4,
				name: "Health_Care",
				
			}
	];
}]);


/*============================================================================================================================*/
/**************** Application1 edit controller ****************/


angularApp.controller('Application1EditController',['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
	$scope.remoteUrlRequestFn = function(str) {
      return {q: str};
    };
	
	var selectedName = $stateParams.rowID;
	console.log("selectedName::"+selectedName);
	console.log("get data from::"+'data/'+ selectedName +'/dedupeEdit.json')
			$http.get('data/'+ selectedName +'/dedupeNew.json').
				  success(function(editData, status, headers, config){
					// loops through the array, if there exists value for ID,get its position from database.
					for(var i = 0; i < editData.length; i++){
						if(editData[i].type == 'ID'){
							editData[i].id_pos = editData[i].position;
						}else{
							editData[i].id_pos = 0;
						}
					}
					$scope.dedupe_list = editData;
				  }).
				  error(function(data, status, headers, config){
				  
				  });
	
	$scope.changeNoOfChar = function(count){
		if ($('#additional_attr_'+count).prop('checked') == false){ 
			if($('#no_of_char_'+count).val() !=''){
			   $('#no_of_char_'+count).val('');
			}
		}
	}
	
	$scope.changeComparator = function(val, count){
		var comparator_type = $('#type_'+count).val();
		if(comparator_type == 'ID'){
			$('#additional_attr_'+count).attr('disabled', 'disabled');
			if ($('#additional_attr_'+count).prop('checked') == true){
				$('#additional_attr_'+count).attr('checked', false);
				$scope.dedupe_list[count].additional_attributes = false;
			}
			// clears the number of characters text field	
			if($('#no_of_char_'+count).val() !=''){
			   $('#no_of_char_'+count).val('');
			}
			$('#no_of_char_'+count).attr("disabled", 'disabled');
		}else{
			console.log('Else');
			$('#additional_attr_'+count).prop('disabled',false);
		}
		$('#no_of_char_'+count).keyup(function () { 
			this.value = this.value.replace(/[^0-9\.]/g,'');
		});

		/******** checking starts if the selected value is ID ********/
		if(val == 'ID'){
			for(var i = 0; i < $scope.dedupe_list.length; i++){
				/******** checks if the database type is ID and checks the position is greater than 0 ********/
				if($scope.dedupe_list[i].type == 'ID' && $scope.dedupe_list[i].id_pos > 0){  
					var position = $scope.dedupe_list[i].id_pos-1;
					$scope.dedupe_list[position].type = '';
				}else{
				/******** checks if the change for the value of ID is done from the dropdown,no database type exists for ID ********/
					$('#id_pos_'+count).val(count);
					/******** loops through all dropdowns and checks if entry for ID exists,deselect previous selection for ID ********/
					for(var i = 0; i < $scope.dedupe_list.length; i++){
						if($scope.dedupe_list[i].type == 'ID'){
							$scope.dedupe_list[i].type = '';
						}
						$scope.dedupe_list[count].type = 'ID';
					}
				}	
			}
		}	
	}
	
	$scope.saveIndex = function(){
		var len = $scope.dedupe_list.length;
		var dedupe_arr = [];
		var dedupe_obj = {};
		var threshold_value = $('#threshold_val').val();
		var tolerance_value = $('#tolerance_val').val();
		if(tolerance_value > threshold_value){
			$('#tolerance_error').html('<span><div role="alert" class="alert-danger">Tolerance value should be less than threshold value</div></span>');
		}else{
			$('#tolerance_error').html('');
		}
		for(var i = 0; i < len; i++){
			var type            = $scope.dedupe_list[i].type;
			var no_of_char      = $scope.dedupe_list[i].no_of_char;
			dedupe_obj.name     = $scope.dedupe_list[i].name;
			dedupe_obj.position = $scope.dedupe_list[i].position || i+1;
			
			if(type != -1 || no_of_char >0){
				if(type != -1){
					dedupe_obj.type = type;
				}
				if(no_of_char > 0){
					dedupe_obj.no_of_char = no_of_char
				}
				dedupe_arr.push(dedupe_obj);
			    dedupe_obj = {};
			}
		}
		
		var dedupelist_arr = [];
		dedupelist_arr.push({
								'columnCount':len,
								'columns':dedupe_arr,
								'threshold': $scope.comparators_list.threshold_val,
								'tolerance':$scope.comparators_list.tolerance_val,
								'source_path':$scope.comparators_list.source_path,
								'target_path':$scope.comparators_list.target_path
							});
		console.debug('Array >>'+JSON.stringify(dedupelist_arr));

	}
}]);

/************** Application1 log controller ************************/

angularApp.controller('Application1LogController',['$scope','$state', '$http','$location', '$stateParams', function ($scope,$state, $http, $location, $stateParams) {
	
	var selectedID = $stateParams.jobID;
	console.log("selectedName::"+selectedID);
	
	
	$scope.matchedView = function(matched){
	console.log("matchedView")
		$state.go(matched)
	}
	
}]);


