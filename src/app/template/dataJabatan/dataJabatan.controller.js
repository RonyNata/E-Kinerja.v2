(function(){
  'use strict';

  angular.
    module('eKinerja').
    controller('DataJabatanController', DataJabatanController);

    function DataJabatanController(EkinerjaService, $scope, jabatan, jabatanPilihan, isPilihan, HakAksesService, $uibModalInstance, $uibModal, $document){
      EkinerjaService.checkCredential();
      var vm = this;

      $scope.searchName = '';
      $scope.searchJabatan = '';
      $scope.entries = 5;debugger
      $scope.currentPage = 0;
      vm.isPilihan = isPilihan;

      var data = jabatan;
      vm.dataLook = jabatan;
      vm.jabatanPilihan = jabatanPilihan;

      // getAlljabatan();

      // function getAlljabatan(){
      //   vm.loading = true;
      //   HakAksesService.GetAlljabatan().then(
      //     function(response){
      //       // console.log(JSON.stringify(response));
      //       data = response;
      //       paging();
      //       vm.loading = false;
      //     }, function(errResponse){

      //     })
      // }

      vm.pilihJabatan = function(data){
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
        templateUrl: 'app/template/datajabatan/datajabatan.html',
        controller: 'DataJabatanController',
        controllerAs: 'datajabatan',
        // windowClass: 'app-modal-window',
        size: 'lg',
        appendTo: parentElem,
        resolve: {
          jabatan: function(){
            return vm.jabatanPilihan;
          },
          jabatanPilihan: function(){
            return vm.jabatanPilihan;
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

      function findjabatanByNip(nip, array){
            for(var i = 0; i<array.length; i++){
                if (array[i].nipjabatan.search(nip) != -1){
                    return i; break;
                } 
            }
        }

      $scope.$watch('searchJabatan', function(){
        if($scope.searchJabatan != ''){
          $scope.currentPage = 0;
          vm.dataLook = EkinerjaService.searchByJabatan($scope.searchJabatan, data);
        }
        paging();
        debugger
      })

      vm.check = function(dat){debugger
        if(dat.checked)
          vm.jabatanPilihan.push(dat);
        else vm.jabatanPilihan.splice(EkinerjaService.findJabatanByKdJabatan(dat.kdJabatan, vm.jabatanPilihan),1);
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