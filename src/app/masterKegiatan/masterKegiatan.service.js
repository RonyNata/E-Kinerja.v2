 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('MasterKegiatanService',
    ['$http', 'API', '$q',
    function ($http, API, $q) {
        var service = {}; 
        service.GetUrtugDpa = function (kdUnitKerja) {
            var deferred = $q.defer();
            $http.get(API + 'get-hasil-approval-urtug-dpa/' + kdUnitKerja).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.CreatePJ = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'create-penanggung-jawab-kegiatan/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetPJ = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'get-penanggung-jawab-kegiatan-by-kegiatan/', data).then(
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
