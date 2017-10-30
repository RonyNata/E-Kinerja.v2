(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormAktivitasController', FormAktivitasController);

    
    function FormAktivitasController(kdJabatan, nip, tanggal, AktivitasPegawaiService, $uibModalInstance, EkinerjaService) {
      	var vm = this;

            vm.urtug = [];
            vm.rincian = {"nipPegawai": nip, "tglSubmit": tanggal}
            getUrtugByJabatan();

            function getUrtugByJabatan(){
                  AktivitasPegawaiService.GetUrtugByJabatan(kdJabatan).then(
                        function(response){
                              debugger
                              vm.urtug = response;
                        }, function(errResponse){

                        }
                  )
            }

            vm.save = function setUrtugAndJabatan(){
      		// console.log(JSON.stringify(vm.rincian));
                  vm.rincian.kdUrtug = EkinerjaService.searchByDeskripsi(vm.rincian.kdUrtug, vm.urtug)[0].kdUrtug;
      		AktivitasPegawaiService.SaveRincian(vm.rincian).then(
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