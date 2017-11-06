(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormGantiPjController', FormGantiPjController);

    
    function FormGantiPjController(EkinerjaService, items, PengadaanBarangJasaService, $uibModalInstance) {
      	var vm = this;
        vm.pj = {};

        getAllPegawaiUnit();

        function getAllPegawaiUnit(){
          PengadaanBarangJasaService.GetPegawaiPenanggungJawab(items)
            .then(function(response){
              vm.list_pegawai = response;
            }, function(errResponse){

            })
        }

        vm.save = function(){
          items.nipPegawai = vm.pj.nipPegawai;
          console.log(items);
          PengadaanBarangJasaService.AddPJ(items).then(
            function(response){
      				$uibModalInstance.close(items);
              // setPJ();
            }, function(errResponse){

            })
      	}

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }
   	} 
})();