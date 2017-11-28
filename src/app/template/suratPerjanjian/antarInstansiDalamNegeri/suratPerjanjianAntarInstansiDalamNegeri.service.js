(function(){
    'use strict';

    angular.module('eKinerja')
        .service('SuratPerjanjianAntarInstansiDalamNegeriService', SuratPerjanjianAntarInstansiDalamNegeriService);

    function SuratPerjanjianAntarInstansiDalamNegeriService(API_REPORT, $http, $q){
        var service = {};

        service.save = function(data){
            var deferred = $q.defer();
            $http.post(API_REPORT + 'create-surat-perjanjian-antar-instansi-dalam-negeri/', data).then(
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