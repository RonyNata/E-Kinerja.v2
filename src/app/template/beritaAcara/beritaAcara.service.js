(function(){
    'use strict';

    angular.module('eKinerja')
        .service('BeritaAcaraService', BeritaAcaraService);

    function BeritaAcaraService(API_REPORT, $http, $q){
        var service = {};

        service.save = function(data){
            var deferred = $q.defer();
            $http.post(API_REPORT + 'create-berita-acara/', data).then(
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