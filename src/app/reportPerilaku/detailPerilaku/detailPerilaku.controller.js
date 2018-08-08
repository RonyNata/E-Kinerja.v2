(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('DetailPerilakuController', DetailPerilakuController);

    function DetailPerilakuController(perilaku, $scope, ReportPerilakuService, $uibModalInstance, EkinerjaService) {
      	var vm = this;
            vm.pegawai = angular.copy(perilaku);
            vm.pegawai.nipPegawai = vm.pegawai.nipPegawai;
            vm.pegawai.bulanTahunRekapitulasi = vm.pegawai.bulanTahunRekapulasi;
            console.log(vm.pegawai);

            vm.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
            };
   	} 
})();