 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('AktivitasPegawaiService',
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

        service.GetRincianPegawai = function (nip, date) {
            var deferred = $q.defer();
            $http.get(API + 'get-rincian-ekinerja-by-nip-date/' + nip + '/' + date.getTime()).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.SaveRincian = function (rincian) {
            var deferred = $q.defer();
            $http.post(API + 'save-rincian-ekinerja-date/', rincian).then(
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
