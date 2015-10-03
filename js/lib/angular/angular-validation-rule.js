(function() {
    angular.module('validation.rule', ['validation'])
        .config(['$validationProvider',
            function($validationProvider) {

                var expression = {
                    required: function(value) {
                        return !!value;
                    },
                    url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                    email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                    number: /^\d+$/,
					decimal: /^(\d{0,2})(\.\d{2})$/,
					positive: /^[+]?(\d{0,2})(\.\d{2})$/,
					rangecheck: function(value){
						return value >= 0.01 && value <= 1.00;
					},
                    minlength: function(value, scope, element, attrs, param) {
                        return value.length >= param;
                    },
                    maxlength: function(value, scope, element, attrs, param) {
                        return value.length <= param;
                    }
					
                };

                var defaultMsg = {
                    required: {
                        error: 'This is Required!',
                        success: ''
                    },
                    url: {
                        error: 'This should be Url',
                        success: ''
                    },
                    email: {
                        error: 'This should be Email',
                        success: ''
                    },
                    number: {
                        error: 'This should be Number',
                        success: ''
                    },
					decimal:{
						error: 'This should be decimal number',
                        success: ''
					},
					rangecheck:{
						error: 'This should be within 0.01 and 1.00',
                        success: ''
					},
					positive:{
						error: 'This should be positive and decimal number',
                        success: ''
					},
                    minlength: {
                        error: 'This should be longer',
                        success: ''
                    },
                    maxlength: {
                        error: 'This should be shorter',
                        success: ''
                    }
                };

                $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);

            }
        ]);

}).call(this);
