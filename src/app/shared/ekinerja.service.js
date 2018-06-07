 (function(){
    'use strict';
    angular
    .module('eKinerja')
    .service('EkinerjaService',
    ['$state', 'toastr', '$q', 'API', '$http', '$document', '$uibModal',
    function ($state, toastr, $q, API, $http, $document, $uibModal) {
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

        service.searchByKegiatan = function(ketKegiatan, array){
            var result = [];
            for(var i = 0; i<array.length; i++){
                // console.log(array[i].ketKegiatan.toLowerCase());
                if (array[i].ketKegiatan.toLowerCase().search(ketKegiatan.toLowerCase()) != -1){
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

        service.showToastrDanger = function(message) {
          toastr.warning(message);
        }

        service.findJabatanByKdJabatan = function(kdJabatan, array){
            for(var i = 0; i<array.length; i++){
                if (array[i].kdJabatan.search(kdJabatan) != -1){
                    return array[i]; break;
                } 
            }
        }

        service.findProgram = function(kdProg, array){
            for(var i = 0; i<array.length; i++){debugger
                if (array[i].kdProg == parseInt(kdProg)){
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

        service.GetNotifAjuan = function (kdUnitKerja, nipPegawai) {
            var deferred = $q.defer();
            $http.get(API + 'get-kontrak-ajuan-bawahan-notif/' + kdUnitKerja + '/' + nipPegawai).then(
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

        service.changeToastrOpt = function(){
            toastr.warning('Anda Belum Mengajukan Kontrak Kerja.<br><b>Klik Untuk Melihat Tutorial</b>', {
                timeOut: 0,
                extendedTimeOut: 0,
                tapToDismiss: false,
                closeButton: true,
                allowHtml: true,
                onTap: function(){
                  pop();
                  function pop(parentSelector){
                    var parentElem = parentSelector ? 
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                  var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/login/stepByStep/stepByStep.html',
                    controller: 'LoginEKinerjaController',
                    controllerAs: 'stepByStep',
                    // windowClass: 'app-modal-window',
                    size: 'lg',
                    appendTo: parentElem
                  });
                  }
                },
                onHidden: function(){   
                    sessionStorage.setItem('kontrak', 'false');
                }
              });
        }

        service.lihatPdf = function (docs, judul, parentSelector) {
            var parentElem = parentSelector ? 
              angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'app/shared/lihatPdf/lihatPdf.html',
              controller: 'LihatPDFController',
              controllerAs: 'pdf',
              // windowClass: 'app-modal-window',
              size: 'lg',
              appendTo: parentElem,
              resolve: {
                doc: function () {
                  return docs;
                },
                dokumen: function(){
                    return judul;
                }
              }
            });

            modalInstance.result.then(function () {
              
            }, function () {
              // showToastrFailed('menambahkan data');
              // $log.info('Modal dismissed at: ' + new Date());
            });
        };

        service.isPejabatTinggi = function(eselon, kdUnit){debugger
            var isPejabat = false;
            var kdSKPD = kdUnit.split("")[0];
            switch(kdSKPD){
                case '3': case '4': case '6': if(eselon == 'II.b' || eselon == 'III.a') isPejabat = true; break;
                case '2': if(kdUnit.split("")[2] == 0 && eselon == 'II.b') isPejabat = true;
                            else if(eselon == 'III.a' && eselon == 'III.b') isPejabat = true; break;
                case '9': if(eselon == 'III.a') isPejabat = true; break;
                case '7': if(eselon == 'III.a' || eselon == 'III.b') isPejabat = true; break;
                case 'B': if(eselon == 'IV.a' && eselon == 'IV.b') isPejabat = true; break;
            }
            return isPejabat;
        }

        service.isPimpinan = function(eselon, kdUnit){debugger
            var isPimpinan = false;
            var kdSKPD = kdUnit.split("")[0];
            switch(kdSKPD){
                case '3': case '4': case '6': if(eselon == 'II.b') isPimpinan = true; break;
                case '2': if(kdUnit.split("")[2] == 0 && eselon == 'II.b') isPimpinan = true;
                            else if(eselon == 'III.a' && eselon == 'III.b') isPimpinan = true; break;
                case '9': if(eselon == 'III.a') isPimpinan = true; break;
                case '7': if(eselon == 'III.a') isPimpinan = true; break;
                case 'B': if(eselon == 'IV.a') isPimpinan = true; break;
            }
            return isPimpinan;
        }
 
        return service;
    }])
    /* jshint ignore:end */

})();
