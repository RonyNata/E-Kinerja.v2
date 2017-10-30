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

        service.GetUrtugNonDPA = function (nipPegawai) {
            var deferred = $q.defer();
            $http.get(API + 'get-uraian-tugas-pegawai-tahunan-by-nip/' + nipPegawai).then(
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
 
        return service;
    }])
    /* jshint ignore:end */

})();
