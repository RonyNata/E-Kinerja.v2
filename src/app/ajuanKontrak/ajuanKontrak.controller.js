(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('AjuanKontrakController', AjuanKontrakController);

    
    function AjuanKontrakController(EkinerjaService, AjuanKontrakService, $scope) {
      	var vm = this;
        vm.loading = true;

        getPegawaiPengaju();

        $scope.$watch('nipPegawai', function(){
          searchPegawaiByNip();
        })

        function searchPegawaiByNip(){
          vm.list_urtug = EkinerjaService.searchByNip($scope.nipPegawai, vm.list_pegawai);
          vm.list_ajuan = vm.list_urtug[0].uraianTugasDiajukan;
          vm.list_ditolak = vm.list_urtug[0].uraianTugasTidakDipilih;
          for(var i = 0; i < vm.list_ajuan.length; i++)
            vm.list_ajuan[i].biayaRp = EkinerjaService.FormatRupiah(vm.list_ajuan[i].biaya);
          for(var i = 0; i < vm.list_ditolak.length; i++)
            vm.list_ditolak[i].biayaRp = EkinerjaService.FormatRupiah(vm.list_ditolak[i].biaya);
        }

        vm.gantiStatusUrtug = function(kdUrtug, terima){
          if(terima){
            var indexPush = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_ditolak);
            var indexSplice = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_ditolak);
            vm.list_ajuan.push(vm.list_ditolak[indexPush]);
            vm.list_ditolak.splice(indexSplice, 1);
          }else{
            var indexPush = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_ajuan);
            var indexSplice = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_ajuan);
            vm.list_ditolak.push(angular.copy(vm.list_ajuan[indexPush]));
            vm.list_ajuan.splice(indexSplice, 1);
          }
        }

        function getPegawaiPengaju(){
          AjuanKontrakService.GetPegawaiPengaju($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
            function(response){
              vm.list_pegawai = response;debugger
              vm.loading = false;
            }, function(errResponse){

            })
        }

        vm.approve = function(){
          var data = [];
          for(var i = 0; i < vm.list_ajuan.length; i++){
            vm.list_ajuan[i].statusApproval = 1;
            data.push(vm.list_ajuan[i]);
          }
          for(var i = 0; i < vm.list_ditolak.length; i++){
            vm.list_ditolak[i].statusApproval = 2;
            data.push(vm.list_ditolak[i]);
          }

          AjuanKontrakService.ApproveKontrak(data).then(
            function(response){
              EkinerjaService.showToastrSuccess("Kontrak Tahunan Berhasil Disetujui");
            }, function(errResponse){
              EkinerjaService.showToastrError("Kontrak Tahunan Gagal Disetujui");
            })
        }
   	} 
})();