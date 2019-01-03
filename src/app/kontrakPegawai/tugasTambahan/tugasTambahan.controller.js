(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('TugasTambahanController', TugasTambahanController);

	function TugasTambahanController(KontrakPegawaiService, EkinerjaService, $uibModalInstance){
		var vm = this;

		vm.item = {};

		vm.item.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;

		vm.save = function(){
			KontrakPegawaiService.AddTugasTambahan(vm.item).then(
				function(response){
					EkinerjaService.showToastrSuccess('Tugas Tambahan Berhasil Ditambahkan');
					$uibModalInstance.close();
				}, function(errResponse){
					if(errResponse.status == -1)
              			EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
				})
		}


	    vm.cancel = function () {
	      $uibModalInstance.dismiss('cancel');
	    };
	} 
})();