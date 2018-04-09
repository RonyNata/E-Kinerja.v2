(function(){
    'use strict';
    angular
    .module('eKinerja')
    .factory('PengumpulanDataBebanKerjaService',
    ['$http', 'API', '$q',
    function ($http, API, $q) {
        var service = {}; 
        service.GetAllJabatan = function () {
            var deferred = $q.defer();
            // debugger
            $http.get(API + 'get-all-jabatan/').then(
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
            // debugger
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

        service.GetUrtugSop = function (data) {
            var deferred = $q.defer();
            // debugger
            $http.post(API + 'get-all-sop-by-urtug-jabatan/', data).then(
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

        service.GetAllJabatanByUnitKerja = function (kdUnit) {
            var deferred = $q.defer();
            // debugger
            $http.get(API + 'get-jabatan-by-unit-kerja/' + kdUnit).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetAllKegiatan = function (kdUnit) {
            var deferred = $q.defer();
            // debugger
            $http.get(API + 'kegiatan-simda-unit-kerja/' + kdUnit).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetAllPegawai = function(){
            var deferred = $q.defer();
            $http.get(API + 'get-pegawai/').then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

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

        service.GetUrtugByJabatan = function (kdJabatan) {
            var deferred = $q.defer();
            $http.get(API + 'get-uraian-tugas-by-jabatan/' + kdJabatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugKegiatanByJabatan = function (urjab) {//get-urtug-kegiatan-by-jabatan
            var deferred = $q.defer();console.log(JSON.stringify(urjab));
            $http.post(API + 'get-kegiatan-by-urtug/', urjab).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugProgramByJabatan = function (urjab) {
            var deferred = $q.defer();
            $http.post(API + 'get-urtug-program-by-jabatan/', urjab).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugForStatus = function (kdJabatan) {
            var deferred = $q.defer();
            $http.get(API + 'get-uraian-tugas-jabatan-by-jabatan/' + kdJabatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetJenisUrtug = function () {
            var deferred = $q.defer();
            $http.get(API + 'get-jenis-urtug/').then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetJenisUrtugJabatan = function(kdJabatan) {
            var deferred = $q.defer();
            $http.get(API + 'get-urtug-jabatan-jenis-by-jabatan/' + kdJabatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetPejabatPenilai = function(kdJabatan) {
            var deferred = $q.defer();
            $http.get(API + 'get-pejabat-penilai/' + kdJabatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.SetPenilai = function(data){
          var deferred = $q.defer();
            $http.post(API + 'choose-pejabat-penilai/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;  
        }

        service.SetUrtugAndJabatan = function(urtugJabatan){
          var deferred = $q.defer();
            $http.post(API + 'add-uraian-tugas-jabatan/', urtugJabatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;  
        }

        service.SetJenisUrtugJabatan = function(data){
          var deferred = $q.defer();
            $http.post(API + 'create-urtug-jabatan-jenis/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;  
        }

        service.UpdateUrtugAndJabatan = function(urtugJabatan){
          var deferred = $q.defer();
            $http.put(API + 'update-uraian-tugas-jabatan/', urtugJabatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;  
        }

        service.CreateUrtugKegiatan = function(kegiatan){
          var deferred = $q.defer();
            $http.post(API + 'create-urtug-kegiatan-revisi', kegiatan).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;  
        }

        service.CreateUrtugProgram = function(program){
          var deferred = $q.defer();
            $http.post(API + 'create-urtug-program', program).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;  
        }

        service.CreateUrtugKegiatanPegawai = function(data){
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
        }

        service.AddSop = function(data){
          var deferred = $q.defer();
            $http.post(API + 'create-sop-uraian-tugas-jabatan/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;  
        }

        service.DeleteUrtugJabatan = function(kdJabatan, kdUrtug){
          var deferred = $q.defer();
            $http.delete(API + 'delete-uraian-tugas-jabatan/' + kdJabatan + '/' + kdUrtug).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;  
        }

        service.DeleteJenisUrtug = function(data){
          var deferred = $q.defer();
            $http.post(API + 'delete-urtug-jabatan-jenis', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;  
        };

        service.DeleteUrtugKegiatan = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'delete-urtug-kegiatan', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.DeleteUrtugProgram = function (data) {
            var deferred = $q.defer();
            $http.post(API + 'delete-urtug-program', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

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
        };

        service.GetPegawaiByJabatan = function(data){
            var deferred = $q.defer();
            $http.post(API + 'get-pegawai-penanggung-jawab/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        service.GetPegawaiByJabatanProgram = function(data){
            var deferred = $q.defer();
            $http.post(API + 'get-pegawai-penanggung-jawab-program/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetProgram = function(kdUnit){
            var deferred = $q.defer();
            $http.get(API + 'program-simda-unit-kerja/' + kdUnit).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUrtugKegiatan = function(data){
            var deferred = $q.defer();
            $http.post(API + 'get-urtug-kegiatan-by-id/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.SetDataUrtug = function(used_urtug, available_urtug){
            var urtug = angular.copy(available_urtug);
            for(var i = 0; i < used_urtug.length; i++){
                used_urtug[i].selected = true;
                urtug.unshift(angular.copy(used_urtug[i]));
            }
            return urtug;
        };

        service.FindIndex = function(array, id){
            var index = -1;
            for(var i = 0; i < array.length; i++){
                if(array[i].kdUrtug == id){
                    index = i;
                    break;
                }
            }
            return index;
        }

        service.GetUrtugId = function(array, data){
            for(var i = 0; i < array.length; i++){
                if(array[i].deskripsi == data){
                    return array[i].kdUrtug;
                    break;
                }
            }
        }

        service.GetUrtugById = function(array, data){
            for(var i = 0; i < array.length; i++){
                if(array[i].deskripsi == data){
                    return array[i];
                    break;
                }
            }
        }

        service.GetUrtugByyId = function(array, data){
            for(var i = 0; i < array.length; i++){
                if(array[i].kdUrtug == data){
                    return array[i];
                    break;
                }
            }
        }

        service.GetKegiatan = function(array, data){
            for(var i = 0; i < array.length; i++){
                if(array[i].ketKegiatan == data){
                    return array[i];
                    break;
                }
            }
        }

        service.GetKegiatanById = function(array, data){
            for(var i = 0; i < array.length; i++){debugger
                if(array[i].kdKegiatan == parseInt(data)){
                    return array[i];
                    break;
                }
            }
        }

        service.GetDataProgram = function(array, data){
            for(var i = 0; i < array.length; i++){
                if(array[i].ketProgram == data){
                    return array[i];
                    break;
                }
            }
        }

        service.GetUrtugStatus = function(array, data){
            for(var i = 0; i < array.length; i++){
                if(array[i].kdUrtug == data){
                    return array[i];
                    break;
                }
            }
        }

        service.GetSop = function(array, data){
            for(var i = 0; i < array.length; i++){
                if(array[i].sop == data){
                    return array[i];
                    break;
                }
            }
        }
 
        return service;
    }])
    /* jshint ignore:end */

})();
