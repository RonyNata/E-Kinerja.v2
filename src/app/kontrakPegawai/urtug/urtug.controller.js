(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('UrtugController', UrtugController);

    
    function UrtugController(EkinerjaService, KontrakPegawaiService, $uibModalInstance, $scope,
      $uibModal, $document, $state, pegawai, isPenilai, PengumpulanDataBebanKerjaService, $timeout) {
      	var vm = this;

        vm.pegawai = pegawai;
        var penilai = isPenilai;debugger

        KontrakPegawaiService.GetUrtugByNip(vm.pegawai.nipPegawai, (new Date()).getMonth()).then(
          function(response){
            vm.dataLook = response;
            pagingUrtug();
            // debugger
          }, function(errResponse){
            vm.loading = false;

          }
        )

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.pilihUrtug = function(urtug){
            var data = {
              'kdUrtug': urtug.kdUrtug,
              'kdJabatan': pegawai.kdJabatan,
              'kdJenisUrtug': urtug.kdJenisUrtug,
              'tahunUrtug': urtug.tahunUrtug,
              'bulanUrtug': urtug.bulanUrtug,
              'nipPegawai': pegawai.nipPegawai,
              'penilai': penilai
            };
            $uibModalInstance.close(data);
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