(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('DetailPejabatController', DetailPejabatController);

    
    function DetailPejabatController(kegiatan, MasterKegiatanService, 
      $uibModalInstance) {
      	var vm = this;

        getAllStatusPJ(kegiatan);

        function getAllStatusPJ(items){
          items.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
          console.log(JSON.stringify(items));
          MasterKegiatanService.GetPJ(items).then(
            function(response){
              vm.pejabat = response; debugger
            }, function(errResponse){

            })
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