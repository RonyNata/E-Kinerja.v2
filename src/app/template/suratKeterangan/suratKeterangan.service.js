(function(){
    'use strict';

    angular.module('eKinerja')
        .service('SuratKeteranganService', SuratKeteranganService);

    function SuratKeteranganService(API, $http, $q){
        var service = {};

        service.save = function(data){
            var deferred = $q.defer();
            $http.post(API + 'create-surat-keterangan', data).then(
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
    }
})();