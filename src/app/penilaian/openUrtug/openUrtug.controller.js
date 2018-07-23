(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('OpenUrtugController', OpenUrtugController);

    
    function OpenUrtugController(EkinerjaService, KontrakPegawaiService, $uibModalInstance, $scope,
      $uibModal, $document, $state, laporan, PengumpulanDataBebanKerjaService) {
      	var vm = this;
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

        vm.pilihUrtug = function(urtug){
          vm.laporan;debugger
          var data = {
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
            "namaFileLaporanBawahan": vm.laporan.namaFileTemplateLain + '.' + vm.laporan.extensiFile
          };

          KontrakPegawaiService.UploadTemplateData(data).then(
            function(response){debugger
                EkinerjaService.showToastrSuccess("File Berhasil Diteruskan");
                $uibModalInstance.close();
            }, function(errResponse){

            })  
          // if(!isUpload)
          //   $state.go('perpindahan', {
          //       kdSurat: surat.kdSurat,
          //       kdJenis: surat.kdJenisSurat,
          //       kdUrtug: urtug.kdUrtug,
          //       tahun: urtug.tahunUrtug
          //   })
          // else $state.go('perpindahan', {
          //       kdUrtug: urtug.kdUrtug,
          //       tahun: urtug.tahunUrtug
          //   })
          // vm.cancel();
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