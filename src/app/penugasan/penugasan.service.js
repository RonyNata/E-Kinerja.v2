 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('PenugasanService',
    ['$http', 'API', '$q',
    function ($http, API, $q) {
        var service = {}; 

        service.GetNaskahPenugasanInstruksi = function(nipPegawai){
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
 
        return service;
    }])
    /* jshint ignore:end */

})();
