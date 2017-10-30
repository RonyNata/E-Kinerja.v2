(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormMasterUrtugController', FormMasterUrtugController);

	function FormMasterUrtugController(MasterUrtugService, $uibModalInstance, items, toastr){
		var vm = this;

		if(items == undefined){
			vm.data_urtug = {};
			// vm.data_urtug.volumeKerja = 0;
			// vm.data_urtug.normaWaktu = 0;
			vm.ok = function () {
				// console.log(JSON.stringify(vm.data_urtug));
				create();
		    };
		} else {
			vm.data_urtug = items;
			vm.ok = function () {
				// console.log(JSON.stringify(vm.data_urtug));
				edit();
		    };
		}
		function edit(){
			MasterUrtugService.UpdateUrtug(vm.data_urtug).then(
				function(response){
	      			$uibModalInstance.close();
					// debugger
				},function(errResponse){
					toastr.error("Terjadi Kesalahan");
				}
			);
		}

		function create(){
			vm.data_urtug.createdBy = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
			console.log(JSON.stringify(vm.data_urtug));
			MasterUrtugService.CreateUrtug(vm.data_urtug).then(
				function(response){
	      			$uibModalInstance.close();
					// debugger
				},function(errResponse){
					toastr.error("Terjadi Kesalahan");
				}
			);
		}

		vm.calculateBeban = function(){
			vm.data_urtug.bebanKerja = vm.data_urtug.volumeKerja * vm.data_urtug.normaWaktu;
		}


	    vm.cancel = function () {
	      $uibModalInstance.dismiss('cancel');
	    };
	} 
})();