(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('KegiatanController', KegiatanController);

    
    function KegiatanController(EkinerjaService, $scope, items, pegawai, isEselon4, PengumpulanDataBebanKerjaService, $uibModalInstance) {
      	var vm = this;

        vm.list_pegawai = pegawai;
        vm.isEselon4 = isEselon4;
        // vm.pegawai_pj = {};
        vm.target = {
          "kuantitas": 1,
          "satuanKuantitas": "",
          "kualitas": 100,
          "kualitasDisplay": "100%",
          "waktu": 12,
          "waktuDisplay": "12 Bulan",
          "biaya": 0,
          "biayaDisplay": "Rp. 0"
        }
        vm.pj = {}; 
        // if(isEselon4)
          getAllKegiatan();
        // else getProgram();
        getAllStatusPJ();

        function getAllKegiatan(){
          PengumpulanDataBebanKerjaService.GetAllKegiatan($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
              function(response){
                vm.list_kegiatan = response;debugger
                
              },
              function(errResponse){

              }
            )
        }

        function getProgram(){

          PengumpulanDataBebanKerjaService.GetProgram($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
              function(response){
                vm.list_program = response;
                
              },
              function(errResponse){

              }
            )
        }

        vm.getKegiatan = function(){
          if(vm.kegiatan_pj.length >= 15){
            var kegiatan = PengumpulanDataBebanKerjaService.GetKegiatan(vm.list_kegiatan, vm.kegiatan_pj);
            vm.target.biaya = kegiatan.paguAnggaran;debugger;
            vm.target.biayaDisplay = "Rp. " + EkinerjaService.FormatRupiah(kegiatan.paguAnggaran);
          }
        }

        function getAllStatusPJ(){
          PengumpulanDataBebanKerjaService.GetStatusPJ().then(
            function(response){
              vm.list_pj = response;
            }, function(errResponse){

            })
        }

        vm.save = function(){
          // if(isEselon4){
          var kegiatan = PengumpulanDataBebanKerjaService.GetKegiatan(vm.list_kegiatan, vm.kegiatan_pj);
          items.kdKeg = kegiatan.kdKegiatan;
          // }else var kegiatan = PengumpulanDataBebanKerjaService.GetDataProgram(vm.list_program, vm.kegiatan_pj);
          items.kdUrusan = kegiatan.kdUrusan;
          items.kdBidang = kegiatan.kdBIdang;
          items.kdUnit = kegiatan.kdUnit;
          items.kdSub = kegiatan.kdSub;
          items.tahun = kegiatan.tahun;
          items.kdProg = kegiatan.kdProg;
          items.idProg = kegiatan.idProg;
          console.log(items);
          // if(isEselon4){
            items.kuantitas = vm.target.kuantitas;
            items.satuanKuantitas = vm.target.satuanKuantitas;
            items.kualitas = vm.target.kualitas;
            items.waktu = vm.target.waktu;
            items.biaya = vm.target.biaya;
            PengumpulanDataBebanKerjaService.CreateUrtugKegiatan(items).then(
              function(response){
        				$uibModalInstance.close();
                // setPJ();
              }, function(errResponse){

              })
          // }
          // else 
          //   PengumpulanDataBebanKerjaService.CreateUrtugProgram(items).then(
          //     function(response){
          //       $uibModalInstance.close();
          //       // setPJ();
          //     }, function(errResponse){

          //     })
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