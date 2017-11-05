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
          vm.list_tidakdiajukan = vm.list_urtug[0].uraianTugasTidakDipilih;
          for(var i = 0; i < vm.list_ajuan.length; i++){
            vm.list_ajuan[i].biayaRp = EkinerjaService.FormatRupiah(vm.list_ajuan[i].biaya);
            vm.list_ajuan[i].terima = true;
          }
          for(var i = 0; i < vm.list_tidakdiajukan.length; i++)
            vm.list_tidakdiajukan[i].biayaRp = EkinerjaService.FormatRupiah(vm.list_tidakdiajukan[i].biaya);
        }

        vm.gantiStatusUrtug = function(urtug, terima){
          if(terima){
            urtug.terima = false;
            // var indexPush = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_tidakdiajukan);
            // var indexSplice = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_tidakdiajukan);
            // vm.list_ajuan.push(vm.list_tidakdiajukan[indexPush]);
            // vm.list_tidakdiajukan.splice(indexSplice, 1);
          }else{
            urtug.terima = true;
            // var indexPush = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_ajuan);
            // var indexSplice = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_ajuan);
            // vm.list_tidakdiajukan.push(angular.copy(vm.list_ajuan[indexPush]));
            // vm.list_ajuan.splice(indexSplice, 1);
          }
            console.log(urtug);
        }

        vm.tambahkan = function(kdUrtug){
          var indexPush = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_tidakdiajukan);
          var indexSplice = AjuanKontrakService.GetIndexUrtugById(kdUrtug, vm.list_tidakdiajukan);
          vm.list_tidakdiajukan[indexPush].terima = true;
          vm.list_ajuan.push(vm.list_tidakdiajukan[indexPush]);
          vm.list_tidakdiajukan.splice(indexSplice, 1);
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
            if(vm.list_ajuan[i].terima)
              vm.list_ajuan[i].statusApproval = 1;
            else
              vm.list_ajuan[i].statusApproval = 2;
            vm.list_ajuan[i].nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
            data.push(vm.list_ajuan[i]);
          }
          for(var i = 0; i < vm.list_tidakdiajukan.length; i++){
            vm.list_tidakdiajukan[i].statusApproval = 2;
            vm.list_tidakdiajukan[i].nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
            data.push(vm.list_tidakdiajukan[i]);
          }console.log(JSON.stringify(data));

          AjuanKontrakService.ApproveKontrak(data).then(
            function(response){
              EkinerjaService.showToastrSuccess("Kontrak Tahunan Berhasil Disetujui");
            }, function(errResponse){
              EkinerjaService.showToastrError("Kontrak Tahunan Gagal Disetujui");
            })
        }
   	} 
})();