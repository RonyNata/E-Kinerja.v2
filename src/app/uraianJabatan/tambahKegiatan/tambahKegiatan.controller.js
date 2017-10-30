(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('KegiatanController', KegiatanController);

    
    function KegiatanController(EkinerjaService, $scope, items, pegawai, PengumpulanDataBebanKerjaService, $uibModalInstance) {
      	var vm = this;

        vm.list_pegawai = pegawai;
        // vm.pegawai_pj = {};
        vm.pj = {}; 
        getAllKegiatan();
        getAllStatusPJ();

        function getAllKegiatan(){
          PengumpulanDataBebanKerjaService.GetAllKegiatan($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
              function(response){
                vm.list_kegiatan = response;
                debugger
              },
              function(errResponse){

              }
            )
        }

        function getAllStatusPJ(){
          PengumpulanDataBebanKerjaService.GetStatusPJ().then(
            function(response){
              vm.list_pj = response;
            }, function(errResponse){

            })
        }

        vm.save = function(){
          var kegiatan = PengumpulanDataBebanKerjaService.GetKegiatan(vm.list_kegiatan, vm.kegiatan_pj);
          items.kdUrusan = kegiatan.kdUrusan;
          items.kdBidang = kegiatan.kdBIdang;
          items.kdUnit = kegiatan.kdUnit;
          items.kdSub = kegiatan.kdSub;
          items.tahun = kegiatan.tahun;
          items.kdProg = kegiatan.kdProg;
          items.idProg = kegiatan.idProg;
          items.kdKeg = kegiatan.kdKegiatan;
          console.log(items);
          PengumpulanDataBebanKerjaService.CreateUrtugKegiatan(items).then(
            function(response){
      				$uibModalInstance.close();
              // setPJ();
            }, function(errResponse){

            })
          // vm.item
          // console.log(JSON.stringify(vm.item));
          // PengumpulanDataBebanKerjaService.SetUrtugAndJabatan(vm.item).then(
          //  function(response){
      		// 	},function(errResponse){
        //       EkinerjaService.showToastrError('terjadi kesalahan');
      		// 	}
      		// )
      	}

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }
   	} 
})();