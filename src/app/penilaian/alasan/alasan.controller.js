(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('AlasanController', AlasanController);

	function AlasanController(PenilaianService, $uibModalInstance, items){
		var vm = this;

		vm.item = angular.copy(items);

		vm.save = function(){
			PenilaianService.Tolak(vm.item).then(
				function(response){
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