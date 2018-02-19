(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormPenanggungJawabController', FormPenanggungJawabController);

    
    function FormPenanggungJawabController(EkinerjaService, items, pegawai, isEselon4, PengadaanBarangJasaService, 
      $uibModalInstance, MasterKegiatanService) {
      	var vm = this;
        vm.pj = {};
        vm.list_pegawai = pegawai;
        getAllStatusPJ();

        function getAllStatusPJ(){
          PengadaanBarangJasaService.GetStatusPJ(items).then(
            function(response){
              vm.datajabatan = response; debugger
            }, function(errResponse){

            })
        }

        vm.save = function(){
          items.nipPegawai = vm.pj.nipPegawai;
          items.kdStatusPenanggungJawab = vm.pj.jabatan;
          console.log(items);
          MasterKegiatanService.CreatePJ(items).then(
            function(response){
              EkinerjaService.showToastrSuccess("Data Penanggung Jawab Berhasil Disimpan");
              $uibModalInstance.close();
            }, function(errResponse){
              EkinerjaService.showToastrError("Data Penanggung Jawab Gagal Disimpan");
            })
      	}

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }
   	} 
})();