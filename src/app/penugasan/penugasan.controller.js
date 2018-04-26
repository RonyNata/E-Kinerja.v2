(function() {
'use strict';

angular.
  module('eKinerja')
  .controller('PenugasanController', PenugasanController);


    function PenugasanController(EkinerjaService, PenugasanService, $scope, KontrakPegawaiService,
     TemplateSuratInstruksiService, TemplateSuratPerintahService, $uibModal, $document, $state, PenilaianService,
     TemplateSuratTugasService) {
        var vm = this;
        vm.loading = true;

        vm.naskah = [];
        vm.naskahHistory = [];

        getNaskahPenugasanPerintahTarget();

        function getNaskahPenugasanPerintahTarget(){
          PenugasanService.GetNaskahPenugasanPerintahTarget($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){debugger
              for(var i = 0; i < response.length;i++){
                response[i].nama = "Surat Perintah";
                response[i].jenis = 1;
                response[i].tanggalDibuat = response[i].createdDate;
                response[i].tanggalDibuatMilis = response[i].createdDateMilis;
                vm.naskah.push(response[i]);
                response[i].ketBaca = statusBaca(response[i].statusBaca);
              }
              getNaskahPenugasanPerintah();
            }, function(errResponse){

            })
        }

        function getNaskahPenugasanPerintah(){
          PenugasanService.GetNaskahPenugasanPerintah($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              for(var i = 0; i < response.length;i++){
                response[i].nama = "Surat Perintah";
                response[i].jenis = 1;
                response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(new Date(response[i].tanggalDibuatMilis));
                // response[i].tanggalDibuatMilis = response[i].createdDateMilis;
                vm.naskahHistory.push(response[i]);
              }
              getNaskahPenugasanTugas();
            }, function(errResponse){

            })
        }

        function getNaskahPenugasanTugas(){
          PenugasanService.GetNaskahPenugasanTugas($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){debugger
              for(var i = 0; i < response.length;i++){
                response[i].nama = "Surat Tugas";
                response[i].jenis = 2;
                response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(new Date(response[i].tanggalDibuatMilis));
                // response[i].tanggalDibuatMilis = response[i].createdDateMilis;
                vm.naskahHistory.push(response[i]);
              }
              getNaskahPenugasanInstruksi();
            }, function(errResponse){

            })
        }

        function getNaskahPenugasanInstruksi(){
          PenugasanService.GetNaskahPenugasanInstruksi($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){debugger
              for(var i = 0; i < response.length;i++){
                response[i].nama = "Instruksi";
                response[i].jenis = 0;
                response[i].kdSurat = response[i].kdInstruksi;
                response[i].judulNaskah = response[i].judulInstruksi;
                response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(new Date(response[i].tanggalDibuatMilis));
                vm.naskahHistory.push(response[i]);
              }
              vm.naskahHistory = vm.naskahHistory.sort( function ( a, b ) { return b.tanggalDibuatMilis - a.tanggalDibuatMilis; } );
              vm.dataLook = angular.copy(vm.naskahHistory);
              pagingHistori();
              getNaskahPenugasanInstruksiTarget();
            }, function(errResponse){

            })

        }

        function getNaskahPenugasanInstruksiTarget(){
          PenugasanService.GetNaskahPenugasanInstruksiTarget($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){debugger
              for(var i = 0; i < response.length;i++){
                response[i].nama = "Instruksi";
                response[i].jenis = 0;
                response[i].judulNaskah = response[i].judulInstruksi;
                response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(new Date(response[i].createdDateMilis));
                response[i].ketBaca = statusBaca(response[i].statusBaca);
                response[i].tanggalDibuatMilis = response[i].createdDateMilis;
                vm.naskah.push(response[i]);
              }
              getNaskahPenugasanTugasTarget();

            }, function(errResponse){

            })
        }

        function getNaskahPenugasanTugasTarget(){
          PenugasanService.GetNaskahPenugasanTugasTarget($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){debugger
              for(var i = 0; i < response.length;i++){
                response[i].nama = "Surat Tugas";
                response[i].jenis = 2;
                response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(new Date(response[i].createdDateMilis));
                response[i].judulNaskah = response[i].judulInstruksi;
                response[i].ketBaca = statusBaca(response[i].statusBaca);
                response[i].tanggalDibuatMilis = response[i].createdDateMilis;
                vm.naskah.push(response[i]);
              }
              vm.loading = false;
              vm.naskah = vm.naskah.sort( function ( a, b ) { return b.tanggalDibuatMilis - a.tanggalDibuatMilis; } );
              vm.dataLookPenugasan = angular.copy(vm.naskah);
              pagingPenugasan();

            }, function(errResponse){

            })
        }

        vm.teruskan = function(kdSurat, isPejabat){
          if(isPejabat)
            $state.go('instruksipejabatterusan', {
              "kdSurat": kdSurat
            });
          else
            $state.go('instruksinonpejabatterusan', {
              "kdSurat": kdSurat
            });
        }

        vm.getDocument = function(naskah, idx, isHistory){
          if(!isHistory)
            $scope.filteredDataPenugasan[idx].loading = true;
          else $scope.filteredData[idx].loading = true;
          switch(naskah.jenis){
            case 0 : getDocumentInstruksi(naskah.kdSurat, idx, isHistory); break;
            case 1 : getDocumentPerintah(naskah.kdSurat, idx, isHistory); break;
            case 2 : getDocumentSuratTugas(naskah.kdSurat, idx, isHistory); break;
          }
        }

        function getDocumentSuratTugas(kdHistory, idx, isHistory){
            // laporan.loading = true;
            PenilaianService.GetDataSuratTugas(kdHistory).then(
                function(response){
                    vm.data = response;debugger
                    var doc = TemplateSuratTugasService.template(vm.data);
                    if(!isHistory)
                      $scope.filteredDataPenugasan[idx].loading = false;
                    else $scope.filteredData[idx].loading = false;
                    // pdfMake.createPdf(doc).open();
                    EkinerjaService.lihatPdf(doc, 'Surat Tugas');
                }, function(errResponse){

                })
        };

        function getDocumentInstruksi(kdHistory, idx, isHistory){
          KontrakPegawaiService.GetDataInstruksi(kdHistory).then(
            function(response){
              vm.data = response;
              var doc = TemplateSuratInstruksiService.template(vm.data);
              if(!isHistory)
                $scope.filteredDataPenugasan[idx].loading = false;
              else $scope.filteredData[idx].loading = false;
              // pdfMake.createPdf(doc).open();
              EkinerjaService.lihatPdf(doc, 'Surat Instruksi');
            }, function(errResponse){

            })
        }

        function getDocumentPerintah(kdHistory, idx, isHistory){
          PenugasanService.GetDataPerintah(kdHistory).then(
            function(response){
              vm.data = response;debugger
              var doc = TemplateSuratPerintahService.template(vm.data);
              if(!isHistory)
                $scope.filteredDataPenugasan[idx].loading = false;
              else $scope.filteredData[idx].loading = false;
              // pdfMake.createPdf(doc).open();
              EkinerjaService.lihatPdf(doc, 'Surat Perintah');
            }, function(errResponse){

            })
        }

        function pagingPenugasan(){
            $scope.filteredDataPenugasan = [];
            $scope.currentPagePenugasan = 0;
            $scope.numPerPagePenugasan = 10;
            $scope.maxSizePenugasan = Math.ceil(vm.dataLookPenugasan.length/$scope.numPerPagePenugasan);
            function pagePenugasan(){
              $scope.pagePenugasan = [];
              for(var i = 0; i < vm.dataLookPenugasan.length/$scope.numPerPagePenugasan; i++){
                  $scope.page.push(i+1);
              }
            }
            pagePenugasan();
            $scope.padPenugasan = function(i){
              $scope.currentPagePenugasan += i;
            }

            $scope.maxPenugasan = function(){
              if($scope.currentPagePenugasan >= $scope.maxSizePenugasan - 1)
                  return true;
              else return false;
            }

            $scope.$watch("currentPagePenugasan + numPerPagePenugasan", function() {
              var begin = (($scope.currentPagePenugasan) * $scope.numPerPagePenugasan)
              , end = begin + $scope.numPerPagePenugasan;

              $scope.filteredDataPenugasan = vm.dataLookPenugasan.slice(begin, end);
            });
          }

          function pagingHistori(){
            $scope.filteredData = [];
            $scope.currentPage = 0;
            $scope.numPerPage = 10;
            $scope.maxSize = Math.ceil(vm.dataLook.length/$scope.numPerPage);
            function page(){
              $scope.page = [];
              for(var i = 0; i < vm.dataLook.length/$scope.numPerPage; i++){
                  $scope.page.push(i+1);
              }
            }
            page();
            $scope.pad = function(i){
              $scope.currentPage += i;
            }

            $scope.max = function(){
              if($scope.currentPage >= $scope.maxSize - 1)
                  return true;
              else return false;
            }

            $scope.$watch("currentPage + numPerPage", function() {
              var begin = (($scope.currentPage) * $scope.numPerPage)
              , end = begin + $scope.numPerPage;

              $scope.filteredData = vm.dataLook.slice(begin, end);
            });
          }

        vm.tree = function (kdSurat, parentSelector) {
            var parentElem = parentSelector ?
              angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'app/penugasan/lihatTree/lihatTree.html',
              controller: 'LihatTreeInstruksiController',
              controllerAs: 'tree',
              // windowClass: 'app-modal-window',
              size: 'lg',
              appendTo: parentElem,
              resolve: {
                kdSurat: function () {
                  return kdSurat;
                }
              }
            });

            modalInstance.result.then(function (kdSurat) {
              getDokumenDisposisi(kdSurat);
              // vm.selected = selectedItem;
            }, function () {
              // showToastrFailed('menambahkan data');
              // $log.info('Modal dismissed at: ' + new Date());
            });
          };

        vm.openTemplate = function (uraianTugas, naskah, isDPA, parentSelector) {
            debugger
            var parentElem = parentSelector ?
                  angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'app/kontrakPegawai/template/listTemplate.html',
            controller: 'TemplateController',
            controllerAs: 'temp',
            // windowClass: 'app-modal-window',
            // size: 'lg',
            appendTo: parentElem,
                resolve: {
                    urtug: function () {
                        return uraianTugas;
                    },
                    isDPA: function () {
                        return isDPA;
                    },
                    kdSurat: function(){
                      var i;
                      if(naskah != undefined)
                        switch(naskah.jenis){
                          case 0 : i = naskah.kdInstruksi; break;
                          case 1 : i = naskah.kdSurat; break;
                        }
                      return i;
                    },
                    jenisNaskahPenugasan: function(){
                      var i;
                      if(naskah != undefined)
                        switch(naskah.jenis){
                          case 0 : i = 3; break;
                          case 1 : i = 2; break;
                        }
                      return i;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        };

        function statusBaca(status){
          switch (status) {
            case 0 : return 'Belum Dibaca'; break;
            case 1 : return 'Sudah Dibaca'; break;
            case 2 : return 'Sudah Dilanjutkan'; break;
            case 3 : return 'Proses Laporan'; break;
            case 4 : return 'Disposisi Selesai'; break;
          }
        }
   	}
})();
