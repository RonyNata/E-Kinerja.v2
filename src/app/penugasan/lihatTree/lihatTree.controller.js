(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('LihatTreeInstruksiController', LihatTreeInstruksiController);

    
    function LihatTreeInstruksiController(EkinerjaService, $scope, kdSurat, PenugasanService, $uibModalInstance, 
      TemplateSuratInstruksiService, KontrakPegawaiService) {
      	var vm = this;
        PenugasanService.GetTree(kdSurat).then(
          function(response){
            debugger
            vm.path = response;
          }, function(errResponse){

          })

        function getDocumentInstruksi(kdHistory){
          KontrakPegawaiService.GetDataInstruksi(kdHistory).then(
            function(response){
              vm.data = response;
              var doc = TemplateSuratInstruksiService.template(vm.data);
              EkinerjaService.lihatPdf(doc, 'Surat Instruksi');
            }, function(errResponse){

            })
        }

        vm.openPdf = function(kdSurat){
          getDocumentInstruksi(kdSurat.kdInstruksi);
      	}

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };
   	} 
})();