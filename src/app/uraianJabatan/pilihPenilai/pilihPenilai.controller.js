(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('PilihPenilaiController', PilihPenilaiController);

    
    function PilihPenilaiController(EkinerjaService, $scope, items, pegawai, PengumpulanDataBebanKerjaService, $uibModalInstance) {
      	var vm = this;

        vm.list_pegawai = pegawai;
        // vm.pegawai_pj = {};

        vm.save = function(){
          items.nipPenilai = vm.pejabatPenilai;
          console.log(items);
          PengumpulanDataBebanKerjaService.SetPenilai(items).then(
            function(response){
              $uibModalInstance.close();
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