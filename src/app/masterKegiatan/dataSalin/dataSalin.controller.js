(function(){
  'use strict';

  angular.
    module('eKinerja').
    controller('DataSalinController', DataSalinController);

    function DataSalinController(EkinerjaService, $scope, kegiatan, kegiatanPilihan, isPilihan, urtug, HakAksesService, 
      $uibModalInstance, $uibModal, $document, PengumpulanDataBebanKerjaService, MasterKegiatanService){
      EkinerjaService.checkCredential();
      var vm = this;

      $scope.searchName = '';
      $scope.searchJabatan = '';
      $scope.entries = 5;
      $scope.currentPage = 0;
      vm.isPilihan = isPilihan;
      var data;

      function getAllKegiatan(){debugger
          MasterKegiatanService.GetKegiatanSimda($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
              function(response){
                // var data = response;
                for(var i = 0; i < response.length; i++){
                  response[i].nama = response[i].ketKegiatan;
                  response[i].waktu = 12;
                  response[i].biaya = "Rp. " + EkinerjaService.FormatRupiah(response[i].paguAnggaran);
                  response[i].kualitas = 100;
                }
                data = response;
                vm.dataLook = response;
                paging();
              },
              function(errResponse){

              }
            )
        }

      if(kegiatan.length != 0){
        var data = kegiatan;
        vm.dataLook = kegiatan;
        paging();
      } else getAllKegiatan();
      vm.kegiatanPilihan = kegiatanPilihan;

      PengumpulanDataBebanKerjaService.GetAllKegiatan($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
        function(response){
          vm.list_kegiatan = response;debugger
          vm.loading = false;
        },
        function(errResponse){

        }
      )

      // getAllkegiatan();

      // function getAllkegiatan(){
      //   vm.loading = true;
      //   HakAksesService.GetAllkegiatan().then(
      //     function(response){
      //       // console.log(JSON.stringify(response));
      //       data = response;
      //       paging();
      //       vm.loading = false;
      //     }, function(errResponse){

      //     })
      // }

      vm.cancel = function () { 
        $uibModalInstance.dismiss('cancel'); 
      };


      function paging(){ 
            $scope.filteredData = [];
            // $scope.currentPage = 0;
            $scope.numPerPage = $scope.entries;
            $scope.maxSize = Math.ceil(vm.dataLook.length/$scope.numPerPage);
            function page(){
              $scope.page = [];
              for(var i = 0; i < vm.dataLook.length/$scope.numPerPage; i++){
                  $scope.page.push(i+1);
              }
            }
            page();
            $scope.pad = function(i){
              $scope.currentPage += i;
            }

            $scope.max = function(){
              if($scope.currentPage >= $scope.maxSize - 1)
                  return true;
              else return false;
            }

            $scope.$watch("currentPage + numPerPage", function() {
              var begin = (($scope.currentPage) * $scope.numPerPage)
              , end = begin + parseInt($scope.numPerPage);
              debugger
              $scope.filteredData = vm.dataLook.slice(begin, end);
            });
          }
    }
})();