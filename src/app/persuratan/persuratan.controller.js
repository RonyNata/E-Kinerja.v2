(function() {
'use strict';

angular.
  module('eKinerja')
  .controller('PersuratanController', PersuratanController);


    function PersuratanController(EkinerjaService, PenugasanService, $scope, KontrakPegawaiService,
     TemplateSuratInstruksiService, TemplateSuratPerintahService, $uibModal, $document, $state, PenilaianService,
     TemplateSuratTugasService, PersuratanService) {
        var vm = this;
        vm.loading = true;

        getSebaranSurat();

        function getSebaranSurat(){
          PersuratanService.GetSebaranSurat($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
            function(response){debugger
              for(var i = 0; i < response.length; i++){
                response[i].waktu = EkinerjaService.IndonesianDateFormat(new Date(response[i].createdDateMilis));
                response[i].jenisSurat = 'Surat Perintah';
              }
              vm.surat = response;

                pagingSurat();
            }, function(errResponse){

            })
        }

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
   	}
})();
