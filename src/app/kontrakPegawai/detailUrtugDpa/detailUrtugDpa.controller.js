(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('DetailUrtugDpaController', DetailUrtugDpaController);

    
    function DetailUrtugDpaController(EkinerjaService, urtug, KontrakPegawaiService, $uibModalInstance, $document, $uibModal) {
      	var vm = this;

        getKegiatan();

        function getKegiatan(){
          var data = {
            "kdUrtug": urtug.kdUrtug,
            "kdJabatan": urtug.kdJabatan,
            "kdJenisUrtug": "KJU001",
            "tahunUrtug": urtug.tahunUrtug,
            "nipPegawai": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja
          }
          KontrakPegawaiService.GetUrtugKegiatan(data).then(
            function(response){
              vm.kegiatan = response; debugger
              for(var i = 0; i < response.length; i++)
                vm.kegiatan[i].paguAnggaran = EkinerjaService.FormatRupiah(vm.kegiatan[i].paguAnggaran);
            }, function(errResponse){

            }
          );
        }

        vm.save = function(){
          
      	}

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }
   	} 
})();