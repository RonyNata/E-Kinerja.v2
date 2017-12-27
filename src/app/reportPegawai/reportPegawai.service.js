(function(){
    'use strict';
    angular
        .module('eKinerja')
        .factory('ReportPegawaiService',
            ['$http', 'API', '$q',
                function ($http, API, $q) {
                    var service = {};

                    service.GetPegawaiPengaju = function (kdUnitKerja, nipPegawai) {
                        var deferred = $q.defer();
                        $http.get(API + 'get-uraian-tugas-tahunan-by-penilai/' + kdUnitKerja + '/' + nipPegawai).then(
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
