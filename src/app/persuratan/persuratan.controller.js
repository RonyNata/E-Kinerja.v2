(function() {
'use strict';

angular.
  module('eKinerja')
  .controller('PersuratanController', PersuratanController);


    function PersuratanController(EkinerjaService, PenugasanService, $scope, KontrakPegawaiService,
     TemplateSuratKeputusanService,
     TemplateSuratDinasService,
     TemplateLaporanService,
     TemplateTelaahanStaffService,
     TemplateSuratUndanganService,
     TemplateSuratPengantarService,
     TemplateSuratEdaranService,
     TemplatePengumumanService,
     TemplateMemorandumService,
     TemplateSuratKuasaService,
     TemplateSuratKeteranganService,
     TemplateNotaDinasService,
     TemplateBeritaAcaraService,
     TemplateSuratTugasService,
     TemplateSuratPerintahService, DashboardService,
     $uibModal, $document, $state, PenilaianService, PersuratanService) {
        var vm = this;
        vm.loading = true;

        getDraftApproval();
        getSuratPerintahMasuk();

        vm.getDocument = function(laporan){debugger
            laporan.loading = true;
            debugger
            switch(laporan.kdJenisSurat){
                case 0: getDocumentBeritaAcara(laporan); break;
                case 1: getDocumentLaporan(laporan); break;
                case 2: getDocumentMemorandum(laporan); break;
                case 3: getDocumentNodin(laporan); break;
                case 4: getDocumentPengumuman(laporan); break;
                case 5: getDocumentSuratDinas(laporan); break;
                case 6: getDocumentEdaran(laporan); break;
                case 7: getDocumentKeputusan(laporan); break;
                case 8: getDocumentSuratKeterangan(laporan); break;
                case 9: getDocumentSuratKuasa(laporan); break;
                case 10: getDocumentPengantar(laporan); break;
                case 11: getDocumentPerintah(laporan); break;
                case 12: getDocumentSuratTugas(laporan); break;
                case 13: getDocumentUndangan(laporan); break;
                case 14: getDocumentTelaahanStaff(laporan); break;
                case 15: getLaporanLain(laporan); break;
            }
        }

        function getDocumentPerintah(laporan){
            PenugasanService.GetDataPerintah(laporan.kdSurat).then(
                function(response){
                    var data = response;debugger
                    var doc = TemplateSuratPerintahService.template(data);
                    EkinerjaService.lihatPdf(doc, 'Surat Perintah');
                    laporan.loading = false;
                }, function(errResponse){

                })
        };

        function getSebaranSurat(){
          PersuratanService.GetSebaranSurat($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
            function(response){debugger
              for(var i = 0; i < response.length; i++){
                response[i].waktu = EkinerjaService.IndonesianDateFormat(new Date(response[i].createdDateMilis));
                response[i].jenisSurat = 'Surat Perintah';
                response[i].kdJenisSurat = 11;
              }
              vm.surat = response;

                pagingSurat();
            }, function(errResponse){

            })
        }

        function getDocumentMemorandum(laporan, isLaporan){
            // laporan.loading = true;
            PenilaianService.GetDataMemorandum(laporan.kdSurat).then(
                function(response){
                    var data = response;debugger
                    var doc = TemplateMemorandumService.template(data);
                    laporan.loading = false;
                    EkinerjaService.lihatPdf(doc, 'Memorandum');
                }, function(errResponse){

                })
        };

        function getDocumentSuratDinas(laporan, isLaporan){
            // laporan.loading = true;
            PenilaianService.GetDataSuratDinas(laporan.kdSurat).then(
                function(response){
                    var data = response;debugger
                    var doc = TemplateSuratDinasService.template(data);
                    laporan.loading = false;
                    EkinerjaService.lihatPdf(doc, 'Surat Dinas');
                }, function(errResponse){

                })
        };

        function getSuratPerintahMasuk(){
            PenugasanService.GetNaskahPenugasanPerintahTarget($.parseJSON(sessionStorage.getItem('credential')).nipPegawai, true).then(
                function(response){debugger
                    for(var i = 0; i < response.length;i++){
                        response[i].nama = "Surat Perintah";
                        response[i].kdJenisSurat = 11;
                        response[i].tanggalDibuat = response[i].createdDate;
                        response[i].tanggalDibuatMilis = response[i].createdDateMilis;
                        // vm.suratMasuk.push(response[i]);
                    }
                    vm.suratMasuk = response;
                    getSurat();
                }, function(errResponse){debugger

                })
        }

        function getDocumentUndangan(laporan, isLaporan){
            // laporan.loading = true;
            PenilaianService.GetDataUndangan(laporan.kdSurat).then(
                function(response){
                    var data = response;debugger
                    var doc = TemplateSuratUndanganService.template(data);
                    laporan.loading = false;
                    EkinerjaService.lihatPdf(doc, 'Surat Undangan');
                }, function(errResponse){

                })
        };

        vm.changeStatus = function (surat) {
            surat.loading = true;
            debugger
            switch(surat.kdJenisSurat){
                case 0: sebarDocument(surat, "sebar-berita-acara/"); break;//done
                case 2: sebarDocument(surat, "sebar-memorandum/"); break;//done
                case 3: sebarDocument(surat, "sebar-nota-dinas/"); break;//error get
                case 4: sebarDocument(surat, "sebar-pengumuman/"); break;//done
                case 5: sebarDocument(surat, "sebar-surat-dinas/"); break;//done
                case 6: sebarDocument(surat, "sebar-surat-edaran/"); break;//done
                case 7: sebarDocument(surat, "sebar-surat-keputusan/"); break;//done
                case 8: sebarDocument(surat, "sebar-surat-keterangan/"); break;//done
                case 9: sebarDocument(surat, "sebar-surat-kuasa/"); break;//done
                case 10: sebarDocument(surat, "sebar-surat-pengantar/"); break;//done
                case 12: sebarDocument(surat, "sebar-surat-tugas/"); break;//done
                case 13: sebarDocument(surat, "sebar-surat-undangan/"); break;//error get
                default: sebarDocument(surat, "sebar-surat-perintah/"); break;//done
            }
        };

        function sebarDocument(surat, url){
            PersuratanService.ChangeStatusSurat(url, surat.kdSurat).then(
                function(response){
                    EkinerjaService.showToastrSuccess("Dokumen Berhasil Disebar");
                    getSebaranSurat();
                }, function(errResponse){
                    EkinerjaService.showToastrError(errResponse);
                    laporan.loading = false;
                })
        }

        function pagingSurat(){
            $scope.filteredDataSurat = [];
            $scope.currentPageSurat = 0;
            $scope.numPerPageSurat = 10;
            $scope.maxSizeSurat = Math.ceil(vm.surat.length/$scope.numPerPageSurat);
            function pageSurat(){
                $scope.pageSurat = [];
                for(var i = 0; i < vm.surat.length/$scope.numPerPageSurat; i++){
                    $scope.pageSurat.push(i+1);
                }
            }
            pageSurat();
            $scope.padSurat = function(i){
                $scope.currentPageSurat += i;
            }

            $scope.maxSurat = function(){
                if($scope.currentPageSurat >= $scope.maxSizeSurat - 1)
                    return true;
                else return false;
            }

            $scope.$watch("currentPageSurat + numPerPageSurat", function() {
                var begin = (($scope.currentPageSurat) * $scope.numPerPageSurat)
                    , end = begin + $scope.numPerPageSurat;

                $scope.filteredDataSurat = vm.surat.slice(begin, end);
            });
        }

        function pagingSuratMasuk(){
            $scope.filteredDataSuratMasuk = [];
            $scope.currentPageSuratMasuk = 0;
            $scope.numPerPageSuratMasuk = 10;
            $scope.maxSizeSuratMasuk = Math.ceil(vm.suratMasuk.length/$scope.numPerPageSuratMasuk);
            function pageSuratMasuk(){
                $scope.pageSuratMasuk = [];
                for(var i = 0; i < vm.suratMasuk.length/$scope.numPerPageSuratMasuk; i++){
                    $scope.pageSuratMasuk.push(i+1);
                }
            }
            pageSuratMasuk();
            $scope.padSuratMasuk = function(i){
                $scope.currentPageSuratMasuk += i;
            }

            $scope.maxSuratMasuk = function(){
                if($scope.currentPageSuratMasuk >= $scope.maxSizeSuratMasuk - 1)
                    return true;
                else return false;
            }

            $scope.$watch("currentPageSuratMasuk + numPerPageSuratMasuk", function() {
                var begin = (($scope.currentPageSuratMasuk) * $scope.numPerPageSuratMasuk)
                    , end = begin + $scope.numPerPageSuratMasuk;

                $scope.filteredDataSuratMasuk = vm.suratMasuk.slice(begin, end);
            });
        }

        vm.disposisi = function(suratt, parentSelector){
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/penilaian/openUrtug/openUrtug.html',
                controller: 'OpenUrtugController',
                controllerAs: 'openurtug',
                // windowClass: 'app-modal-window',
                // size: 'lg',
                appendTo: parentElem,
                resolve: {
                    surat: function () {
                        return suratt;
                    },
                    isUpload: function () {
                        return 0;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        }

        vm.isAdmin = function(){
            if($.parseJSON(sessionStorage.getItem('credential')).role.id != 'AD004')
                return false;
            else return true;
        }

        function getSurat(){
          vm.suratMasuk = [];
          getSuratMasuk('get-daftar-surat-dinas-by-target/');
          getSuratMasuk('get-daftar-memorandum-target/');
          getSuratMasuk('get-daftar-surat-keterangan-by-target/');
          getSuratMasuk('get-surat-kuasa-by-penerima-kuasa/');
          getSuratMasuk('get-daftar-surat-pengantar-by-target/');
          getSuratMasuk('get-daftar-surat-undangan-target/');
          // getSuratMasuk('');
        }

        function getSuratMasuk(url){
          DashboardService.GetSuratMasuk(url, $.parseJSON(sessionStorage.getItem('credential')).nipPegawai, true).then(
            function(response){
              for(var i = 0; i < response.length;i++){
                var date = new Date(response[i].createdDateMilis);
                response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date);
                response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes();
                vm.suratMasuk.push(response[i]);
              }
              vm.suratMasuk = vm.suratMasuk.sort( function ( a, b ) { return b.createdDateMilis - a.createdDateMilis; } ); 
              pagingSuratMasuk();
            }, function(errResponse){

            })
        }

        function getDraftApproval(){
            vm.surat = [];
            getDraft('get-draft-memorandum-approval/');
            getDraft('get-draft-surat-undangan-approval/');
            getDraft('get-draft-surat-dinas-approval/');
            getDraft('get-draft-surat-perintah-approval/');
        }

        function getDraft(url){
            PersuratanService.GetDraftApproval(url, $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
            function(response){debugger
              for(var i = 0; i < response.length; i++){
                response[i].waktu = EkinerjaService.IndonesianDateFormat(new Date(response[i].createdDateMilis));
                vm.surat.push(response[i]);
              }
              vm.surat = vm.surat.sort( function ( a, b ) { return b.createdDateMilis - a.createdDateMilis; } ); 
              pagingSurat();
            }, function(errResponse){

            })
        }
   	}
})();
