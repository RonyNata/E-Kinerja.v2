(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormSOPController', FormSOPController);

    
    function FormSOPController(EkinerjaService, kdUrtug, PengumpulanDataBebanKerjaService, $uibModalInstance) {
      	var vm = this;
        vm.sop_terpilih;
        // getAllSop();
        getUrtugSop();

        // function getAllSop(){
        //   PengumpulanDataBebanKerjaService.GetAllSop().then(
        //     function(response){
        //       vm.list_sop = response;debugger
        //     }, function(errResponse){

        //     })
        // }

        function getUrtugSop(){
          var data = {
            "kdUrtug": kdUrtug,
            "kdJabatan": $.parseJSON(sessionStorage.getItem('credential')).kdJabatan,
            "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja
          };
          PengumpulanDataBebanKerjaService.GetUrtugSop(data).then(
            function(response){
              vm.list_sop = response.notSopList;
              vm.urtugsop = response.currentSopList; debugger
              vm.sop_terpilih = "";
            }, function(errResponse){

            })
        }

        vm.save = function(){
          var sop = PengumpulanDataBebanKerjaService.GetSop(vm.list_sop, vm.sop_terpilih);
          var item = {
            "kdUrtug": kdUrtug,
            "kdJabatan": $.parseJSON(sessionStorage.getItem('credential')).kdJabatan,
            "kdSop": sop.kdSop,
            "kdJenisUrtug": null
          };
          console.log(item);
          PengumpulanDataBebanKerjaService.AddSop(item).then(
            function(response){
              getUrtugSop();
      				// $uibModalInstance.close();
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