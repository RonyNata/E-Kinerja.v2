(function(){
	'use strict';

	angular.module('eKinerja')
		.service('PengadaanBarangJasaService', PengadaanBarangJasaService);

	function PengadaanBarangJasaService(API, $http, $q){
		var service = {};

		service.GetAllPegawaiByUnitKerja = function(kdUnit){
            var deferred = $q.defer();
            $http.get(API + 'get-pegawai/' + kdUnit).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.GetPegawaiPenanggungJawab = function(data){
            var deferred = $q.defer();
            $http.post(API + 'get-pegawai-penanggung-jawab', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.GetUrtugKegiatanPenanggungjawab = function(data){
            var deferred = $q.defer();
            $http.post(API + 'get-urtug-kegiatan-pegawai-by-urtug-kegiatan/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.GetUrtugProgramPenanggungjawab = function(data){
            var deferred = $q.defer();
            $http.post(API + 'get-urtug-kegiatan-pegawai-by-urtug-program/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.FindPegawai = function(list, nip){
        	for(var i = 0; i<list.length;i++)
        		if(list[i].nipPegawai == nip){
        			return list[i].nama;
        			break;
        		}
        }

        service.FindKegiatan = function(array, data){
        	for(var i = 0; i<array.length;i++)
        		if(array[i].ketKeg == data){
        			return array[i];
        			break;
        		}
        }

        service.GetUrtugKegiatanByJabatan = function (urjab) {
            var deferred = $q.defer();
            $http.post(API + 'get-urtug-kegiatan-by-jabatan/', urjab).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetStatusPJ = function (data) {
            var deferred = $q.defer();
            // debugger
            $http.post(API + 'get-status-penanggung-jawab-kegiatan/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.AddPJ = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'create-urtug-kegiatan-pegawai/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.AddPJProgram = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'create-urtug-program-pegawai/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.RemovePJ = function (data) {
            var deferred = $q.defer();debugger
            $http.post(API + 'delete-urtug-kegiatan-pegawai/', data).then(
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
	}
})();