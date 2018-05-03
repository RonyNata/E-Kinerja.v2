 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('PersuratanService',
    ['$http', 'API', '$q',
    function ($http, API, $q) {
        var service = {}; 

        service.GetSebaranSurat = function(kdUnitKerja){
            var deferred = $q.defer();debugger
            $http.get(API + 'get-draft-surat-perintah-approval/' + kdUnitKerja).then(
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
