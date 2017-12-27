 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .service('EkinerjaService',
    ['$state', 'toastr', '$q', 'API', '$http',
    function ($state, toastr, $q, API, $http) {
        var service = {}; 
        
        service.checkCredential = function(){
            if(sessionStorage.getItem('credential') == undefined || sessionStorage.getItem('credential') == null)
                $state.go('home');
            else {
                console.log($state.current.name);
                if ($state.current.name == "home") {
                    service.checkRole($.parseJSON(sessionStorage.getItem('credential')).role.id);
                }
            }
        }

        service.checkRole = function(role){
            switch(role){
                case 'AD001' : console.log("mastder"); $state.go('master-urtug'); break;
                case 'AD002' : console.log("unit kerja"); $state.go('urtug-jabatan'); break;
                case 'AD003' : console.log("user"); $state.go('kontrak'); break;
            }
        }

        service.logout = function(){
            // console.log(123);
            sessionStorage.removeItem('credential');
            $state.go('home');
        }

        service.searchByName = function(name, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].nama.toLowerCase().search(name.toLowerCase()) != -1){
                    result.push(array[i]); debugger
                } 
            }
            debugger
            return result;
        }

        service.searchByNip = function(nip, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].nipPegawai.search(nip) != -1){
                    result.push(array[i]);
                } 
            }
            return result;
        }

        service.searchByDeskripsi = function(name, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].deskripsi.toLowerCase().search(name.toLowerCase()) != -1){
                    result.push(array[i]);
                } 
            }
            return result;
        }

        service.searchByDeskripsiUrtug = function(name, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].uraianTugas.deskripsi.toLowerCase().search(name.toLowerCase()) != -1){
                    result.push(array[i]);
                } 
            }
            return result;
        }

        service.searchByUrtug = function(name, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].urtug.toLowerCase().search(name.toLowerCase()) != -1){
                    result.push(array[i]);
                } 
            }
            return result;
        }

        service.searchByJabatan = function(jabatan, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].jabatan.toLowerCase().search(jabatan.toLowerCase()) != -1) {
                    result.push(array[i]);
                }
            }
            return result;
        }

        service.searchByUnitKerja = function(unitKerja, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].unitKerja.toLowerCase().search(unitKerja.toLowerCase()) != -1) {
                    debugger
                    result.push(array[i]);
                }
            }
            return result;
        }

        service.searchByStatus = function(role, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].role.toLowerCase().search(role.toLowerCase()) != -1) {
                    result.push(array[i]);
                }
            }
            return result;
        }

        service.showToastrSuccess = function(message) {
          toastr.success(message);

        }

        service.showToastrError = function(message) {
          toastr.error(message);

        }

        service.findJabatanByKdJabatan = function(kdJabatan, array){
            for(var i = 0; i<array.length; i++){
                if (array[i].kdJabatan.search(kdJabatan) != -1){
                    return array[i]; break;
                } 
            }
        }

        service.findPegawaiByNip = function(nip, array){
            for(var i = 0; i<array.length; i++){
                if (array[i].nipPegawai.search(nip) != -1){
                    return array[i]; break;
                } 
            }
        }

        service.searchByAktivitas = function(aktivitas, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                if (array[i].namaUrtug.toLowerCase().search(aktivitas.toLowerCase()) != -1){
                    result.push(array[i]);
                } 
            }
            return result;
        }

        service.IndonesianDateFormat = function(date){
            var month = ['Januari', 'February', 'Maret', 'April', 'Mei', 'Juni', 
                            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
            var result = date.getDate().toString() + ' ' + month[date.getMonth()] + ' ' + 
                            (1900 + date.getYear()).toString();
            return result;
        }

        service.IndonesianDay = function(date){
            var day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu']
            var result = ' ' + day[date.getDay()];
            return result;
        }

        service.IndonesianDate= function(date){
            var result = date.getDate().toString();
            return result;
        }

        service.IndonesianMonth = function(date){
            var month = ['Januari', 'February', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
            var result = ' ' + month[date.getMonth()];
            return result;
        }

        service.IndonesianYear = function(date){
            var result = ' ' + (1900 + date.getYear()).toString();
            return result;
        }

        service.FormatRupiah = function(value){
            var money = value.toString();
            money = money.split('');
            var result = [];
            for(var i = 0;i<money.length;i++){
                if(i%3 == 0 && i != 0)
                    result.unshift('.');
                result.unshift(money[money.length - i - 1]);
            }
            return result.join("");
        }

        service.GetNotifLaporan = function (nipPegawai) {
            var deferred = $q.defer();
            $http.get(API + 'get-laporan-bawahan-notif/' + nipPegawai).then(
                function (response){
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        };

        service.GantiPassword = function (data) {
            var deferred = $q.defer();
            $http.put(API + 'change-password-pegawai/', data).then(
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
