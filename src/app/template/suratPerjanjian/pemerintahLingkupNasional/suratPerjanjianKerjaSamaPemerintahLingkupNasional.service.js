(function(){
    'use strict';

    angular.module('eKinerja')
        .service('SuratPerjanjianKerjaSamaPemerintahLingkupNasionalService', SuratPerjanjianKerjaSamaPemerintahLingkupNasionalService);

    function SuratPerjanjianKerjaSamaPemerintahLingkupNasionalService(API_REPORT, $http, $q){
        var service = {};

        service.save = function(data){
            var deferred = $q.defer();
            $http.post(API_REPORT + 'create-surat-perjanjian-kerja-sama-pemerintah-lingkup-nasional/', data).then(
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