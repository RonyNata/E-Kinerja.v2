 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('KontrakPegawaiService',
    ['$http', 'API', '$q',
    function ($http, API, $q) {
        var service = {}; 
        service.GetUrtugByJabatan = function (kdJabatan) {
            var deferred = $q.defer();
            $http.get(API + 'get-all-urtug-by-jabatan/' + kdJabatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugNonDPA = function (nipPegawai, kdJabatan) {
            var deferred = $q.defer();
            $http.get(API + 'get-urtug-non-dpa-by-jabatan/' + kdJabatan + '/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugDPA = function (nipPegawai, kdUnitKerja) {
            var deferred = $q.defer();
            $http.get(API + 'get-urtug-dpa-pegawai/' + nipPegawai + '/' + kdUnitKerja).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugKegiatan = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'get-kegiatan-pegawai-by-urtug/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetPejabatPenilai = function(kdJabatan) {
            var deferred = $q.defer();
            $http.get(API + 'get-pejabat-penilai/' + kdJabatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugByNip = function(nip) {
            var deferred = $q.defer();
            $http.get(API + 'get-uraian-tugas-pegawai-tahunan-by-nip/' + nip).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.ChooseUrtug = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'create-daftar-uraian-tugas-pegawai-tahunan/', data).then(
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
    }])
    /* jshint ignore:end */

})();
