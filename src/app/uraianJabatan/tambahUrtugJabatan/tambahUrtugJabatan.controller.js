(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('TambahUrtugJabatanController', TambahUrtugJabatanController);

	function TambahUrtugJabatanController($uibModalInstance, kdJabatan, $scope,PengumpulanDataBebanKerjaService, EkinerjaService){
		var vm = this;
		vm.item = {
			"kdJabatan": kdJabatan,
			"createdBy": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
			"biaya": 0
		};

		vm.save = function(){
			PengumpulanDataBebanKerjaService.AddUrtugJabatan(vm.item).then(
				function(response){
					EkinerjaService.showToastrSuccess('Data Berhasil Ditambahkan');
					$uibModalInstance.close();
				}, function(errResponse){
					EkinerjaService.showToastrError('Terjadi Kesalahan');
				})
		}

		vm.cancel = function(){
			$uibModalInstance.dismiss();
		}
		
	} 
})();