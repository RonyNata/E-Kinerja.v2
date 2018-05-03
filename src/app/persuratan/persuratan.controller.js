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
            }, function(errResponse){

            })
        }
   	}
})();
