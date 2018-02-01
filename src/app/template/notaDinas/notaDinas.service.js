(function(){
	'use strict';

	angular.module('eKinerja')
		.service('NotaDinasService', NotaDinasService);

	function NotaDinasService(API, $http, $q){
		var service = {};

		service.save = function(data){
            var deferred = $q.defer();
            $http.post(API + '/create-nota-dinas', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

		return service;
	}
})();