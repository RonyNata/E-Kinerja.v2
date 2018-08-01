(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('OpenUrtugController', OpenUrtugController);

    
    function OpenUrtugController(EkinerjaService, KontrakPegawaiService, $uibModalInstance, $scope,
      $uibModal, $document, $state, laporan, PengumpulanDataBebanKerjaService, $timeout) {
      	var vm = this;
        vm.pgw = 0;
        vm.daftarUrtugAtasan = [];
        vm.nama = $.parseJSON(sessionStorage.getItem('credential')).namaPegawai;
        vm.laporan = angular.copy(laporan);debugger
        getUrtugByJabatan();
          function getUrtugByJabatan(){
          KontrakPegawaiService.GetUrtugByNip($.parseJSON(sessionStorage.getItem('credential')).nipPegawai, (new Date()).getMonth()).then(
            function(response){
              for(var i = 0; i < response.length; i++)
                response[i].deskripsi = response[i].urtug;
              vm.target = response;
              vm.dataLook = response;
              pagingUrtug();
              // debugger
            }, function(errResponse){
              vm.loading = false;

            }
          )
        }

        $scope.$watch('searchName', function(){
          if($scope.searchName != ''){
            $scope.currentPage = 0;debugger
            vm.dataLook = EkinerjaService.searchByDeskripsi($scope.searchName, vm.target);
          }
          pagingUrtug();
          debugger
        })

        vm.kembali = function(){
          if(vm.kegiatan){
            vm.kegiatan = false;
            $timeout(function() { vm.urtug = true;}, 499);
          }else if(vm.pj){
            vm.pj = false;
            $timeout(function() { vm.kegiatan = true;}, 499);
          }
        }

        getPegawaiAtasan();

        function getPegawaiAtasan(){
          KontrakPegawaiService.GetPejabatPenilai($.parseJSON(sessionStorage.getItem('credential')).kdJabatan).then(
            function(response){
              response.namaPegawai = response.nama;
              vm.penilai = response;
              getAtasanPenilai(response.kdJabatan);
              getUrtug(vm.penilai.nipPegawai, vm.penilai);
            }, function(errResponse){

            })

        }

        function getAtasanPenilai(kdJabatan){
          KontrakPegawaiService.GetPejabatPenilai(kdJabatan).then(
            function(response){debugger
              response.namaPegawai = response.nama;
              vm.atasanPenilai = response;
              getUrtug(vm.atasanPenilai.nipPegawai, vm.atasanPenilai);
            }, function(errResponse){

            })
        }

        function getUrtug(nipPegawai, pegawai){
          KontrakPegawaiService.GetUrtugByNip(nipPegawai, (new Date()).getMonth()).then(
            function(response){
              for(var i = 0; i<response.length; i++)
                response[i].biayaRp = EkinerjaService.FormatRupiah(response[i].biaya);
              pegawai.skp = response;
              // vm.dataLook = response;
              // debugger
            }, function(errResponse){
              vm.loading = false;

            }
          )
        }

        function getUrtugKegiatanApproval(){
          // if(vm.isEselon4)
            KontrakPegawaiService.GetUrtugKegiatanApproval(
              $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
              $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
              $.parseJSON(sessionStorage.getItem('credential')).kdJabatan).then(
              function(response){
                vm.kegiatan = response;debugger
                for(var i = 0; i < response.length; i++)
                  vm.kegiatan[i].paguAnggaran = EkinerjaService.FormatRupiah(vm.kegiatan[i].paguAnggaran);
                  pagingKegiatan();
              }, function(errResponse){
                // vm.penilai = "";
              })
        }

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.pilihUrtug = function(urtug, pgw){
          vm.laporan;
          if(vm.pgw == 0){
            vm.data = {
              "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
              "nipPegawai": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
              "keterangan": "",
              "durasiPengerjaan": 0,
              "kdUrtug": urtug.kdUrtug,
              "kdJabatan": urtug.kdJabatan,
              "tahunUrtug": urtug.tahunUrtug,
              "kdJenisUrtug": urtug.kdJenisUrtug,
              "bulanUrtug": urtug.bulanUrtug,
              "kdTemplateLainBawahan": vm.laporan.kdSurat,
              "namaFileLaporanBawahan": vm.laporan.namaFileTemplateLain + '.' + vm.laporan.extensiFile,
              "daftarUrtugAtasan": []
            };
          }
          else
            vm.data.daftarUrtugAtasan.push({
              'kdUrtug': urtug.kdUrtug,
              'kdJabatan': pgw.kdJabatan,
              'kdJenisUrtug': urtug.kdJenisUrtug,
              'tahunUrtug': urtug.tahunUrtug,
              'bulanUrtug': urtug.bulanUrtug,
              'nipPegawai': pgw.nipPegawai
            });
debugger
          vm.pgw += 1;

          if(vm.pgw < 5)
          $timeout(function() { 
            vm.pgw += 1; 
            if(vm.pgw == 2) vm.dataLook = vm.penilai.skp;
            else vm.dataLook = vm.atasanPenilai.skp;
            pagingUrtug();
          }, 499);
          else vm.save();
        }

        vm.save = function(){

          KontrakPegawaiService.UploadTemplateData(vm.data).then(
            function(response){debugger
                EkinerjaService.showToastrSuccess("File Berhasil Diteruskan");
                $uibModalInstance.close();
            }, function(errResponse){

            })  
        }

        function pagingUrtug(){ 
          $scope.filteredData = [];
          $scope.currentPage = 0;
          $scope.numPerPage = 5;
          $scope.maxSizeTarget = Math.ceil(vm.dataLook.length/$scope.numPerPage);
          function pageUrtug(){
            $scope.page = [];
            for(var i = 0; i < vm.dataLook.length/$scope.numPerPage; i++){
                $scope.page.push(i+1);
            }
          }
          pageUrtug();
          $scope.pad = function(i){
            $scope.currentPage += i;
          }

          $scope.max = function(){
            if($scope.currentPage >= $scope.maxSizeTarget - 1)
                return true;
            else return false;
          }

          $scope.$watch("currentPage + numPerPage", function() {
            var begin = (($scope.currentPage) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

            $scope.filteredData = vm.dataLook.slice(begin, end);
          });
        }
   	} 
})();