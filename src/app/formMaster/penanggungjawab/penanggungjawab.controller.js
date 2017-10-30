(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('PenanggungJawabController', PenanggungJawabController);

	function PenanggungJawabController(MasterUrtugService, $uibModalInstance, items, toastr){
		var vm = this;

		if(items == undefined){
			vm.data_pj = {"kdStatus": null};
			// vm.data_pj.volumeKerja = 0;
			// vm.data_pj.normaWaktu = 0;
			vm.ok = function () {
				// console.log(JSON.stringify(vm.data_pj));
				create();
		    };
		} else {
			vm.data_pj = items;
			vm.ok = function () {
				// console.log(JSON.stringify(vm.data_pj));
				edit();
		    };
		}
		function edit(){
			MasterUrtugService.UpdatePj(vm.data_pj).then(
				function(response){
	      			$uibModalInstance.close();
					// debugger
				},function(errResponse){
					toastr.error("Terjadi Kesalahan");
				}
			);
		}

		function create(){
			console.log(vm.data_pj);
			MasterUrtugService.CreatePj(vm.data_pj).then(
				function(response){
	      			$uibModalInstance.close();
					// debugger
				},function(errResponse){
					toastr.error("Terjadi Kesalahan");
				}
			);
		}

		vm.calculateBeban = function(){
			vm.data_pj.bebanKerja = vm.data_pj.volumeKerja * vm.data_pj.normaWaktu;
		}


	    vm.cancel = function () {
	      $uibModalInstance.dismiss('cancel');
	    };
	} 
})();