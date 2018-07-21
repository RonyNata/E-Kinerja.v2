(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormPerilakuController', FormPerilakuController);

    function FormPerilakuController(perilaku, ReportPerilakuService, $uibModalInstance, EkinerjaService) {
      	var vm = this;
            vm.pegawai = angular.copy(perilaku);
            vm.pegawai.nipPegawai = vm.pegawai.rekapitulasiPerilakuKerjaPegawaiId.nipPegawai;
            vm.pegawai.bulanTahunRekapitulasi = vm.pegawai.rekapitulasiPerilakuKerjaPegawaiId.bulanTahunRekapulasi;
            console.log(vm.pegawai);

            vm.save = function setPerilakuPns(){
      		// console.log(JSON.stringify(vm.rincian));
      		ReportPerilakuService.CreatePerilaku(vm.pegawai).then(
      			function(response){
      				$uibModalInstance.close();
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