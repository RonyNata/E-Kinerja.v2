(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormPerilakuController', FormPerilakuController);

    function FormPerilakuController(perilaku, $scope, ReportPerilakuService, $uibModalInstance, EkinerjaService) {
      	var vm = this;
            vm.pegawai = angular.copy(perilaku);
            vm.pegawai.nipPegawai = vm.pegawai.nipPegawai;
            vm.pegawai.bulanTahunRekapitulasi = vm.pegawai.bulanTahunRekapulasi;
            console.log(vm.pegawai);
            $scope.manipulasi = vm.pegawai.dataManipulasiData;

            $scope.$watch('manipulasi', function(){
                  vm.pegawai.dataManipulasiData = $scope.manipulasi;
                  if($scope.manipulasi == 'false') vm.pegawai.nilaiManipulasiData = 1;
                  else vm.pegawai.nilaiManipulasiData = 0;
                  debugger
            })

            vm.save = function setPerilakuPns(){
      		// console.log(JSON.stringify(vm.rincian));
      		ReportPerilakuService.CreatePerilaku(vm.pegawai).then(
      			function(response){
      				$uibModalInstance.close();
      			},function(errResponse){
                              if(errResponse.status == -1)
                                    EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
                              else EkinerjaService.showToastrError('Terjadi Kesalahan');
      			}
      		)
      	}

            vm.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
            };
   	} 
})();