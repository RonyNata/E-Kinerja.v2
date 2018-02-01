(function(){
  'use strict';

  angular.
    module('eKinerja').
    controller('DataPegawaiController', DataPegawaiController);

    function DataPegawaiController(EkinerjaService, $scope, pegawai, pegawaiPilihan, isPilihan, HakAksesService, $uibModalInstance, $uibModal, $document){
      EkinerjaService.checkCredential();
      var vm = this;

      $scope.searchName = '';
      $scope.searchJabatan = '';
      $scope.entries = 5;
      $scope.currentPage = 0;
      vm.isPilihan = isPilihan;

      var data = pegawai;
      vm.dataLook = pegawai;
      vm.pegawaiPilihan = pegawaiPilihan;

      // getAllPegawai();

      // function getAllPegawai(){
      //   vm.loading = true;
      //   HakAksesService.GetAllPegawai().then(
      //     function(response){
      //       // console.log(JSON.stringify(response));
      //       data = response;
      //       paging();
      //       vm.loading = false;
      //     }, function(errResponse){

      //     })
      // }

      vm.pilihPegawai = function(data){
        $uibModalInstance.close(data);
      }

      vm.cancel = function () { 
        $uibModalInstance.dismiss('cancel'); 
      };

      vm.openPilihan = function (parentSelector) {
        var parentElem = parentSelector ? 
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/template/dataPegawai/dataPegawai.html',
        controller: 'DataPegawaiController',
        controllerAs: 'datapegawai',
        // windowClass: 'app-modal-window',
        size: 'lg',
        appendTo: parentElem,
        resolve: {
          pegawai: function(){
            return vm.pegawaiPilihan;
          },
          pegawaiPilihan: function(){
            return vm.pegawaiPilihan;
          },
          isPilihan: function(){
            return 1;
          }
        }
        });

        modalInstance.result.then(function () {
        }, function () {

        });
      };

      function findPegawaiByNip(nip, array){
            for(var i = 0; i<array.length; i++){
                if (array[i].nipPegawai.search(nip) != -1){
                    return i; break;
                } 
            }
        }

      $scope.$watch('searchName', function(){
        if($scope.searchName != ''){
          $scope.currentPage = 0;
          vm.dataLook = EkinerjaService.searchByName($scope.searchName, data);
        }
        paging();
        debugger
      })

      $scope.$watch('searchJabatan', function(){
        if($scope.searchJabatan != ''){
          $scope.currentPage = 0;
          vm.dataLook = EkinerjaService.searchByJabatan($scope.searchJabatan, data);
        }
        paging();
        debugger
      })

      vm.check = function(dat){
        if(dat.checked)
          vm.pegawaiPilihan.push(dat);
        else vm.pegawaiPilihan.splice(findPegawaiByNip(dat.nipPegawai, vm.pegawaiPilihan),1);
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