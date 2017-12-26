 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('PenugasanService',
    ['$http', 'API', '$q',
    function ($http, API, $q) {
        var service = {}; 

        service.GetNaskahPenugasanInstruksiTarget = function(nipPegawai){
            var deferred = $q.defer();debugger
            $http.get(API + 'get-instruksi-pegawai/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.GetNaskahPenugasanPerintah = function(nipPegawai){
            var deferred = $q.defer();debugger
            $http.get(API + 'get-daftar-surat-perintah-history-by-pegawai/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.GetNaskahPenugasanInstruksi = function(nipPegawai){
            var deferred = $q.defer();debugger
            $http.get(API + 'get-surat-instruksi-by-pembuat/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.GetNaskahPenugasanPerintahTarget = function(nipPegawai){
            var deferred = $q.defer();debugger
            $http.get(API + 'get-daftar-surat-perintah-target/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.GetDataPerintah = function(kdSurat){
            var deferred = $q.defer();debugger
            $http.get(API + 'get-surat-perintah-by-kd-surat/' + kdSurat).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.GetTree = function(kdSurat){
            var deferred = $q.defer();debugger
            $http.get(API + 'get-surat-instruksi-tree/' + kdSurat).then(
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
    }])
    /* jshint ignore:end */

})();
