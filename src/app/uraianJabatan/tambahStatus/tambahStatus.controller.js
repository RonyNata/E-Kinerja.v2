(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('TambahStatusController', TambahStatusController);

    
    function TambahStatusController(EkinerjaService, $scope, items, used_urtug, PengumpulanDataBebanKerjaService, $uibModalInstance) {
      	var vm = this;
        $scope.entries = 2;
        $scope.currentPage = 0;
        vm.item = angular.copy(items);
        var usedurtug = used_urtug;
        debugger
        vm.target = {
          "kuantitas": vm.item.volume,
          "satuanKuantitas": vm.item.satuanVolume,
          "kualitas": 100,
          "kualitasDisplay": "100%",
          "waktu": 12,
          "waktuDisplay": "12 Bulan",
          "biaya": 0,
          "biayaDisplay": "Rp. 0"
        };
        $scope.statusUrtug = "";
        getJenisUrtug();
        getUrtugJabatan();

        function getJenisUrtug(){
          PengumpulanDataBebanKerjaService.GetJenisUrtug().then(
              function(response){
                vm.jenis_urtug = response;
                // debugger
              },
              function(errResponse){

              }
            )
        }

        vm.getUrtug = function(kdUrtug){
            vm.urtug = PengumpulanDataBebanKerjaService.GetUrtugByyId(vm.used_urtug, kdUrtug);
            var utg = PengumpulanDataBebanKerjaService.GetUrtugByyId(usedurtug, kdUrtug);
            vm.target.kuantitas = utg.volume;
            vm.target.satuanKuantitas = utg.satuanVolume;
            vm.item.kdUrtug = vm.urtug.kdUrtug;debugger
        }

        function getUrtugJabatan(){
          PengumpulanDataBebanKerjaService.GetUrtugForStatus(items.kdJabatan).then(
            function(response){
              debugger;
              vm.used_urtug = response;
              paging();
            }, function(errResponse){

            })
        }

        $scope.$watch('statusUrtug', function(){
          console.log($scope.statusUrtug);
          if($scope.statusUrtug == "KJU001" || $scope.statusUrtug == "" )
            vm.isDpa = true;
          else {
            vm.isDpa = false
            vm.target = {
              "kuantitas": vm.target.kuantitas,
              "satuanKuantitas": vm.target.satuanKuantitas,
              "kualitas": 100,
              "kualitasDisplay": "100%",
              "waktu": 12,
              "waktuDisplay": "12 Bulan",
              "biaya": 0,
              "biayaDisplay": "Rp. 0"
            }
          };
        });

        vm.save = function setUrtugAndJabatan(){
            // vm.item.kdUrtug = PengumpulanDataBebanKerjaService.GetUrtugId(used_urtug, vm.item.kdUrtug);
            vm.item.kuantitas = vm.target.kuantitas;
            vm.item.satuanKuantitas = vm.target.satuanKuantitas;
            vm.item.kualitas = vm.target.kualitas;
            vm.item.waktu = vm.target.waktu;
            vm.item.biaya = vm.target.biaya;
            vm.item.kdJenisUrtug = $scope.statusUrtug;
            console.log(vm.item);
            PengumpulanDataBebanKerjaService.SetJenisUrtugJabatan(vm.item).then(
              function(response){
                $uibModalInstance.close();
              },function(errResponse){
                EkinerjaService.showToastrError('terjadi kesalahan');
              }
            )
          }

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }

        vm.calculateBeban = function(){
          vm.item.bebanKerja = vm.item.volumeKerja * vm.item.normaWaktu;
        }

        $scope.$watch('entries', function(){
          // if($scope.searchNip != '')
          //  vm.dataLook = EkinerjaService.searchByNip($scope.searchNip, data);
          paging();
          debugger
        })

        function paging(){ 
          $scope.filteredData = [];
          // $scope.currentPage = 0;
          $scope.numPerPage = $scope.entries;
          $scope.maxSize = Math.ceil(vm.used_urtug.length/$scope.numPerPage);
          function pageUrtug(){
            $scope.pageUrtug = [];
            for(var i = 0; i < vm.used_urtug.length/$scope.numPerPage; i++){
                $scope.pageUrtug.push(i+1);
            }
          }
          pageUrtug();
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
            , end = begin + $scope.numPerPage;

            $scope.filteredData = vm.used_urtug.slice(begin, end);
          });
        }
   	} 
})();