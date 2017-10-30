 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('MasterUrtugService',
    ['$http', 'API', '$q',
    function ($http, API, $q) {
        var service = {}; 
        service.GetUrtug = function (nip) {
            var deferred = $q.defer();
            $http.get(API + 'get-urtug-by-nip/' + nip).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetAllUrtug = function () {
            var deferred = $q.defer();
            $http.get(API + 'get-all-urtug/').then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetAllSop = function () {
            var deferred = $q.defer();
            $http.get(API + 'get-all-sop/').then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetStatusPJ = function () {
            var deferred = $q.defer();
            // debugger
            $http.get(API + 'get-status-penanggung-jawab/').then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.CreateUrtug = function (urtug) {
            var deferred = $q.defer();
            $http.post(API + 'create-urtug/', urtug).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.CreateSop = function (sop) {
            var deferred = $q.defer();
            $http.post(API + 'create-sop/', sop).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.CreatePj = function (pj) {
            var deferred = $q.defer();
            $http.post(API + 'create-status-penanggung-jawab-kegiatan/', pj).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.UpdateUrtug = function (urtug) {
            var deferred = $q.defer();
            $http.put(API + 'update-urtug/', urtug).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.UpdatePj = function (pj) {
            var deferred = $q.defer();
            $http.put(API + 'update-status-penanggung-jawab-kegiatan/', pj).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.UpdateSop = function (sop) {
            var deferred = $q.defer();
            $http.put(API + 'update-sop/', sop).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.DeleteUrtugById = function (kd_urtug) {
            var deferred = $q.defer();
            $http.delete(API + 'delete-urtug/' + kd_urtug).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.DeletePj = function (kd_status) {
            var deferred = $q.defer();
            $http.delete(API + 'delete-status-penanggung-jawab-kegiatan/' + kd_status).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.DeleteSopById = function (kd_sop) {
            var deferred = $q.defer();
            $http.delete(API + 'delete-sop/' + kd_sop).then(
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
