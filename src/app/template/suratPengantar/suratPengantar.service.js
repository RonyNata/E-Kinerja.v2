(function(){
	'use strict';

	angular.module('eKinerja')
		.service('SuratPengantarService', SuratPengantarService);

	function SuratPengantarService(API_REPORT, $http, $q){
		var service = {};

		service.save = function(data){
            var deferred = $q.defer();
            $http.post(API_REPORT + 'create-nodin-report/', data).then(
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