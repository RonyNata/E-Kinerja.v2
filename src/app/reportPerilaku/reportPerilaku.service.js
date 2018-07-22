(function(){
	'use strict';
	angular.module('eKinerja').factory('ReportPerilakuService',
		['$http', 'API', '$q',function($http, API, $q){
			var service = {};
			service.GetPerilaku =  function(kdUnitKerja, bulan){
				var deferred = $q.defer();
				$http.get(API + 'get-rekapitulasi-perilaku-kerja-pegawai-by-kd-kdUnitKerja-and-bulanTahun/' + kdUnitKerja + '/' + bulan).then(
					function(responce){
						deferred.resolve(responce.data);
					},
					function(errResponce){
						deferred.reject(errResponce);
					}
				);
				return deferred.promise;
			};

			service.CreatePerilaku = function (data) {
				var deferred = $q.defer();
				$http.post(API + 'create-rekapitulasi-perilaku-kerja-pegawai/', data).then(
					function(responce){
						deferred.resolve(responce.data);
					},
					function(errResponce){
						deferred.reject(errResponce);
					}
				);
				return deferred.promise;
			};
			return service;
		}])
})();