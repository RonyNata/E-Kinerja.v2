(function(){
  'use strict';

  angular.
    module('eKinerja').
    controller('DataSalinController', DataSalinController);

    function DataSalinController(EkinerjaService, $scope, pj, HakAksesService, $timeout,
      $uibModalInstance, $uibModal, $document, PengumpulanDataBebanKerjaService, MasterKegiatanService){
      EkinerjaService.checkCredential();
      var vm = this;

      $scope.searchName = '';
      $scope.searchJabatan = '';
      $scope.entries = 5;
      $scope.currentPage = 0;
      getData();

      function getData(){
        PengumpulanDataBebanKerjaService.GetAllKegiatan($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
          function(response){
            vm.list_kegiatan = response;debugger
            vm.dataLook = response;
            paging();
            vm.loading = false;
          },
          function(errResponse){

          }
        )
      }

      vm.cancel = function () { 
        $uibModalInstance.dismiss('cancel'); 
      };

      vm.salin = function(dataKegiatan){
        var item = {
          "kdUrusan": dataKegiatan.kdUrusan,
          "kdBidang": dataKegiatan.kdBIdang,
          "kdUnit": dataKegiatan.kdUnit,
          "kdSub": dataKegiatan.kdSub,
          "tahun": dataKegiatan.tahun,
          "kdProg": dataKegiatan.kdProg,
          "idProg": dataKegiatan.idProg,
          "kdKeg": dataKegiatan.kdKegiatan,
          "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja
        }
        var list = [];
        for(var i = 0; i < pj.length;i++){
          item.nipPegawai = pj[i].penanggungJawab.nip;
          item.kdStatusPenanggungJawab = pj[i].kdStatusPenanggungJawab;
          list.push(angular.copy(item));
        }

        MasterKegiatanService.SalinPj(list).then(
          function(response){
            EkinerjaService.showToastrSuccess('Berhasil Disalin');
            getData();
          }, function(errResponse){

          })
      }

      function checkSuccess(param){
        if(param == (pj.length-1)){
          EkinerjaService.showToastrSuccess("Struktur berhasil disalin");
          getData();
        }
        else
          EkinerjaService.showToastrDanger("Proses salin tidak sempurna");
      }

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