(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('PenanggungJawabController', PenanggungJawabController);

	function PenanggungJawabController(MasterUrtugService, $uibModalInstance, EkinerjaService, items, toastr){
		var vm = this;
		
		if(items == undefined)
			vm.judul = 'TAMBAH';
		else vm.judul = 'EDIT';

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
	      			EkinerjaService.showToastrSuccess("Data jabatan organisasi berhasil diubah");
	      			$uibModalInstance.close();
					// debugger
				},function(errResponse){
					if(errResponse.status == -1)
              			EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
              		else toastr.error("Terjadi Kesalahan");
				}
			);
		}

		function create(){
			console.log(vm.data_pj);
			MasterUrtugService.CreatePj(vm.data_pj).then(
				function(response){
	      			EkinerjaService.showToastrSuccess("Data jabatan organisasi berhasil ditambahkan");
	      			$uibModalInstance.close();
					// debugger
				},function(errResponse){
					if(errResponse.status == -1)
              			EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
              		else toastr.error("Terjadi Kesalahan");
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