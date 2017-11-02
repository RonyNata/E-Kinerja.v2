 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('AjuanKontrakService',
    ['$http', 'API', '$q',
    function ($http, API, $q) {
        var service = {}; 
        service.GetUrtugByNip = function (nipPegawai) {
            var deferred = $q.defer();
            $http.get(API + 'get-uraian-tugas-pegawai-tahunan-by-nip/' + kdJabatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetPegawaiPengaju = function (kdUnitKerja) {
            var deferred = $q.defer();
            $http.get(API + 'get-uraian-tugas-tahunan-by-unit-kerja/' + kdUnitKerja).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.ApproveKontrak = function (data) {
            var deferred = $q.defer();
            $http.put(API + 'approval-urtug-tahunan-non-dpa-pegawai/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetIndexUrtugById = function(kdUrtug, array){
                    debugger
            for(var i = 0; i < array.length; i++)
                if(array[i].kdUrtug == kdUrtug){
                    return i; break;
                }
        };
 
        return service;
    }])
    /* jshint ignore:end */

})();
