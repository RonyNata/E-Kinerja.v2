(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormMasterSopController', FormMasterSopController);

	function FormMasterSopController(MasterUrtugService, $uibModalInstance, items, toastr){
		var vm = this;

		if(items == undefined){
			vm.data_sop = {"kdSop": null};
			// vm.data_sop.volumeKerja = 0;
			// vm.data_sop.normaWaktu = 0;
			vm.ok = function () {
				// console.log(JSON.stringify(vm.data_sop));
				create();
		    };
		} else {
			vm.data_sop = items;
			vm.ok = function () {
				// console.log(JSON.stringify(vm.data_sop));
				edit();
		    };
		}
		function edit(){
			MasterUrtugService.UpdateSop(vm.data_sop).then(
				function(response){
	      			$uibModalInstance.close();
					// debugger
				},function(errResponse){
					toastr.error("Terjadi Kesalahan");
				}
			);
		}

		function create(){
			console.log(vm.data_sop);
			MasterUrtugService.CreateSop(vm.data_sop).then(
				function(response){
	      			$uibModalInstance.close();
					// debugger
				},function(errResponse){
					toastr.error("Terjadi Kesalahan");
				}
			);
		}

		vm.calculateBeban = function(){
			vm.data_sop.bebanKerja = vm.data_sop.volumeKerja * vm.data_sop.normaWaktu;
		}


	    vm.cancel = function () {
	      $uibModalInstance.dismiss('cancel');
	    };
	} 
})();