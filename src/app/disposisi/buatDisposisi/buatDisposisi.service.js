(function(){
	'use strict';

	angular.module('eKinerja').service('AmbilDisposisiService', AmbilDisposisiService);

	function AmbilDisposisiService($http, $q, API){
		var service = {};
		service.GetAllDisposisi = function (nipPegawai) {
            var deferred = $q.defer();
            $http.get(API + 'get-lembar-disposisi-target/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetDraftDisposisi = function (kdUnitKerja, nipPegawai) {
            var deferred = $q.defer();
            $http.get(API + 'get-draft-lembar-disposisi/' + kdUnitKerja + '/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetDokumenDisposisi = function (kdLembarDisposisi) {
            var deferred = $q.defer();
            $http.get(API + 'get-dokumen-lembar-disposisi/' + kdLembarDisposisi).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.GetHistoryDisposisi = function (nipPegawai) {
            var deferred = $q.defer();
            $http.get(API + 'get-lembar-disposisi-by-pembuat/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetTree = function (kdSurat) {
            var deferred = $q.defer();
            $http.get(API + 'get-lembar-disposisi-tree/' + kdSurat).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetFile = function (kdSurat) {
            var deferred = $q.defer();
            $http.get(API + 'get-surat-disposisi/' + kdSurat).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetTreeAtasan = function (kdSurat) {
            var deferred = $q.defer();
            $http.get(API + 'get-lembar-disposisi-tree-by-leave/' + kdSurat).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

		service.Batal = function (kdSurat) {
            var deferred = $q.defer();
            $http.put(API + 'cancel-lembar-disposisi/' + kdSurat).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.Approve = function (data) {
            var deferred = $q.defer();
            $http.put(API + 'approve-draft-lembar-disposisi/', data).then(
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
