(function(){
	'use strict';

	angular.module('eKinerja').service('PenilaianService', PenilaianService);

	function PenilaianService($http, $q, API){
		var service = {};
		service.GetLaporanBawahan = function (nipPegawai) {
            var deferred = $q.defer();
            $http.get(API + 'get-laporan-bawahan/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.Tolak = function (data) {
            var deferred = $q.defer();
            $http.put(API + 'tolak-laporan/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        return service;
	}

})();