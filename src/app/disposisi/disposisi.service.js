(function(){
	'use strict';

	angular.module('eKinerja')
		.service('DisposisiService', DisposisiService);

	function DisposisiService(API, $http, $q){
		var service = {};

		service.save = function(data){
            var deferred = $q.defer();
            $http.post(API + 'create-lembar-disposisi/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.SaveDraft = function(data){
            var deferred = $q.defer();
            $http.post(API + 'create-draft-lembar-disposisi/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.UploadFile = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'create-surat-lain-file/', data, {
                    headers : {
                        'Content-Type' : undefined
                    }}).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetPegawaiBawahan = function (nipPegawai) {
            var deferred = $q.defer();
            $http.get(API + 'get-pegawai-bawahan/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.Teruskan = function(data){
            var deferred = $q.defer();
            $http.post(API + 'teruskan-disposisi/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        // service.FindUrutan = function(index){
        //     var urutan = [
        //         "KESATU", "KEDUA", "KETIGA", "KEEMPAT", "KELIMA", "KEENAM", "KETUJUH", "KEDELAPAN", "KESEMBILAN", "KESEPULUH",
        //         "KESEBELAS", "KEDUABELAS", "KETIGABELAS", "KEEMPATBELAS", "KELIMABELAS", "KEENAMBELAS", "KETUJUHBELAS", "KEDELAPANBELAS",
        //         "KESEMBILANBELAS", "KEDUAPULUH", "KEDUAPULUHSATU"
        //     ];

        //     return urutan[index];
        // }

		return service;
	}
})();
