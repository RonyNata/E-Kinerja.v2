(function(){
	'use strict';

	angular.module('eKinerja').service('PenilaianService', PenilaianService);

	function PenilaianService($http, $q, API){
		var service = {};
		service.GetLaporanBawahan = function (nipPegawai) {
            var deferred = $q.defer();
            $http.get(API + 'get-laporan-bawahan/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.Tolak = function (data) {
            var deferred = $q.defer();
            $http.put(API + 'tolak-laporan/', data).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.OpenSurat = function (kdSurat) {
            var deferred = $q.defer();
            $http.put(API + 'open-surat-perintah-penilai/' + kdSurat ).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetUndanganHistory = function (nip) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-daftar-surat-undangan-history/' + nip ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetPengumumanHistory = function (nip) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-pengumuman-history-by-pembuat/' + nip ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetEdaranHistory = function (nip) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-daftar-surat-edaran-by-pembuat/' + nip ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        }; 

        service.GetKeputusanHistory = function (nip) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-daftar-surat-keputusan-by-pembuat/' + nip ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetPengantarHistory = function (nip) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-daftar-surat-pengantar-by-pembuat/' + nip ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetBeritaAcaraHistory = function (nip) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-daftar-berita-acara-history-by-pegawai/' + nip ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetLaporanHistory = function (nip) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-daftar-laporan-history-by-pegawai/' + nip ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetNotaDinasHistory = function (nip) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-report-nodin-history-by-nip/' + nip ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetSuratDinasHistory = function (nip) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-daftar-surat-dinas-by-pembuat/' + nip ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetKeteranganHistory = function (nip) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-daftar-surat-keterangan-by-pembuat/' + nip ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };
        
        service.GetKuasaHistory = function (nip) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-daftar-surat-kuasa-history-by-pegawai/' + nip ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetTelaahStaffHistory = function (nip) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-daftar-telaahan-staff-history-by-pegawai/' + nip ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetMemorandumHistory = function (nip) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-daftar-memorandum-history/' + nip ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetDataKeputusan = function (kdSurat) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-surat-keputusan-by-kd-surat-keputusan/' + kdSurat ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetDataEdaran = function (kdSurat) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-surat-edaran-by-kd-surat-edaran/' + kdSurat ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetDataUndangan = function (kdSurat) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-surat-undangan-by-kd-surat/' + kdSurat ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetDataPengantar = function (kdSurat) { 
            var deferred = $q.defer(); 
            $http.get(API + 'get-surat-pengantar-by-kd-surat/' + kdSurat ).then( 
                function (response){ 
                    deferred.resolve(response.data); 
                }, 
                function(errResponse){ 
                    deferred.reject(errResponse); 
                } 
            ); 
            return deferred.promise; 
        };

        service.GetDataSuratDinas = function (kdSurat) {
            var deferred = $q.defer();
            $http.get(API + 'get-surat-dinas-by-kd-surat-dinas/' + kdSurat ).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetDataLaporan = function (kdSurat) {
            var deferred = $q.defer();
            $http.get(API + 'get-laporan-by-kd-laporan/' + kdSurat ).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetDataSuratTugas = function (kdSurat) {
            var deferred = $q.defer();
            $http.get(API + 'get-surat-tugas-by-kd-surat/' + kdSurat ).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GetDataTelaahanStaff = function (kdSurat) {
            var deferred = $q.defer();
            $http.get(API + 'get-telaahan-staff-by-kd-telaahan-staff/' + kdSurat ).then(
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