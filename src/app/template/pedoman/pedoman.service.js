(function(){
	'use strict';

	angular.module('eKinerja')
		.service('PedomanService', PedomanService);

	function PedomanService(API_REPORT, $http, $q){
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

        service.bab = function(idx){
            var kamus = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", 
            "XVII", "XVIII", "XIX", "XX"];
            return kamus[idx];
        }

		return service;
	}
})();