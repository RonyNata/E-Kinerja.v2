(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormRoleController', FormRoleController);

    
    function FormRoleController(pegawai, HakAksesService, $uibModalInstance, EkinerjaService) {
      	var vm = this;

            vm.pegawai = angular.copy(pegawai);
            vm.dataRole = [];

            HakAksesService.GetRolePegawai(pegawai.nipPegawai).then(
                  function(response){
                        vm.pegawai.role = response.currentRole;
                        vm.dataRole = response.roles;
                        // vm.dataRole.unshift(response.currentRole);
                        debugger
                  }, function(errResponse){

                  })

            vm.save = function setUrtugAndJabatan(){
      		// console.log(JSON.stringify(vm.rincian));
      		HakAksesService.SetRolePegawai(vm.pegawai).then(
      			function(response){
      				$uibModalInstance.close(HakAksesService.findRole(vm.pegawai.role.id, vm.dataRole).role);
      			},function(errResponse){
                              EkinerjaService.showToastrError('Terjadi Kesalahan');
      			}
      		)
      	}

            vm.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
            };
   	} 
})();